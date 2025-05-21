/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `marks` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "marks_name_key" ON "marks"("name");
