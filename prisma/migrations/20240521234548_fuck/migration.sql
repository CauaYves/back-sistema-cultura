/*
  Warnings:

  - You are about to drop the column `attachments` on the `Notice` table. All the data in the column will be lost.
  - Made the column `culturalAgentPFId` on table `Notice` required. This step will fail if there are existing NULL values in that column.
  - Made the column `culturalAgentPJId` on table `Notice` required. This step will fail if there are existing NULL values in that column.
  - Made the column `noticeId` on table `NoticeFiles` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Notice" DROP CONSTRAINT "Notice_culturalAgentPFId_fkey";

-- DropForeignKey
ALTER TABLE "Notice" DROP CONSTRAINT "Notice_culturalAgentPJId_fkey";

-- DropForeignKey
ALTER TABLE "NoticeFiles" DROP CONSTRAINT "NoticeFiles_noticeId_fkey";

-- AlterTable
ALTER TABLE "Notice" DROP COLUMN "attachments",
ALTER COLUMN "culturalAgentPFId" SET NOT NULL,
ALTER COLUMN "culturalAgentPJId" SET NOT NULL;

-- AlterTable
ALTER TABLE "NoticeFiles" ALTER COLUMN "noticeId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Notice" ADD CONSTRAINT "Notice_culturalAgentPFId_fkey" FOREIGN KEY ("culturalAgentPFId") REFERENCES "CulturalAgentPF"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notice" ADD CONSTRAINT "Notice_culturalAgentPJId_fkey" FOREIGN KEY ("culturalAgentPJId") REFERENCES "CulturalAgentPJ"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NoticeFiles" ADD CONSTRAINT "NoticeFiles_noticeId_fkey" FOREIGN KEY ("noticeId") REFERENCES "Notice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
