-- CreateTable
CREATE TABLE "Exercicio" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "musculo" TEXT NOT NULL,
    "musculo_residual" TEXT,
    "series" INTEGER NOT NULL,
    "carga" INTEGER NOT NULL,
    "carga_anterior" INTEGER,
    "repeticoes" INTEGER NOT NULL,
    "repeticoes_anterior" INTEGER,
    "info" TEXT NOT NULL,
    "data" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "data_anterior" TIMESTAMP(3),
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Exercicio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Exercicio" ADD CONSTRAINT "Exercicio_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
