-- CreateTable
CREATE TABLE "ProductPreviewImage" (
    "id" SERIAL NOT NULL,
    "data" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "productId" BIGINT NOT NULL,

    CONSTRAINT "ProductPreviewImage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProductPreviewImage" ADD CONSTRAINT "ProductPreviewImage_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
