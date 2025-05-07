-- AlterTable
ALTER TABLE "Family" ADD COLUMN     "inviteSent" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Guest" ALTER COLUMN "withoutName" SET DEFAULT false;
