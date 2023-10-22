/*
  Warnings:

  - You are about to drop the column `title` on the `genre` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `genre` DROP COLUMN `title`,
    ADD COLUMN `name` VARCHAR(255) NULL;

-- CreateTable
CREATE TABLE `attribute` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `attribute_values` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `attribute_attribute_values` (
    `itemId` INTEGER NOT NULL,
    `attributeId` INTEGER NOT NULL,

    PRIMARY KEY (`itemId`, `attributeId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `attribute_attribute_values` ADD CONSTRAINT `attribute_attribute_values_itemId_fkey` FOREIGN KEY (`itemId`) REFERENCES `Item`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `attribute_attribute_values` ADD CONSTRAINT `attribute_attribute_values_attributeId_fkey` FOREIGN KEY (`attributeId`) REFERENCES `attribute`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
