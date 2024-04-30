/*
  Warnings:

  - You are about to drop the column `address` on the `CulturalAgent` table. All the data in the column will be lost.
  - You are about to drop the column `borndate` on the `CulturalAgent` table. All the data in the column will be lost.
  - You are about to drop the column `codename` on the `CulturalAgent` table. All the data in the column will be lost.
  - You are about to drop the column `deficiency` on the `CulturalAgent` table. All the data in the column will be lost.
  - You are about to drop the column `education` on the `CulturalAgent` table. All the data in the column will be lost.
  - You are about to drop the column `extracurricularCourses` on the `CulturalAgent` table. All the data in the column will be lost.
  - You are about to drop the column `gender` on the `CulturalAgent` table. All the data in the column will be lost.
  - You are about to drop the column `issuingbody` on the `CulturalAgent` table. All the data in the column will be lost.
  - You are about to drop the column `mothername` on the `CulturalAgent` table. All the data in the column will be lost.
  - You are about to drop the column `nacionality` on the `CulturalAgent` table. All the data in the column will be lost.
  - You are about to drop the column `naturalness` on the `CulturalAgent` table. All the data in the column will be lost.
  - You are about to drop the column `race` on the `CulturalAgent` table. All the data in the column will be lost.
  - You are about to drop the column `rg` on the `CulturalAgent` table. All the data in the column will be lost.
  - You are about to drop the column `student` on the `CulturalAgent` table. All the data in the column will be lost.
  - You are about to drop the column `superiorCourses` on the `CulturalAgent` table. All the data in the column will be lost.
  - Added the required column `alternativeTel` to the `CulturalAgent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `county` to the `CulturalAgent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cpf` to the `CulturalAgent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cultura` to the `CulturalAgent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `CulturalAgent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `neighboorhood` to the `CulturalAgent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `CulturalAgent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `proponent` to the `CulturalAgent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `publicPlace` to the `CulturalAgent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tel` to the `CulturalAgent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CulturalAgent" DROP COLUMN "address",
DROP COLUMN "borndate",
DROP COLUMN "codename",
DROP COLUMN "deficiency",
DROP COLUMN "education",
DROP COLUMN "extracurricularCourses",
DROP COLUMN "gender",
DROP COLUMN "issuingbody",
DROP COLUMN "mothername",
DROP COLUMN "nacionality",
DROP COLUMN "naturalness",
DROP COLUMN "race",
DROP COLUMN "rg",
DROP COLUMN "student",
DROP COLUMN "superiorCourses",
ADD COLUMN     "alternativeTel" TEXT NOT NULL,
ADD COLUMN     "county" TEXT NOT NULL,
ADD COLUMN     "cpf" TEXT NOT NULL,
ADD COLUMN     "cultura" BOOLEAN NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "neighboorhood" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL,
ADD COLUMN     "proponent" TEXT NOT NULL,
ADD COLUMN     "publicPlace" TEXT NOT NULL,
ADD COLUMN     "tel" TEXT NOT NULL,
ALTER COLUMN "public" SET DATA TYPE TEXT;
