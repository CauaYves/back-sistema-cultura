-- DropForeignKey
ALTER TABLE "NoticeFiles" DROP CONSTRAINT "NoticeFiles_noticeId_fkey";

-- AlterTable
ALTER TABLE "NoticeFiles" ALTER COLUMN "noticeId" DROP NOT NULL,
ALTER COLUMN "culturalAgentPJId" DROP DEFAULT,
ALTER COLUMN "culturalAgentPFId" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "NoticeFiles" ADD CONSTRAINT "NoticeFiles_noticeId_fkey" FOREIGN KEY ("noticeId") REFERENCES "Notice"("id") ON DELETE SET NULL ON UPDATE CASCADE;
