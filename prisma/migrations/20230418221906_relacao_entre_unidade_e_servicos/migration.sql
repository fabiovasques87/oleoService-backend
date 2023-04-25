-- AddForeignKey
ALTER TABLE `servicos` ADD CONSTRAINT `servicos_unidade_id_unidade_fkey` FOREIGN KEY (`unidade_id_unidade`) REFERENCES `unidade`(`id_unidade`) ON DELETE RESTRICT ON UPDATE CASCADE;
