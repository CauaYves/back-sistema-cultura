/*
  Warnings:

  - You are about to drop the column `noticeId` on the `ProjectCoordinator` table. All the data in the column will be lost.
  - You are about to drop the column `noticeId` on the `Responsible` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "ProjectCoordinator_noticeId_key";

-- DropIndex
DROP INDEX "Responsible_noticeId_key";

-- AlterTable
ALTER TABLE "ProjectCoordinator" DROP COLUMN "noticeId";

-- AlterTable
ALTER TABLE "Responsible" DROP COLUMN "noticeId";
