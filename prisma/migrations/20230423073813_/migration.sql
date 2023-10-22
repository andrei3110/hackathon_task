/*
  Warnings:

  - Added the required column `actor` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `operator` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `item` ADD COLUMN `actor` VARCHAR(255) NOT NULL,
    ADD COLUMN `operator` VARCHAR(255) NOT NULL;
