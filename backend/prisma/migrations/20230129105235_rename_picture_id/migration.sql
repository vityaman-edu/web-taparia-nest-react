/*
  Warnings:

  - The primary key for the `profile` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `account_id` on the `profile` table. All the data in the column will be lost.
  - Added the required column `accountId` to the `profile` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "picture" DROP CONSTRAINT "picture_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "profile" DROP CONSTRAINT "profile_account_id_fkey";

-- DropForeignKey
ALTER TABLE "tap" DROP CONSTRAINT "tap_ownerId_fkey";

-- AlterTable
ALTER TABLE "profile" DROP CONSTRAINT "profile_pkey",
DROP COLUMN "account_id",
ADD COLUMN     "accountId" INTEGER NOT NULL,
ADD CONSTRAINT "profile_pkey" PRIMARY KEY ("accountId");

-- AddForeignKey
ALTER TABLE "profile" ADD CONSTRAINT "profile_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "picture" ADD CONSTRAINT "picture_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "profile"("accountId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tap" ADD CONSTRAINT "tap_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "profile"("accountId") ON DELETE RESTRICT ON UPDATE CASCADE;
