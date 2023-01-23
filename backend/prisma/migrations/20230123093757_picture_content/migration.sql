/*
  Warnings:

  - Added the required column `content` to the `picture` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "picture" ADD COLUMN     "content" TEXT NOT NULL;
