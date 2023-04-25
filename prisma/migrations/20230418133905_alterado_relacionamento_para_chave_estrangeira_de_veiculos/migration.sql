/*
  Warnings:

  - You are about to drop the column `veiculoCod` on the `cliente` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[clientecodCliente]` on the table `veiculo` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `clientecodCliente` to the `veiculo` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `cliente` DROP FOREIGN KEY `cliente_veiculoCod_fkey`;

-- AlterTable
ALTER TABLE `cliente` DROP COLUMN `veiculoCod`;

-- AlterTable
ALTER TABLE `veiculo` ADD COLUMN `clientecodCliente` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `veiculo_clientecodCliente_key` ON `veiculo`(`clientecodCliente`);

-- AddForeignKey
ALTER TABLE `veiculo` ADD CONSTRAINT `veiculo_clientecodCliente_fkey` FOREIGN KEY (`clientecodCliente`) REFERENCES `cliente`(`codcliente`) ON DELETE RESTRICT ON UPDATE CASCADE;
