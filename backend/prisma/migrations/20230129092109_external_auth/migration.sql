/*
  Warnings:

  - You are about to drop the column `email` on the `account` table. All the data in the column will be lost.
  - You are about to drop the column `passwordHash` on the `account` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[authMethod,external_id]` on the table `account` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `authMethod` to the `account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `external_id` to the `account` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AuthMethod" AS ENUM ('LOCAL', 'YANDEX_ID');

-- DropIndex
DROP INDEX "account_email_key";

-- AlterTable
ALTER TABLE "account" DROP COLUMN "email",
DROP COLUMN "passwordHash",
ADD COLUMN     "authMethod" "AuthMethod" NOT NULL,
ADD COLUMN     "external_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "auth_local" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,

    CONSTRAINT "auth_local_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auth_external" (
    "id" INTEGER NOT NULL,
    "method" "AuthMethod" NOT NULL,
    "login" TEXT NOT NULL,

    CONSTRAINT "auth_external_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "auth_local_email_key" ON "auth_local"("email");

-- CreateIndex
CREATE UNIQUE INDEX "account_authMethod_external_id_key" ON "account"("authMethod", "external_id");
