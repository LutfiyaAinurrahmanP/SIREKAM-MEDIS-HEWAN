/*
  Warnings:

  - Made the column `status` on table `appointments` required. This step will fail if there are existing NULL values in that column.
  - Made the column `weight` on table `pets` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `transactions` DROP FOREIGN KEY `transactions_medical_record_id_fkey`;

-- DropIndex
DROP INDEX `transactions_medical_record_id_fkey` ON `transactions`;

-- AlterTable
ALTER TABLE `appointments` MODIFY `status` ENUM('scheduled', 'completed', 'canceled', 'no_show') NOT NULL DEFAULT 'scheduled';

-- AlterTable
ALTER TABLE `pets` MODIFY `weight` DECIMAL(5, 2) NOT NULL;

-- AlterTable
ALTER TABLE `transactions` MODIFY `medical_record_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `prescriptions` ADD CONSTRAINT `prescriptions_medical_record_id_fkey` FOREIGN KEY (`medical_record_id`) REFERENCES `medical_records`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transactions` ADD CONSTRAINT `transactions_medical_record_id_fkey` FOREIGN KEY (`medical_record_id`) REFERENCES `medical_records`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
