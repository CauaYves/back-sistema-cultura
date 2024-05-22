-- DropForeignKey
ALTER TABLE "Notice" DROP CONSTRAINT "Notice_culturalAgentPFId_fkey";

-- DropForeignKey
ALTER TABLE "Notice" DROP CONSTRAINT "Notice_culturalAgentPJId_fkey";

-- AlterTable
ALTER TABLE "Notice" ALTER COLUMN "culturalAgentPFId" DROP NOT NULL,
ALTER COLUMN "culturalAgentPJId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Notice" ADD CONSTRAINT "Notice_culturalAgentPFId_fkey" FOREIGN KEY ("culturalAgentPFId") REFERENCES "CulturalAgentPF"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notice" ADD CONSTRAINT "Notice_culturalAgentPJId_fkey" FOREIGN KEY ("culturalAgentPJId") REFERENCES "CulturalAgentPJ"("id") ON DELETE SET NULL ON UPDATE CASCADE;
