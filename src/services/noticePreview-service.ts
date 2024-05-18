import { NoticePreview } from "@/entities";
import { UnprocessableEntityError } from "@/errors";
import dayjs from "dayjs";

async function create(userId: number, noticePreview: NoticePreview) {
  checkIfOpeningDateIsLowerThanEndingDate(
    noticePreview.openingDate,
    noticePreview.endDate
  );
}

function checkIfOpeningDateIsLowerThanEndingDate(
  opening: string,
  ending: string
) {
  const openingTimestamp = new Date(opening).getTime();
  const endingTimestamp = new Date(ending).getTime();
  if (openingTimestamp > endingTimestamp) {
    throw UnprocessableEntityError(
      "A data de ínicio deve ser menor que a data de encerramento! "
    );
  }
}

export const noticePreviewService = {
  create,
};
