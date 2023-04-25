/*
  Warnings:

  - You are about to drop the column `clientecodCliente` on the `veiculo` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `veiculo` DROP FOREIGN KEY `veiculo_clientecodCliente_fkey`;

-- AlterTable
ALTER TABLE `veiculo` DROP COLUMN `clientecodCliente`;
