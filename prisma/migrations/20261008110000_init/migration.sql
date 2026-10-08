CREATE TABLE `Categoria` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(100) NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE INDEX `Categoria_nombre_key`(`nombre`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `Producto` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(150) NOT NULL,
    `caracteristicas` TEXT NOT NULL,
    `categoriaId` INTEGER NOT NULL,
    `precio` DECIMAL(10,2) NOT NULL,
    `stock` INTEGER NOT NULL DEFAULT 0,
    `url` VARCHAR(500) NULL,
    PRIMARY KEY (`id`),
    INDEX `Producto_categoriaId_idx`(`categoriaId`),
    INDEX `Producto_nombre_idx`(`nombre`),
    CONSTRAINT `Producto_categoriaId_fkey` FOREIGN KEY (`categoriaId`) REFERENCES `Categoria`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
