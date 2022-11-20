/*
  Warnings:

  - You are about to drop the column `children` on the `menu` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `menu` DROP COLUMN `children`;

-- CreateTable
CREATE TABLE `Children` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `parent` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Children` ADD CONSTRAINT `Children_id_fkey` FOREIGN KEY (`id`) REFERENCES `Menu`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
