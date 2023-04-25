/*
  Warnings:

  - You are about to drop the column `cliente_codcliente` on the `veiculo` table. All the data in the column will be lost.
  - You are about to drop the `_clienteToveiculo` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `veiculo_cod_veiculo` on table `cliente` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `_clienteToveiculo` DROP FOREIGN KEY `_clienteToveiculo_A_fkey`;

-- DropForeignKey
ALTER TABLE `_clienteToveiculo` DROP FOREIGN KEY `_clienteToveiculo_B_fkey`;

-- DropIndex
DROP INDEX `fk_veiculo_cliente1_idx` ON `veiculo`;

-- AlterTable
ALTER TABLE `cliente` MODIFY `veiculo_cod_veiculo` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `veiculo` DROP COLUMN `cliente_codcliente`;

-- DropTable
DROP TABLE `_clienteToveiculo`;

-- AddForeignKey
ALTER TABLE `cliente` ADD CONSTRAINT `cliente_veiculo_cod_veiculo_fkey` FOREIGN KEY (`veiculo_cod_veiculo`) REFERENCES `veiculo`(`cod_veiculo`) ON DELETE RESTRICT ON UPDATE CASCADE;
