-- CreateEnum
CREATE TYPE "Color" AS ENUM ('Preto', 'Prata', 'Branco', 'Cinza', 'Vermelho');

-- CreateEnum
CREATE TYPE "Optional" AS ENUM ('Ár-Condicionado', 'Direção Elética', 'Câmbio Automático', 'Aro Liga Leve', 'Bando de Couro', 'Câmera de Ré');

-- CreateTable
CREATE TABLE "Model" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "numberOfPorts" INTEGER NOT NULL,
    "fuelType" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Model_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_model" (
    "productId" TEXT NOT NULL,
    "modelId" TEXT NOT NULL,

    CONSTRAINT "product_model_pkey" PRIMARY KEY ("productId","modelId")
);

-- CreateTable
CREATE TABLE "production" (
    "id" TEXT NOT NULL,
    "modelId" TEXT NOT NULL,
    "color" "Color" NOT NULL,
    "amount" INTEGER NOT NULL,
    "optional" "Optional"[],
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "production_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "product_model" ADD CONSTRAINT "product_model_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_model" ADD CONSTRAINT "product_model_modelId_fkey" FOREIGN KEY ("modelId") REFERENCES "Model"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "production" ADD CONSTRAINT "production_modelId_fkey" FOREIGN KEY ("modelId") REFERENCES "Model"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
