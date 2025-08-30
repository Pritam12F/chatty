/*
  Warnings:

  - Added the required column `transcribedText` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Room" ADD COLUMN     "transcribedText" TEXT NOT NULL;
