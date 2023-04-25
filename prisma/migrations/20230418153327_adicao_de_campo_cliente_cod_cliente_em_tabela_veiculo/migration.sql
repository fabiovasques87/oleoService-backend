/*
  Warnings:

  - Added the required column `clientecodCliente` to the `veiculo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `veiculo` ADD COLUMN `clientecodCliente` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `veiculo` ADD CONSTRAINT `veiculo_clientecodCliente_fkey` FOREIGN KEY (`clientecodCliente`) REFERENCES `cliente`(`codcliente`) ON DELETE RESTRICT ON UPDATE CASCADE;
