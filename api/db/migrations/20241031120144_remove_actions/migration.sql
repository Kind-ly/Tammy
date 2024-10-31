/*
  Warnings:

  - You are about to drop the `Action` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "TasksStatus" AS ENUM ('TODO', 'COMPLETED', 'UNCERTAIN');

-- DropForeignKey
ALTER TABLE "Action" DROP CONSTRAINT "Action_patientId_fkey";

-- DropForeignKey
ALTER TABLE "Action" DROP CONSTRAINT "Action_taskId_fkey";

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "status" "TasksStatus" NOT NULL DEFAULT 'TODO',
ADD COLUMN     "timeCompleted" TEXT;

-- DropTable
DROP TABLE "Action";
