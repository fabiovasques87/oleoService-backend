/*
  Warnings:

  - You are about to drop the column `servico_cod_servicos` on the `cliente` table. All the data in the column will be lost.
  - You are about to drop the column `veiculo_cod_veiculo` on the `cliente` table. All the data in the column will be lost.
  - You are about to drop the column `servico_cod_servicos` on the `veiculo` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `cliente` DROP FOREIGN KEY `cliente_veiculo_cod_veiculo_fkey`;

-- AlterTable
ALTER TABLE `cliente` DROP COLUMN `servico_cod_servicos`,
    DROP COLUMN `veiculo_cod_veiculo`;

-- AlterTable
ALTER TABLE `veiculo` DROP COLUMN `servico_cod_servicos`;

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
