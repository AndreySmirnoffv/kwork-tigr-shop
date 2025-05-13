/*
  Warnings:

  - You are about to drop the column `confirmationUrl` on the `Payments` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Payments" DROP COLUMN "confirmationUrl";
