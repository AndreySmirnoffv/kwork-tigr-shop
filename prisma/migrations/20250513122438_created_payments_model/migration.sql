-- CreateTable
CREATE TABLE "Payments" (
    "id" BIGSERIAL NOT NULL,
    "paymentId" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "isPaid" BOOLEAN NOT NULL,
    "confirmationUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "Payments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Payments_paymentId_key" ON "Payments"("paymentId");
