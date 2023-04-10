-- CreateEnum
CREATE TYPE "AuthType" AS ENUM ('JWT', 'GOOGLE', 'GITHUB');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'MODER', 'ADMIN');

-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('PENDING', 'ACTIVE', 'FROZEN', 'BLOCKED');

-- CreateEnum
CREATE TYPE "TopicStatus" AS ENUM ('VISIBLE', 'HIDDEN');

-- CreateEnum
CREATE TYPE "TopicCategoryStatus" AS ENUM ('VISIBLE', 'HIDDEN');

-- CreateTable
CREATE TABLE "auth" (
    "type" "AuthType" NOT NULL,
    "user_id" UUID NOT NULL,
    "external_id" VARCHAR NOT NULL,

    CONSTRAINT "auth_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "session" (
    "id" TEXT NOT NULL,
    "ip" INET,
    "user_id" UUID NOT NULL,
    "is_used" BOOLEAN NOT NULL DEFAULT false,
    "metadata" JSONB NOT NULL,
    "refresh_token" VARCHAR NOT NULL,

    CONSTRAINT "session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" UUID NOT NULL,
    "username" VARCHAR(30) NOT NULL,
    "email" VARCHAR NOT NULL,
    "password" VARCHAR,
    "status" "UserStatus" NOT NULL DEFAULT 'PENDING',
    "role" "UserRole" NOT NULL DEFAULT 'USER',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_profile" (
    "user_id" UUID NOT NULL,
    "bio" VARCHAR,
    "last_active" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_profile_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "topic" (
    "id" UUID NOT NULL,
    "author_id" UUID NOT NULL,
    "category_id" UUID NOT NULL,
    "status" "TopicStatus" NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "tags" TEXT[],
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "topic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "topic_category" (
    "id" UUID NOT NULL,
    "title" VARCHAR NOT NULL,
    "status" "TopicCategoryStatus" NOT NULL DEFAULT 'VISIBLE',

    CONSTRAINT "topic_category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "topic_comment" (
    "id" UUID NOT NULL,
    "topic_id" UUID NOT NULL,
    "author_id" UUID NOT NULL,
    "parent_id" UUID,
    "message" VARCHAR NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "topic_comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "file" (
    "id" UUID NOT NULL,
    "file_id" VARCHAR NOT NULL,
    "bucket" VARCHAR NOT NULL,
    "url" TEXT NOT NULL,
    "user_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "file_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "avatar" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "file_id" UUID,
    "url" VARCHAR,

    CONSTRAINT "avatar_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "session_refresh_token_key" ON "session"("refresh_token");

-- CreateIndex
CREATE INDEX "session_user_id_idx" ON "session"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "topic_category_title_key" ON "topic_category"("title");

-- CreateIndex
CREATE UNIQUE INDEX "topic_comment_id_key" ON "topic_comment"("id");

-- AddForeignKey
ALTER TABLE "auth" ADD CONSTRAINT "auth_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_profile" ADD CONSTRAINT "user_profile_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "topic" ADD CONSTRAINT "topic_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "user_profile"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "topic" ADD CONSTRAINT "topic_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "topic_category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "topic_comment" ADD CONSTRAINT "topic_comment_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "user_profile"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "topic_comment" ADD CONSTRAINT "topic_comment_topic_id_fkey" FOREIGN KEY ("topic_id") REFERENCES "topic"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "topic_comment" ADD CONSTRAINT "topic_comment_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "topic_comment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "file" ADD CONSTRAINT "file_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "avatar" ADD CONSTRAINT "avatar_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user_profile"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "avatar" ADD CONSTRAINT "avatar_file_id_fkey" FOREIGN KEY ("file_id") REFERENCES "file"("id") ON DELETE CASCADE ON UPDATE CASCADE;
