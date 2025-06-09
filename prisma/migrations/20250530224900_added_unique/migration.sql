/*
  Warnings:

  - A unique constraint covering the columns `[article]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `isFifthPhoto` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isFirstPhoto` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isFourthPhoto` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isSecondPhoto` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isSixthPhoto` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isThirdPhoto` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `originalTitle` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `photoName` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "isFifthPhoto" TEXT NOT NULL,
ADD COLUMN     "isFirstPhoto" TEXT NOT NULL,
ADD COLUMN     "isFourthPhoto" TEXT NOT NULL,
ADD COLUMN     "isSecondPhoto" TEXT NOT NULL,
ADD COLUMN     "isSixthPhoto" TEXT NOT NULL,
ADD COLUMN     "isThirdPhoto" TEXT NOT NULL,
ADD COLUMN     "originalTitle" TEXT NOT NULL,
ADD COLUMN     "photoName" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Product_article_key" ON "Product"("article");
