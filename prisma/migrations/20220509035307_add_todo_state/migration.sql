-- CreateEnum
CREATE TYPE "ToDoState" AS ENUM ('TODO', 'IN_PROGRESS', 'MADE');

-- AlterTable
ALTER TABLE "ToDo" ADD COLUMN     "state" "ToDoState" NOT NULL DEFAULT E'TODO';
