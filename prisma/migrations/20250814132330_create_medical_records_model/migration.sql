-- CreateTable
CREATE TABLE `medical_records` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pet_id` INTEGER NOT NULL,
    `service_id` INTEGER NOT NULL,
    `appointment_id` INTEGER NULL,
    `veterinarian_id` INTEGER NOT NULL,
    `visit_date` DATE NOT NULL,
    `subject` TEXT NULL,
    `objective` TEXT NULL,
    `assessment` TEXT NULL,
    `plan` TEXT NULL,
    `weight` DECIMAL(5, 2) NULL,
    `temperature_celsius` DECIMAL(4, 2) NULL,
    `next_visit_date` DATE NULL,
    `status` ENUM('draft', 'final') NOT NULL DEFAULT 'draft',
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `medical_records` ADD CONSTRAINT `medical_records_pet_id_fkey` FOREIGN KEY (`pet_id`) REFERENCES `pets`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `medical_records` ADD CONSTRAINT `medical_records_service_id_fkey` FOREIGN KEY (`service_id`) REFERENCES `service_categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `medical_records` ADD CONSTRAINT `medical_records_appointment_id_fkey` FOREIGN KEY (`appointment_id`) REFERENCES `appointments`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `medical_records` ADD CONSTRAINT `medical_records_veterinarian_id_fkey` FOREIGN KEY (`veterinarian_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
