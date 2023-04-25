-- AddForeignKey
ALTER TABLE `servicos` ADD CONSTRAINT `servicos_cliente_codcliente_fkey` FOREIGN KEY (`cliente_codcliente`) REFERENCES `cliente`(`codcliente`) ON DELETE RESTRICT ON UPDATE CASCADE;
