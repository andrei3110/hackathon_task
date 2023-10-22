/*
  Warnings:

  - The primary key for the `attribute_attribute_values` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `itemId` on the `attribute_attribute_values` table. All the data in the column will be lost.
  - Added the required column `attribute_valueId` to the `attribute_attribute_values` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `attribute_attribute_values` DROP FOREIGN KEY `attribute_attribute_values_itemId_fkey`;

-- AlterTable
ALTER TABLE `attribute_attribute_values` DROP PRIMARY KEY,
    DROP COLUMN `itemId`,
    ADD COLUMN `attribute_valueId` INTEGER NOT NULL,
    ADD PRIMARY KEY (`attribute_valueId`, `attributeId`);

-- AddForeignKey
ALTER TABLE `attribute_attribute_values` ADD CONSTRAINT `attribute_attribute_values_attribute_valueId_fkey` FOREIGN KEY (`attribute_valueId`) REFERENCES `attribute_values`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
