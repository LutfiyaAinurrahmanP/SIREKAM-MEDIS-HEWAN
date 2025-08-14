-- CreateTable
CREATE TABLE `prescriptions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `medical_record_id` INTEGER NOT NULL,
    `veterinarian_id` INTEGER NOT NULL,
    `notes` TEXT NULL,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `prescriptions` ADD CONSTRAINT `prescriptions_veterinarian_id_fkey` FOREIGN KEY (`veterinarian_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
