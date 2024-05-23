/*
  Warnings:

  - You are about to drop the column `projectCoordinator` on the `Notice` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Notice_projectCoordinator_key";

-- AlterTable
ALTER TABLE "Notice" DROP COLUMN "projectCoordinator";
