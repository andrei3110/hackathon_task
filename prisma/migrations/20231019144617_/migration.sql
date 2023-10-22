/*
  Warnings:

  - You are about to drop the `attribute` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `attribute_attribute_values` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `attribute_values` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `genre` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `item` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `items_attribute_values` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `attribute_attribute_values` DROP FOREIGN KEY `attribute_attribute_values_attributeId_fkey`;

-- DropForeignKey
ALTER TABLE `attribute_attribute_values` DROP FOREIGN KEY `attribute_attribute_values_attribute_valueId_fkey`;

-- DropForeignKey
ALTER TABLE `items_attribute_values` DROP FOREIGN KEY `Items_attribute_values_attribute_valuesId_fkey`;

-- DropForeignKey
ALTER TABLE `items_attribute_values` DROP FOREIGN KEY `Items_attribute_values_itemId_fkey`;

-- DropTable
DROP TABLE `attribute`;

-- DropTable
DROP TABLE `attribute_attribute_values`;

-- DropTable
DROP TABLE `attribute_values`;

-- DropTable
DROP TABLE `genre`;

-- DropTable
DROP TABLE `item`;

-- DropTable
DROP TABLE `items_attribute_values`;

-- CreateTable
CREATE TABLE `Items` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `open` INTEGER NULL,
    `close` INTEGER NULL,
    `high` INTEGER NULL,
    `low` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
