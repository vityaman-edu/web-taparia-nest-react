/*
  Warnings:

  - Added the required column `x` to the `tap` table without a default value. This is not possible if the table is not empty.
  - Added the required column `y` to the `tap` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tap" ADD COLUMN     "x" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "y" DOUBLE PRECISION NOT NULL;
