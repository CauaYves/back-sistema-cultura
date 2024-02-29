/*
  Warnings:

  - You are about to drop the column `bonrdate` on the `CulturalAgent` table. All the data in the column will be lost.
  - Added the required column `borndate` to the `CulturalAgent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CulturalAgent" DROP COLUMN "bonrdate",
ADD COLUMN     "borndate" TIMESTAMP(3) NOT NULL;
