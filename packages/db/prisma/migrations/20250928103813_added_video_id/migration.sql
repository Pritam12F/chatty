/*
  Warnings:

  - Added the required column `videoId` to the `Video` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Video" ADD COLUMN     "videoId" TEXT NOT NULL;
