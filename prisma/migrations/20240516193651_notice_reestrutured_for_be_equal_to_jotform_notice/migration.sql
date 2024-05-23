/*
  Warnings:

  - You are about to drop the column `achievementStrategies` on the `Notice` table. All the data in the column will be lost.
  - You are about to drop the column `culturalProduct` on the `Notice` table. All the data in the column will be lost.
  - You are about to drop the column `goals` on the `Notice` table. All the data in the column will be lost.
  - You are about to drop the column `partnerships` on the `Notice` table. All the data in the column will be lost.
  - You are about to drop the column `productionNacionality` on the `Notice` table. All the data in the column will be lost.
  - You are about to drop the column `summary` on the `Notice` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Notice" DROP COLUMN "achievementStrategies",
DROP COLUMN "culturalProduct",
DROP COLUMN "goals",
DROP COLUMN "partnerships",
DROP COLUMN "productionNacionality",
DROP COLUMN "summary",
ADD COLUMN     "accessDemocratization" TEXT NOT NULL DEFAULT 'accessDemocratization',
ADD COLUMN     "executionPlace" TEXT NOT NULL DEFAULT 'executionPlace',
ADD COLUMN     "name" TEXT NOT NULL DEFAULT 'name',
ADD COLUMN     "publicServed" TEXT NOT NULL DEFAULT 'publicServed',
ALTER COLUMN "description" SET DEFAULT 'description',
ALTER COLUMN "justification" SET DEFAULT 'justification';
