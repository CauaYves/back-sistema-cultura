/*
  Warnings:

  - You are about to drop the column `registered` on the `NoticePreview` table. All the data in the column will be lost.
  - You are about to drop the `noticeFiles` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "noticeFiles" DROP CONSTRAINT "noticeFiles_noticeId_fkey";

-- AlterTable
ALTER TABLE "NoticePreview" DROP COLUMN "registered";

-- DropTable
DROP TABLE "noticeFiles";

-- CreateTable
CREATE TABLE "NoticeFiles" (
    "id" SERIAL NOT NULL,
    "noticeId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "contentType" TEXT NOT NULL,
    "culturalAgentPJId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "NoticeFiles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "NoticeFiles_noticeId_key" ON "NoticeFiles"("noticeId");

-- AddForeignKey
ALTER TABLE "NoticeFiles" ADD CONSTRAINT "NoticeFiles_noticeId_fkey" FOREIGN KEY ("noticeId") REFERENCES "Notice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NoticeFiles" ADD CONSTRAINT "NoticeFiles_culturalAgentPJId_fkey" FOREIGN KEY ("culturalAgentPJId") REFERENCES "CulturalAgentPJ"("id") ON DELETE SET NULL ON UPDATE CASCADE;
