/*
  Warnings:

  - A unique constraint covering the columns `[deviceId]` on the table `Patient` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Patient" ADD COLUMN     "deviceId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Patient_deviceId_key" ON "Patient"("deviceId");

-- AddForeignKey
ALTER TABLE "Patient" ADD CONSTRAINT "Patient_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "Device"("id") ON DELETE SET NULL ON UPDATE CASCADE;
