-- CreateTable
CREATE TABLE `transactions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `created_by` INTEGER NOT NULL,
    `pet_id` INTEGER NOT NULL,
    `medical_record_id` INTEGER NOT NULL,
    `total_amount` DECIMAL(10, 2) NOT NULL,
    `paid_amount` DECIMAL(10, 2) NOT NULL,
    `payment_status` ENUM('pending', 'partial', 'paid') NOT NULL DEFAULT 'pending',
    `payment_method` ENUM('transfer', 'card', 'cash', 'other') NOT NULL DEFAULT 'cash',
    `invoice_date` DATE NOT NULL,
    `notes` TEXT NULL,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `transactions` ADD CONSTRAINT `transactions_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transactions` ADD CONSTRAINT `transactions_pet_id_fkey` FOREIGN KEY (`pet_id`) REFERENCES `pets`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transactions` ADD CONSTRAINT `transactions_medical_record_id_fkey` FOREIGN KEY (`medical_record_id`) REFERENCES `medical_records`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
