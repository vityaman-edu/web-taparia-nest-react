/*
  Warnings:

  - Added the required column `status` to the `tap` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TapStatus" AS ENUM ('HIT', 'MISS');

-- AlterTable
ALTER TABLE "tap" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "status" "TapStatus" NOT NULL;
