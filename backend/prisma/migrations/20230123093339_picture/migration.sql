-- CreateTable
CREATE TABLE "profile" (
    "name" TEXT NOT NULL,
    "account_id" INTEGER NOT NULL,

    CONSTRAINT "profile_pkey" PRIMARY KEY ("account_id")
);

-- CreateTable
CREATE TABLE "picture" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "ownerId" INTEGER NOT NULL,

    CONSTRAINT "picture_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "profile" ADD CONSTRAINT "profile_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "picture" ADD CONSTRAINT "picture_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "profile"("account_id") ON DELETE RESTRICT ON UPDATE CASCADE;
