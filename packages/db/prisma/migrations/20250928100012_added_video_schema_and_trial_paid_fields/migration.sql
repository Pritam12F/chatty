/*
  Warnings:

  - You are about to drop the column `video` on the `Room` table. All the data in the column will be lost.
  - Added the required column `title` to the `Chat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hasPaid` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isTrial` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Chat" ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."Room" DROP COLUMN "video";

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "hasPaid" BOOLEAN NOT NULL,
ADD COLUMN     "isTrial" BOOLEAN NOT NULL;

-- CreateTable
CREATE TABLE "public"."Video" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "duration" TIMESTAMP(3) NOT NULL,
    "url" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,

    CONSTRAINT "Video_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Video_id_key" ON "public"."Video"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Video_roomId_key" ON "public"."Video"("roomId");

-- AddForeignKey
ALTER TABLE "public"."Video" ADD CONSTRAINT "Video_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "public"."Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
