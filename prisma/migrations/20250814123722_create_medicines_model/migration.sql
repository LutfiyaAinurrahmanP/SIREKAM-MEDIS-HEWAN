-- CreateTable
CREATE TABLE `medicines` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(64) NOT NULL,
    `code` VARCHAR(64) NOT NULL,
    `type` ENUM('tablets', 'syrups', 'ointments', 'injections', 'others') NOT NULL,
    `unit` ENUM('tablets', 'ml', 'vials', 'bottles', 'pcs') NOT NULL,
    `stock_qty` INTEGER NOT NULL DEFAULT 0,
    `price` DECIMAL(10, 2) NOT NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    UNIQUE INDEX `medicines_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
