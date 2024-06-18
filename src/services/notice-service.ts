import { prisma } from "@/config";
import { FisicPerson, NoticeConnections, NoticeProposal } from "@/entities";
import { UnprocessableEntityError, conflictError, notFoundError } from "@/errors";
import { noticePreviewRepository, noticeRepository } from "@/repositories";
import { enrollmentService } from "./enrollment-service";

async function getAll() {
  const notices = await noticeRepository.getAll();
  return notices;
}
async function getOneById(id: number) {
  const notice = await noticeRepository.getOneById(id);
  if (!notice) throw notFoundError();
  return notice;
}

async function getManyById(id: number) {
  const notice = await noticeRepository.getManyById(id);
  if (!notice) throw notFoundError();
  return notice;
}

async function create(
  userId: number,
  noticeProposal: NoticeProposal,
  connections: NoticeConnections,
  responsible: FisicPerson,
  coordinator: FisicPerson,
) {
  const noticeSearch = await noticeRepository.getOneByNoticePreviewId(+connections.noticePreviewId);
  const culturalAgent: any = {};
  if (connections.culturalAgentPFId) {
    culturalAgent["culturalAgentPFId"] = connections.culturalAgentPFId;
  } else {
    culturalAgent["culturalAgentPJId"] = connections.culturalAgentPJId;
  }

  const culturalAgentId = connections.culturalAgentPFId || connections.culturalAgentPJId;
  if (noticeSearch) {
    if (noticeSearch.culturalAgentPFId === +culturalAgentId || noticeSearch.culturalAgentPJId === +culturalAgentId) {
      throw conflictError("Você já enviou uma proposta para esse edital! ");
    }
  }
  return await prisma.$transaction(async (transaction) => {
    const noticePreview = await noticePreviewRepository.getById(+connections.noticePreviewId);
    if (!noticePreview) {
      throw UnprocessableEntityError("Não há edital cadastrado!");
    }

    if (!connections.culturalAgentPJId && !connections.culturalAgentPFId) {
      throw UnprocessableEntityError("Agente Cultural não identificado!");
    }

    const CulturalAgentTypekey = Object.keys(culturalAgent)[0];

    const signedUrl = await Promise.all(
      noticeProposal.attachments.map(async (file) => {
        const url = await enrollmentService.generateSignedUrl(file, "arquivos_editais");
        url.r2File[CulturalAgentTypekey as keyof typeof url.r2File] = culturalAgent[CulturalAgentTypekey];
        console.log(url);
        return url;
      }),
    );
    const [createdResponsible, createdCoordinator] = await Promise.all([
      noticeRepository.createResponsible(responsible, transaction),
      noticeRepository.createCoordinator(coordinator, transaction),
    ]);

    delete noticeProposal.attachments;
    const createdNotice = await noticeRepository.create(
      noticeProposal,
      noticePreview.id,
      createdResponsible.id,
      createdCoordinator.id,
      +connections.culturalAgentPFId,
      +connections.culturalAgentPJId,
      transaction,
    );

    await Promise.all(
      signedUrl.map(async (url) => {
        const files = await noticeRepository.createFile(url.r2File, createdNotice.id, transaction);
        return files;
      }),
    );

    await noticeRepository.updateFiles(
      createdNotice.id,
      +connections.culturalAgentPFId,
      +connections.culturalAgentPJId,
      transaction,
    );
    return signedUrl;
  });
}

export const noticeService = {
  getAll,
  create,
  getOneById,
  getManyById,
};
