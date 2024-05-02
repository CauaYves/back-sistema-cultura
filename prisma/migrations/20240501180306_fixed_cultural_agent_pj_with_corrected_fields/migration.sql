/*
  Warnings:

  - You are about to drop the column `name` on the `CulturalAgentPJ` table. All the data in the column will be lost.
  - Added the required column `cnpj` to the `CulturalAgentPJ` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fantasyName` to the `CulturalAgentPJ` table without a default value. This is not possible if the table is not empty.
  - Added the required column `job` to the `CulturalAgentPJ` table without a default value. This is not possible if the table is not empty.
  - Added the required column `responsible` to the `CulturalAgentPJ` table without a default value. This is not possible if the table is not empty.
  - Added the required column `socialReason` to the `CulturalAgentPJ` table without a default value. This is not possible if the table is not empty.
  - Added the required column `website` to the `CulturalAgentPJ` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CulturalAgentPJ" DROP COLUMN "name",
ADD COLUMN     "cnpj" TEXT NOT NULL,
ADD COLUMN     "fantasyName" TEXT NOT NULL,
ADD COLUMN     "job" TEXT NOT NULL,
ADD COLUMN     "responsible" TEXT NOT NULL,
ADD COLUMN     "socialReason" TEXT NOT NULL,
ADD COLUMN     "website" TEXT NOT NULL;
