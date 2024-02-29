/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `CulturalAgent` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `CulturalAgent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CulturalAgent" ADD COLUMN     "userId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "CulturalAgent_userId_key" ON "CulturalAgent"("userId");

-- AddForeignKey
ALTER TABLE "CulturalAgent" ADD CONSTRAINT "CulturalAgent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
