-- CreateTable
CREATE TABLE `cliente` (
    `codcliente` INTEGER NOT NULL AUTO_INCREMENT,
    `nome_cliente` VARCHAR(40) NOT NULL,
    `sobrenome_cliente` VARCHAR(45) NOT NULL,
    `telefone1_cliente` VARCHAR(15) NOT NULL,
    `telefone2_cliente` VARCHAR(15) NULL,
    `cpf_cliente` VARCHAR(20) NOT NULL,
    `rg_cliente` VARCHAR(15) NULL,
    `rua_cliente` VARCHAR(50) NULL,
    `numero_rua_cliente` BIGINT NULL,
    `cidade_cliente` VARCHAR(50) NULL,
    `uf_cliente` CHAR(2) NULL,
    `data_nascimento_cliente` VARCHAR(45) NULL,
    `sexo_cliente` VARCHAR(45) NULL,
    `bairro_cliente` VARCHAR(45) NULL,
    `cep_cliente` INTEGER NULL,
    `status_cliente` VARCHAR(30) NULL,

    UNIQUE INDEX `cpf_cliente`(`cpf_cliente`),
    PRIMARY KEY (`codcliente`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `funcao` (
    `cod_funcao` INTEGER NOT NULL AUTO_INCREMENT,
    `nome_funcao` VARCHAR(50) NOT NULL,
    `descricao_funcao` VARCHAR(80) NULL,

    PRIMARY KEY (`cod_funcao`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `servicos` (
    `cod_servicos` INTEGER NOT NULL AUTO_INCREMENT,
    `data_troca` DATE NULL,
    `proxima_troca` DATE NULL,
    `qtd_oleo` VARCHAR(20) NULL,
    `km` BIGINT NULL,
    `filtro_combustivel` VARCHAR(80) NOT NULL,
    `filtro_cabine` VARCHAR(80) NOT NULL,
    `status_filtro_oleo` VARCHAR(8) NULL,
    `status_filtro_ar` VARCHAR(8) NULL,
    `status_filtro_cabine` VARCHAR(8) NULL,
    `status_filtro_combustivel` VARCHAR(8) NULL,
    `obs_troca` VARCHAR(100) NULL,
    `filtro_ar` VARCHAR(30) NOT NULL,
    `cliente_codcliente` INTEGER NOT NULL,
    `tipo_oleo` VARCHAR(80) NULL,
    `filtro_oleo` VARCHAR(80) NOT NULL,
    `veiculo_cod_veiculo` INTEGER NOT NULL,
    `usuarios_id` INTEGER NOT NULL,
    `unidade_id_unidade` INTEGER NOT NULL,

    INDEX `fk_servicos_cliente1_idx`(`cliente_codcliente`),
    INDEX `fk_servicos_unidade1_idx`(`unidade_id_unidade`),
    INDEX `fk_servicos_usuarios1_idx`(`usuarios_id`),
    INDEX `fk_servicos_veiculo1_idx`(`veiculo_cod_veiculo`),
    PRIMARY KEY (`cod_servicos`, `cliente_codcliente`, `usuarios_id`, `unidade_id_unidade`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `unidade` (
    `id_unidade` INTEGER NOT NULL,
    `nome_unidade` VARCHAR(60) NOT NULL,
    `descricao_unidade` VARCHAR(80) NULL,
    `rua_unidade` VARCHAR(45) NULL,
    `bairro_unidade` VARCHAR(45) NULL,
    `cidade_unidade` VARCHAR(60) NULL,
    `uf_unidade` CHAR(2) NULL,
    `cep_unidade` VARCHAR(20) NOT NULL,
    `numero_unidade` VARCHAR(45) NULL,
    `telefone_unidade` VARCHAR(45) NULL,

    UNIQUE INDEX `id_unidade_UNIQUE`(`id_unidade`),
    UNIQUE INDEX `nome_unidade_UNIQUE`(`nome_unidade`),
    PRIMARY KEY (`id_unidade`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usuarios` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(50) NOT NULL,
    `email` VARCHAR(45) NOT NULL,
    `senha` VARCHAR(32) NOT NULL,
    `status_usuario` INTEGER NOT NULL,
    `funcao_cod_funcao` INTEGER NOT NULL,

    INDEX `fk_usuarios_funcao1_idx`(`funcao_cod_funcao`),
    PRIMARY KEY (`id`, `funcao_cod_funcao`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `veiculo` (
    `cod_veiculo` INTEGER NOT NULL AUTO_INCREMENT,
    `placa_veiculo` VARCHAR(15) NULL,
    `tipo_veiculo` VARCHAR(25) NULL,
    `cor_veiculo` VARCHAR(20) NULL,
    `modelo_veiculo` VARCHAR(45) NULL,
    `fabricante_veiculo` VARCHAR(50) NULL,
    `ano_fabricacao_veiculo` VARCHAR(20) NULL,
    `km_veiculo` INTEGER NULL,
    `obs_veiculo` VARCHAR(45) NULL,
    `status_veiculo` VARCHAR(30) NULL,
    `cliente_codcliente` INTEGER NOT NULL,

    UNIQUE INDEX `placa_veiculo`(`placa_veiculo`),
    INDEX `fk_veiculo_cliente1_idx`(`cliente_codcliente`),
    PRIMARY KEY (`cod_veiculo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
