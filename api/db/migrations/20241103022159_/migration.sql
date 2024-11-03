/*
  Warnings:

  - The primary key for the `CareGiver` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Patient` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Task` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `parentTask` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Device" DROP CONSTRAINT "Device_careGiverId_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_patientId_fkey";

-- DropForeignKey
ALTER TABLE "_CareGiverToPatient" DROP CONSTRAINT "_CareGiverToPatient_A_fkey";

-- DropForeignKey
ALTER TABLE "_CareGiverToPatient" DROP CONSTRAINT "_CareGiverToPatient_B_fkey";

-- AlterTable
ALTER TABLE "CareGiver" DROP CONSTRAINT "CareGiver_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "CareGiver_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "CareGiver_id_seq";

-- AlterTable
ALTER TABLE "Device" ALTER COLUMN "careGiverId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Patient" DROP CONSTRAINT "Patient_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Patient_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Patient_id_seq";

-- AlterTable
ALTER TABLE "Task" DROP CONSTRAINT "Task_pkey",
ADD COLUMN     "parentTask" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "patientId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Task_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Task_id_seq";

-- AlterTable
ALTER TABLE "_CareGiverToPatient" ALTER COLUMN "A" SET DATA TYPE TEXT,
ALTER COLUMN "B" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Device" ADD CONSTRAINT "Device_careGiverId_fkey" FOREIGN KEY ("careGiverId") REFERENCES "CareGiver"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CareGiverToPatient" ADD CONSTRAINT "_CareGiverToPatient_A_fkey" FOREIGN KEY ("A") REFERENCES "CareGiver"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CareGiverToPatient" ADD CONSTRAINT "_CareGiverToPatient_B_fkey" FOREIGN KEY ("B") REFERENCES "Patient"("id") ON DELETE CASCADE ON UPDATE CASCADE;
