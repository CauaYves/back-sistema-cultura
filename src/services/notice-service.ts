import { NoticeConnections, NoticeProposal } from "@/entities";
import { noticeRepository } from "@/repositories";

async function getAll() {
  const notices = await noticeRepository.getAll();
  return notices;
}

async function create(
  userId: number,
  proposal: NoticeProposal,
  connections: NoticeConnections
) {
  //deve existir um NoticePreview para ser possível criar uma noticia
  //pode haver varios arquivos a serem enviados
}

export const noticeService = {
  getAll,
  create,
};
