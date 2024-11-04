/*
  Warnings:

  - You are about to drop the column `careGiverId` on the `Device` table. All the data in the column will be lost.
  - You are about to drop the `CareGiver` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CareGiverToPatient` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Device` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Device` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Device" DROP CONSTRAINT "Device_careGiverId_fkey";

-- DropForeignKey
ALTER TABLE "_CareGiverToPatient" DROP CONSTRAINT "_CareGiverToPatient_A_fkey";

-- DropForeignKey
ALTER TABLE "_CareGiverToPatient" DROP CONSTRAINT "_CareGiverToPatient_B_fkey";

-- DropIndex
DROP INDEX "Device_careGiverId_key";

-- AlterTable
ALTER TABLE "Device" DROP COLUMN "careGiverId",
ADD COLUMN     "userId" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "Device_id_seq";

-- DropTable
DROP TABLE "CareGiver";

-- DropTable
DROP TABLE "_CareGiverToPatient";

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PatientToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_PatientToUser_AB_unique" ON "_PatientToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_PatientToUser_B_index" ON "_PatientToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Device_userId_key" ON "Device"("userId");

-- AddForeignKey
ALTER TABLE "Device" ADD CONSTRAINT "Device_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PatientToUser" ADD CONSTRAINT "_PatientToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Patient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PatientToUser" ADD CONSTRAINT "_PatientToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
