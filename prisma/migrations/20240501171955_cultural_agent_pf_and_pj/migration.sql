/*
  Warnings:

  - You are about to drop the `CulturalAgent` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `File` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CulturalAgent" DROP CONSTRAINT "CulturalAgent_fileId_fkey";

-- DropForeignKey
ALTER TABLE "CulturalAgent" DROP CONSTRAINT "CulturalAgent_userId_fkey";

-- DropTable
DROP TABLE "CulturalAgent";

-- DropTable
DROP TABLE "File";

-- CreateTable
CREATE TABLE "CulturalAgentPF" (
    "id" SERIAL NOT NULL,
    "alternativeTel" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "complement" TEXT NOT NULL,
    "county" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "programs" TEXT[],
    "email" TEXT NOT NULL,
    "houseNumber" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "neighboorhood" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "proponent" TEXT NOT NULL,
    "public" BOOLEAN NOT NULL,
    "publicPlace" TEXT NOT NULL,
    "tel" TEXT NOT NULL,
    "uf" TEXT NOT NULL,
    "fileId" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CulturalAgentPF_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FilePF" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "contentType" TEXT NOT NULL,
    "culturalAgentPFId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FilePF_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CulturalAgentPJ" (
    "id" SERIAL NOT NULL,
    "alternativeTel" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "complement" TEXT NOT NULL,
    "county" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "programs" TEXT[],
    "email" TEXT NOT NULL,
    "houseNumber" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "neighboorhood" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "proponent" TEXT NOT NULL,
    "public" BOOLEAN NOT NULL,
    "publicPlace" TEXT NOT NULL,
    "tel" TEXT NOT NULL,
    "uf" TEXT NOT NULL,
    "fileId" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CulturalAgentPJ_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FilePJ" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "contentType" TEXT NOT NULL,
    "culturalAgentPJId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FilePJ_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CulturalAgentPF_fileId_key" ON "CulturalAgentPF"("fileId");

-- CreateIndex
CREATE UNIQUE INDEX "CulturalAgentPF_userId_key" ON "CulturalAgentPF"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "CulturalAgentPJ_fileId_key" ON "CulturalAgentPJ"("fileId");

-- CreateIndex
CREATE UNIQUE INDEX "CulturalAgentPJ_userId_key" ON "CulturalAgentPJ"("userId");

-- AddForeignKey
ALTER TABLE "CulturalAgentPF" ADD CONSTRAINT "CulturalAgentPF_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "FilePF"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CulturalAgentPF" ADD CONSTRAINT "CulturalAgentPF_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CulturalAgentPJ" ADD CONSTRAINT "CulturalAgentPJ_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "FilePJ"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CulturalAgentPJ" ADD CONSTRAINT "CulturalAgentPJ_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
