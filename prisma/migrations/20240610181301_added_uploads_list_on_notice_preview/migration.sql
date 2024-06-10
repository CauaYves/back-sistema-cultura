-- AlterTable
ALTER TABLE "NoticePreview" ADD COLUMN     "uploads" TEXT[] DEFAULT ARRAY['RG, CPF, Comprovante de residência']::TEXT[];
