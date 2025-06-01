/*
  Warnings:

  - You are about to drop the column `quatity` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "quatity",
ADD COLUMN     "quantity" INTEGER,
ADD COLUMN     "sold" INTEGER;
