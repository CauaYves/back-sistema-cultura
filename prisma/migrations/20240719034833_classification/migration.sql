-- CreateTable
CREATE TABLE "Classification" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "noticeNumber" TEXT NOT NULL,
    "projectNumber" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "proponentName" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "situation" TEXT NOT NULL,
    "attachments" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Classification_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Classification" ADD CONSTRAINT "Classification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
