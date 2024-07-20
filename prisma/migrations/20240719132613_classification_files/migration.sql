/*
  Warnings:

  - You are about to drop the column `attachments` on the `Classification` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Classification" DROP COLUMN "attachments",
ADD COLUMN     "classificationFilesId" INTEGER,
ADD COLUMN     "classificationId" INTEGER;

-- CreateTable
CREATE TABLE "ClassificationFiles" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "contentType" TEXT NOT NULL,

    CONSTRAINT "ClassificationFiles_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Classification" ADD CONSTRAINT "Classification_classificationFilesId_fkey" FOREIGN KEY ("classificationFilesId") REFERENCES "ClassificationFiles"("id") ON DELETE SET NULL ON UPDATE CASCADE;
