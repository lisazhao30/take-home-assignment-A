/*
  Warnings:

  - A unique constraint covering the columns `[formDataId]` on the table `queries` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "queries_formDataId_key" ON "queries"("formDataId");
