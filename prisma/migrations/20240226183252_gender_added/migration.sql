/*
  Warnings:

  - Added the required column `gender` to the `CulturalAgent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CulturalAgent" ADD COLUMN     "gender" TEXT NOT NULL;
