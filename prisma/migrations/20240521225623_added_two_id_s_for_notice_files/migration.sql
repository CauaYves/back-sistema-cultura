-- AlterTable
ALTER TABLE "NoticeFiles" ADD COLUMN     "culturalAgentPFId" INTEGER;

-- AddForeignKey
ALTER TABLE "NoticeFiles" ADD CONSTRAINT "NoticeFiles_culturalAgentPFId_fkey" FOREIGN KEY ("culturalAgentPFId") REFERENCES "CulturalAgentPF"("id") ON DELETE SET NULL ON UPDATE CASCADE;
