/*
  Warnings:

  - Made the column `km` on table `servicos` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `servicos` MODIFY `km` INTEGER NOT NULL;
