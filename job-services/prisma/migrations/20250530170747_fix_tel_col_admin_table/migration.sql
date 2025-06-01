/*
  Warnings:

  - You are about to drop the column `Tel` on the `Admin` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[tel]` on the table `Admin` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Admin_Tel_key";

-- AlterTable
ALTER TABLE "Admin" DROP COLUMN "Tel",
ADD COLUMN     "tel" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Admin_tel_key" ON "Admin"("tel");
