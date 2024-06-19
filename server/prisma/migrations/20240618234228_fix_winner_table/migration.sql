/*
  Warnings:

  - A unique constraint covering the columns `[winnerId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Winner" DROP CONSTRAINT "Winner_userId_fkey";

-- CreateIndex
CREATE UNIQUE INDEX "User_winnerId_key" ON "User"("winnerId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_winnerId_fkey" FOREIGN KEY ("winnerId") REFERENCES "Winner"("id") ON DELETE SET NULL ON UPDATE CASCADE;
