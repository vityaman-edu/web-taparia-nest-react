/*
  Warnings:

  - The primary key for the `auth_external` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "auth_external" DROP CONSTRAINT "auth_external_pkey",
ADD CONSTRAINT "auth_external_pkey" PRIMARY KEY ("id", "method");
