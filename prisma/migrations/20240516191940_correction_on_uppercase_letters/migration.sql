/*
  Warnings:

  - You are about to drop the column `Accessibility` on the `Notice` table. All the data in the column will be lost.
  - You are about to drop the column `Partnerships` on the `Notice` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Notice" DROP COLUMN "Accessibility",
DROP COLUMN "Partnerships",
ADD COLUMN     "accessibility" TEXT NOT NULL DEFAULT 'acessibilidade',
ADD COLUMN     "partnerships" TEXT NOT NULL DEFAULT 'acessibilidade';
