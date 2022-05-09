/*
  Warnings:

  - A unique constraint covering the columns `[id,userId]` on the table `ToDo` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "ToDo_userId_key";

-- CreateIndex
CREATE UNIQUE INDEX "ToDo_id_userId_key" ON "ToDo"("id", "userId");
