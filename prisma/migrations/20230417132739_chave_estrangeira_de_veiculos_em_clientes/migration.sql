-- AlterTable
ALTER TABLE `cliente` ADD COLUMN `veiculo_cod_veiculo` INTEGER NULL;

-- CreateTable
CREATE TABLE `_clienteToveiculo` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_clienteToveiculo_AB_unique`(`A`, `B`),
    INDEX `_clienteToveiculo_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_clienteToveiculo` ADD CONSTRAINT `_clienteToveiculo_A_fkey` FOREIGN KEY (`A`) REFERENCES `cliente`(`codcliente`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_clienteToveiculo` ADD CONSTRAINT `_clienteToveiculo_B_fkey` FOREIGN KEY (`B`) REFERENCES `veiculo`(`cod_veiculo`) ON DELETE CASCADE ON UPDATE CASCADE;
