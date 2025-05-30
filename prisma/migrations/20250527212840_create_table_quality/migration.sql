/*
  Warnings:

  - The values [Direção Elética] on the enum `Optional` will be removed. If these variants are still used in the database, this will fail.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Pendente', 'Aprovado', 'Reprovado', 'Em Manutenção', 'Pendente de Validação');

-- AlterEnum
BEGIN;
CREATE TYPE "Optional_new" AS ENUM ('Ár-Condicionado', 'Direção Elétrica', 'Câmbio Automático', 'Aro Liga Leve', 'Bando de Couro', 'Câmera de Ré');
ALTER TABLE "production" ALTER COLUMN "optional" TYPE "Optional_new"[] USING ("optional"::text::"Optional_new"[]);
ALTER TYPE "Optional" RENAME TO "Optional_old";
ALTER TYPE "Optional_new" RENAME TO "Optional";
DROP TYPE "Optional_old";
COMMIT;

-- CreateTable
CREATE TABLE "quality" (
    "id" TEXT NOT NULL,
    "productionId" TEXT NOT NULL,
    "status" "Status" NOT NULL,
    "motor" BOOLEAN,
    "pneu" BOOLEAN,
    "battery" BOOLEAN,
    "optional" BOOLEAN,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "quality_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "quality" ADD CONSTRAINT "quality_productionId_fkey" FOREIGN KEY ("productionId") REFERENCES "production"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
