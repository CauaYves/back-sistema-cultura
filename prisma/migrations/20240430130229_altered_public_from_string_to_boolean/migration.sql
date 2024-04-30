/*
  Warnings:

  - Changed the type of `public` on the `CulturalAgent` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "CulturalAgent" DROP COLUMN "public",
ADD COLUMN     "public" BOOLEAN NOT NULL;
