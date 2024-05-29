import { NoticePreview } from "@/entities";
import { UnprocessableEntityError, conflictError, notFoundError } from "@/errors";
import { noticePreviewRepository } from "@/repositories";

async function create(noticePreview: NoticePreview) {
  checkIfOpeningDateIsLowerThanEndingDate(noticePreview.openingDate, noticePreview.endDate);
  await checkIfAlreadyHaveNoticeWithThisName(noticePreview.name);

  const openingDate = new Date(noticePreview.openingDate);
  const endDate = new Date(noticePreview.endDate);

  if (isNaN(openingDate.getTime()) || isNaN(endDate.getTime())) {
    throw UnprocessableEntityError("Insira as datas em formato válido! ");
  }

  noticePreview.openingDate = openingDate.toISOString();
  noticePreview.endDate = endDate.toISOString();

  await noticePreviewRepository.create(noticePreview);
}

async function checkIfAlreadyHaveNoticeWithThisName(noticePreviewName: string) {
  const search = await noticePreviewRepository.getByName(noticePreviewName);
  if (search) {
    throw conflictError("Já existe um edital com esse nome! ");
  }
  return;
}

async function getManyByName(cityName: string) {
  const noticePreviewList = await noticePreviewRepository.getManyByCityName(cityName);
  return noticePreviewList;
}

function checkIfOpeningDateIsLowerThanEndingDate(opening: string, ending: string) {
  const openingTimestamp = new Date(opening).getTime();
  const endingTimestamp = new Date(ending).getTime();
  if (openingTimestamp > endingTimestamp) {
    throw UnprocessableEntityError("A data de ínicio deve ser menor que a data de encerramento! ");
  }
}

async function deleteById(id: number) {
  await noticePreviewRepository.deleteById(id);
}

async function getOneById(id: number) {
  const noticePreview = await noticePreviewRepository.getOneById(id);
  if (!noticePreview) throw notFoundError();
  return noticePreview;
}

export const noticePreviewService = {
  create,
  deleteById,
  getManyByName,
  getOneById,
};
