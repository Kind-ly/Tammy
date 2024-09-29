-- CreateTable
CREATE TABLE "Device" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "careGiverId" INTEGER NOT NULL,
    CONSTRAINT "Device_careGiverId_fkey" FOREIGN KEY ("careGiverId") REFERENCES "CareGiver" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CareGiver" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Patient" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "patientInfo" TEXT,
    "timezone" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Task" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "instructions" TEXT,
    "patientId" INTEGER NOT NULL,
    CONSTRAINT "Task_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Action" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "patientId" INTEGER NOT NULL,
    "taskId" INTEGER NOT NULL,
    "details" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    CONSTRAINT "Action_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Action_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Reminder" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "patientId" INTEGER NOT NULL,
    "taskId" INTEGER NOT NULL,
    "instructions" TEXT NOT NULL,
    CONSTRAINT "Reminder_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Reminder_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_CareGiverToPatient" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_CareGiverToPatient_A_fkey" FOREIGN KEY ("A") REFERENCES "CareGiver" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_CareGiverToPatient_B_fkey" FOREIGN KEY ("B") REFERENCES "Patient" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Device_careGiverId_key" ON "Device"("careGiverId");

-- CreateIndex
CREATE UNIQUE INDEX "CareGiver_email_key" ON "CareGiver"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Action_taskId_key" ON "Action"("taskId");

-- CreateIndex
CREATE UNIQUE INDEX "Reminder_taskId_key" ON "Reminder"("taskId");

-- CreateIndex
CREATE UNIQUE INDEX "_CareGiverToPatient_AB_unique" ON "_CareGiverToPatient"("A", "B");

-- CreateIndex
CREATE INDEX "_CareGiverToPatient_B_index" ON "_CareGiverToPatient"("B");
