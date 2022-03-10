-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "username" VARCHAR(50) NOT NULL,
    "name" VARCHAR(100),
    "email" VARCHAR(50) NOT NULL,
    "statusMessage" VARCHAR(300),
    "password" VARCHAR(300),
    "googleUserId" VARCHAR(200),
    "appleUserId" VARCHAR(200),
    "profileImageUrl" VARCHAR(500),
    "disabled" BOOLEAN DEFAULT false,
    "isCreator" BOOLEAN DEFAULT false,
    "verified" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
