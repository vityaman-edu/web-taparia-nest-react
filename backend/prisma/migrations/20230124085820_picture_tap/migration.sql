-- CreateTable
CREATE TABLE "tap" (
    "id" SERIAL NOT NULL,
    "pictureId" INTEGER NOT NULL,
    "ownerId" INTEGER NOT NULL,

    CONSTRAINT "tap_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tap" ADD CONSTRAINT "tap_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "profile"("account_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tap" ADD CONSTRAINT "tap_pictureId_fkey" FOREIGN KEY ("pictureId") REFERENCES "picture"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
