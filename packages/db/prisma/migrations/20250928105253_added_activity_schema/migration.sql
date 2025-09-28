-- CreateEnum
CREATE TYPE "public"."ActivityType" AS ENUM ('GEN_SUMMARY', 'GEN_CARDS', 'GEN_CHAPTERS', 'START_CHAT');

-- CreateTable
CREATE TABLE "public"."Activity" (
    "id" TEXT NOT NULL,
    "type" "public"."ActivityType" NOT NULL,
    "roomId" TEXT NOT NULL,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Activity_id_key" ON "public"."Activity"("id");

-- AddForeignKey
ALTER TABLE "public"."Activity" ADD CONSTRAINT "Activity_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "public"."Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
