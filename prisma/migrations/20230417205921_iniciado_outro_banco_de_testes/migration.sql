/*
  Warnings:

  - You are about to drop the `_clienteToveiculo` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[veiculoCod]` on the table `cliente` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `veiculoCod` to the `cliente` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_clienteToveiculo` DROP FOREIGN KEY `_clienteToveiculo_A_fkey`;

-- DropForeignKey
ALTER TABLE `_clienteToveiculo` DROP FOREIGN KEY `_clienteToveiculo_B_fkey`;

-- AlterTable
ALTER TABLE `cliente` ADD COLUMN `veiculoCod` INTEGER NOT NULL;

-- DropTable
DROP TABLE `_clienteToveiculo`;

-- CreateIndex
CREATE UNIQUE INDEX `cliente_veiculoCod_key` ON `cliente`(`veiculoCod`);

-- AddForeignKey
ALTER TABLE `cliente` ADD CONSTRAINT `cliente_veiculoCod_fkey` FOREIGN KEY (`veiculoCod`) REFERENCES `veiculo`(`cod_veiculo`) ON DELETE RESTRICT ON UPDATE CASCADE;
