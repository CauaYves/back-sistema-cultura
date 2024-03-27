-- CreateTable
CREATE TABLE "CulturalCollective" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "area" TEXT NOT NULL,
    "opening" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "neighboorhood" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "complement" TEXT NOT NULL,
    "county" TEXT NOT NULL,
    "responsible" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CulturalCollective_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CulturalCollective" ADD CONSTRAINT "CulturalCollective_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
