/*
  Warnings:

  - You are about to drop the column `external_id` on the `account` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[authMethod,externalId]` on the table `account` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `externalId` to the `account` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "account_authMethod_external_id_key";

-- AlterTable
ALTER TABLE "account" DROP COLUMN "external_id",
ADD COLUMN     "externalId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "account_authMethod_externalId_key" ON "account"("authMethod", "externalId");
