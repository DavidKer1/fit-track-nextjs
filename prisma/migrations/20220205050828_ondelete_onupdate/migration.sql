/*
  Warnings:

  - You are about to drop the column `exerciseId` on the `Set` table. All the data in the column will be lost.
  - You are about to drop the column `workoutId` on the `Set` table. All the data in the column will be lost.
  - You are about to drop the column `workoutId` on the `Exercise` table. All the data in the column will be lost.
  - Added the required column `exerciseWorkoutId` to the `Set` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "ExerciseWorkout" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "workoutId" TEXT,
    "exerciseId" TEXT NOT NULL,
    CONSTRAINT "ExerciseWorkout_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "Workout" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "ExerciseWorkout_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Set" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "reps" INTEGER NOT NULL,
    "weight" INTEGER NOT NULL,
    "exerciseWorkoutId" TEXT NOT NULL,
    CONSTRAINT "Set_exerciseWorkoutId_fkey" FOREIGN KEY ("exerciseWorkoutId") REFERENCES "ExerciseWorkout" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Set" ("id", "name", "reps", "weight") SELECT "id", "name", "reps", "weight" FROM "Set";
DROP TABLE "Set";
ALTER TABLE "new_Set" RENAME TO "Set";
CREATE TABLE "new_Workout" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "finished" BOOLEAN NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Workout_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Workout" ("date", "finished", "id", "name", "userId") SELECT "date", "finished", "id", "name", "userId" FROM "Workout";
DROP TABLE "Workout";
ALTER TABLE "new_Workout" RENAME TO "Workout";
CREATE TABLE "new_Exercise" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "categoryId" TEXT,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Exercise_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "ExerciseCategory" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Exercise_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET DEFAULT ON UPDATE CASCADE
);
INSERT INTO "new_Exercise" ("categoryId", "id", "name", "userId") SELECT "categoryId", "id", "name", "userId" FROM "Exercise";
DROP TABLE "Exercise";
ALTER TABLE "new_Exercise" RENAME TO "Exercise";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
