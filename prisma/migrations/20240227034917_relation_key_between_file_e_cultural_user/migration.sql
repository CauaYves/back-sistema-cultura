/*
  Warnings:

  - A unique constraint covering the columns `[fileId]` on the table `CulturalAgent` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `fileId` to the `CulturalAgent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CulturalAgent" ADD COLUMN     "fileId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "CulturalAgent_fileId_key" ON "CulturalAgent"("fileId");

-- AddForeignKey
ALTER TABLE "CulturalAgent" ADD CONSTRAINT "CulturalAgent_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "File"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
