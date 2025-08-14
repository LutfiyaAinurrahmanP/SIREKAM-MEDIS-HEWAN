-- CreateTable
CREATE TABLE `pets` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `owner_id` INTEGER NOT NULL,
    `name` VARCHAR(64) NOT NULL,
    `animal_type_id` INTEGER NOT NULL,
    `breed` VARCHAR(64) NULL,
    `gender` ENUM('male', 'female', 'unknown') NOT NULL,
    `birth_date` DATE NULL,
    `weight` DECIMAL(5, 2) NULL,
    `color` VARCHAR(64) NULL,
    `notes` TEXT NULL,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `pets` ADD CONSTRAINT `pets_owner_id_fkey` FOREIGN KEY (`owner_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pets` ADD CONSTRAINT `pets_animal_type_id_fkey` FOREIGN KEY (`animal_type_id`) REFERENCES `animal_types`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
