import {
  NoticeConnections,
  NoticeProposal,
  FisicPerson,
  Proposal,
} from "@/entities";
import { UnprocessableEntityError } from "@/errors";
import { noticePreviewRepository, noticeRepository } from "@/repositories";
import { enrollmentService } from "./enrollment-service";

async function getAll() {
  const notices = await noticeRepository.getAll();
  return notices;
}

async function create(
  userId: number,
  noticeProposal: NoticeProposal,
  connections: NoticeConnections,
  responsible: FisicPerson,
  coordinator: FisicPerson
) {
  const noticePreview = await noticePreviewRepository.getById(
    +connections.noticePreviewId
  );
  if (!noticePreview) {
    throw UnprocessableEntityError("Não há edital cadastrado!");
  }

  if (!connections.culturalAgentPJId && !connections.culturalAgentPFId) {
    throw UnprocessableEntityError("Agente Cultural não identificado!");
  }

  const signedUrl = await Promise.all(
    noticeProposal.attachments.map(async (file) => {
      const url = await enrollmentService.generateSignedUrl(
        file,
        "arquivos_editais"
      );
      return url;
    })
  );

  const [createdResponsible, createdCoordinator] = await Promise.all([
    noticeRepository.createResponsible(responsible),
    noticeRepository.createCoordinator(coordinator),
  ]);

  console.log(createdCoordinator);
  delete noticeProposal.attachments;
  const createdNotice = await noticeRepository.create(
    noticeProposal,
    noticePreview.id,
    createdResponsible.id,
    createdCoordinator.id,
    +connections.culturalAgentPFId,
    +connections.culturalAgentPJId
  );
  await Promise.all(
    signedUrl.map(async (url) => {
      const files = await noticeRepository.createFile(
        url.r2File,
        createdNotice.id
      );
      return files;
    })
  );

  await noticeRepository.updateFiles(
    createdNotice.id,
    +connections.culturalAgentPFId,
    +connections.culturalAgentPJId
  );

  return signedUrl;
}

export const noticeService = {
  getAll,
  create,
};
