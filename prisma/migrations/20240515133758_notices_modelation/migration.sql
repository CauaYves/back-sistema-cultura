-- CreateTable
CREATE TABLE "NoticePreview" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "observations" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "openingDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "registered" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NoticePreview_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notice" (
    "id" SERIAL NOT NULL,
    "productionNacionality" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "goals" TEXT NOT NULL,
    "justification" TEXT NOT NULL,
    "achievementStrategies" TEXT NOT NULL,
    "Partnerships" TEXT NOT NULL,
    "Accessibility" TEXT NOT NULL,
    "culturalProduct" TEXT NOT NULL,
    "attachments" TEXT[],
    "culturalAgentPFId" INTEGER,
    "culturalAgentPJId" INTEGER,
    "projectCoordinator" INTEGER NOT NULL,
    "noticePreviewId" INTEGER NOT NULL,
    "responsibleId" INTEGER NOT NULL,
    "projectCoordinatorId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Notice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Responsible" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "rg" TEXT NOT NULL,
    "issuingBody" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "tel" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "complement" TEXT NOT NULL,
    "neighboorHood" TEXT NOT NULL,
    "county" TEXT NOT NULL,
    "uf" TEXT NOT NULL,
    "activiesOnLastTwoYears" TEXT NOT NULL,
    "noticeId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Responsible_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectCoordinator" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "rg" TEXT NOT NULL,
    "issuingBody" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "tel" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "complement" TEXT NOT NULL,
    "neighboorHood" TEXT NOT NULL,
    "county" TEXT NOT NULL,
    "uf" TEXT NOT NULL,
    "activiesOnLastTwoYears" TEXT NOT NULL,
    "noticeId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProjectCoordinator_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "noticeFiles" (
    "id" SERIAL NOT NULL,
    "noticeId" INTEGER NOT NULL,
    "files" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "noticeFiles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Notice_culturalAgentPFId_key" ON "Notice"("culturalAgentPFId");

-- CreateIndex
CREATE UNIQUE INDEX "Notice_culturalAgentPJId_key" ON "Notice"("culturalAgentPJId");

-- CreateIndex
CREATE UNIQUE INDEX "Notice_projectCoordinator_key" ON "Notice"("projectCoordinator");

-- CreateIndex
CREATE UNIQUE INDEX "Notice_noticePreviewId_key" ON "Notice"("noticePreviewId");

-- CreateIndex
CREATE UNIQUE INDEX "Notice_responsibleId_key" ON "Notice"("responsibleId");

-- CreateIndex
CREATE UNIQUE INDEX "Notice_projectCoordinatorId_key" ON "Notice"("projectCoordinatorId");

-- CreateIndex
CREATE UNIQUE INDEX "Responsible_noticeId_key" ON "Responsible"("noticeId");

-- CreateIndex
CREATE UNIQUE INDEX "ProjectCoordinator_noticeId_key" ON "ProjectCoordinator"("noticeId");

-- CreateIndex
CREATE UNIQUE INDEX "noticeFiles_noticeId_key" ON "noticeFiles"("noticeId");

-- AddForeignKey
ALTER TABLE "Notice" ADD CONSTRAINT "Notice_culturalAgentPFId_fkey" FOREIGN KEY ("culturalAgentPFId") REFERENCES "CulturalAgentPF"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notice" ADD CONSTRAINT "Notice_culturalAgentPJId_fkey" FOREIGN KEY ("culturalAgentPJId") REFERENCES "CulturalAgentPJ"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notice" ADD CONSTRAINT "Notice_noticePreviewId_fkey" FOREIGN KEY ("noticePreviewId") REFERENCES "NoticePreview"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notice" ADD CONSTRAINT "Notice_responsibleId_fkey" FOREIGN KEY ("responsibleId") REFERENCES "Responsible"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notice" ADD CONSTRAINT "Notice_projectCoordinatorId_fkey" FOREIGN KEY ("projectCoordinatorId") REFERENCES "ProjectCoordinator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "noticeFiles" ADD CONSTRAINT "noticeFiles_noticeId_fkey" FOREIGN KEY ("noticeId") REFERENCES "Notice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
