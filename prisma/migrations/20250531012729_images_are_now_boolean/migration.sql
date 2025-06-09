/*
  Warnings:

  - Changed the type of `isFifthPhoto` on the `Product` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `isFirstPhoto` on the `Product` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `isFourthPhoto` on the `Product` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `isSecondPhoto` on the `Product` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `isSixthPhoto` on the `Product` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `isThirdPhoto` on the `Product` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `originalTitle` on the `Product` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "isFifthPhoto",
ADD COLUMN     "isFifthPhoto" BOOLEAN NOT NULL,
DROP COLUMN "isFirstPhoto",
ADD COLUMN     "isFirstPhoto" BOOLEAN NOT NULL,
DROP COLUMN "isFourthPhoto",
ADD COLUMN     "isFourthPhoto" BOOLEAN NOT NULL,
DROP COLUMN "isSecondPhoto",
ADD COLUMN     "isSecondPhoto" BOOLEAN NOT NULL,
DROP COLUMN "isSixthPhoto",
ADD COLUMN     "isSixthPhoto" BOOLEAN NOT NULL,
DROP COLUMN "isThirdPhoto",
ADD COLUMN     "isThirdPhoto" BOOLEAN NOT NULL,
DROP COLUMN "originalTitle",
ADD COLUMN     "originalTitle" BOOLEAN NOT NULL;
