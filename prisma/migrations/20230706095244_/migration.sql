/*
  Warnings:

  - You are about to drop the `itemsongenres` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `itemsongenres` DROP FOREIGN KEY `ItemsOnGenres_genreId_fkey`;

-- DropForeignKey
ALTER TABLE `itemsongenres` DROP FOREIGN KEY `ItemsOnGenres_itemId_fkey`;

-- DropTable
DROP TABLE `itemsongenres`;

-- CreateTable
CREATE TABLE `Items_attribute_values` (
    `itemId` INTEGER NOT NULL,
    `attribute_valuesId` INTEGER NOT NULL,

    PRIMARY KEY (`itemId`, `attribute_valuesId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Items_attribute_values` ADD CONSTRAINT `Items_attribute_values_itemId_fkey` FOREIGN KEY (`itemId`) REFERENCES `Item`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Items_attribute_values` ADD CONSTRAINT `Items_attribute_values_attribute_valuesId_fkey` FOREIGN KEY (`attribute_valuesId`) REFERENCES `attribute_values`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
