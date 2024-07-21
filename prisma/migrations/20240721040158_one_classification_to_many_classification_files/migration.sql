/*
  Warnings:

  - You are about to drop the column `classificationFilesId` on the `Classification` table. All the data in the column will be lost.
  - Added the required column `classificationId` to the `ClassificationFiles` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Classification" DROP CONSTRAINT "Classification_classificationFilesId_fkey";

-- AlterTable
ALTER TABLE "Classification" DROP COLUMN "classificationFilesId";

-- AlterTable
ALTER TABLE "ClassificationFiles" ADD COLUMN     "classificationId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "ClassificationFiles" ADD CONSTRAINT "ClassificationFiles_classificationId_fkey" FOREIGN KEY ("classificationId") REFERENCES "Classification"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
