-- AddForeignKey
ALTER TABLE `servicos` ADD CONSTRAINT `servicos_veiculo_cod_veiculo_fkey` FOREIGN KEY (`veiculo_cod_veiculo`) REFERENCES `veiculo`(`cod_veiculo`) ON DELETE RESTRICT ON UPDATE CASCADE;
