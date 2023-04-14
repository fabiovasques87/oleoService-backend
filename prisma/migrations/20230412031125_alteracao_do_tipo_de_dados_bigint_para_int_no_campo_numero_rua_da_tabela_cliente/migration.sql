/*
  Warnings:

  - You are about to alter the column `numero_rua_cliente` on the `cliente` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.

*/
-- AlterTable
ALTER TABLE `cliente` MODIFY `numero_rua_cliente` INTEGER NULL;
