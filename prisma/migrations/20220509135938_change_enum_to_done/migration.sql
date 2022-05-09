/*
  Warnings:

  - The values [MADE] on the enum `ToDoState` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ToDoState_new" AS ENUM ('TODO', 'IN_PROGRESS', 'DONE');
ALTER TABLE "ToDo" ALTER COLUMN "state" DROP DEFAULT;
ALTER TABLE "ToDo" ALTER COLUMN "state" TYPE "ToDoState_new" USING ("state"::text::"ToDoState_new");
ALTER TYPE "ToDoState" RENAME TO "ToDoState_old";
ALTER TYPE "ToDoState_new" RENAME TO "ToDoState";
DROP TYPE "ToDoState_old";
ALTER TABLE "ToDo" ALTER COLUMN "state" SET DEFAULT 'TODO';
COMMIT;
