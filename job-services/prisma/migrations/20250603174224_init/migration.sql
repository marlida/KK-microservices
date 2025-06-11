-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "userId" INTEGER;

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "description" SET DEFAULT '',
ALTER COLUMN "quantity" SET DEFAULT 0,
ALTER COLUMN "sold" SET DEFAULT 0;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
