-- CreateTable
CREATE TABLE "CulturalAgent" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "codename" TEXT NOT NULL,
    "mothername" TEXT NOT NULL,
    "bonrdate" TIMESTAMP(3) NOT NULL,
    "nacionality" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "naturalness" TEXT NOT NULL,
    "rg" TEXT NOT NULL,
    "issuingbody" TEXT NOT NULL,
    "uf" TEXT NOT NULL,
    "race" TEXT NOT NULL,
    "student" BOOLEAN NOT NULL,
    "education" TEXT NOT NULL,
    "extracurricularCourses" TEXT NOT NULL,
    "superiorCourses" TEXT NOT NULL,
    "deficiency" BOOLEAN NOT NULL,
    "address" TEXT NOT NULL,
    "houseNumber" TEXT NOT NULL,
    "complement" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "public" BOOLEAN NOT NULL,

    CONSTRAINT "CulturalAgent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Files" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "lastModified" BIGINT NOT NULL,
    "lasModifiedDate" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "webkitRelativePath" TEXT NOT NULL,

    CONSTRAINT "Files_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CulturalAgent_email_key" ON "CulturalAgent"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Files_userId_key" ON "Files"("userId");

-- AddForeignKey
ALTER TABLE "Files" ADD CONSTRAINT "Files_userId_fkey" FOREIGN KEY ("userId") REFERENCES "CulturalAgent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
