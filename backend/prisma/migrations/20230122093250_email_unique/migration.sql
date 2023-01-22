/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `account` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "account_email_key" ON "account"("email");
