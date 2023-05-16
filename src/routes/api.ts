
import {Router} from 'express';

import * as UserController from '../controllers/userController';
import * as FuncaoController from '../controllers/funcaoController';
import * as UnidadeController from '../controllers/unidadeController';
import * as VeiculoController from '../controllers/veiculoController';
import * as ClienteController from '../controllers/clienteController';
import * as ServicoController from '../controllers/ServicoControllers';
import * as Servicos from '../controllers/consultaServicoPrestado.controller';

const router = Router();

router.get('/users',UserController.all );
//rotas para pegar todos os usuários

router.get('/user/:id',UserController.one );
// pega o usuario pelo id

router.post('/user', UserController.create);
//Cria usuário 

router.post('/veiculo', VeiculoController.create);
//Cria veiculos 

// router.get('/veiculos',VeiculoController.all );
//rotas para pegar todos os veiculos


router.get('/searchVeiculo',VeiculoController.all );
// pega o veiculos pela placa

router.put('/updateVeiculo/:cod_veiculo', VeiculoController.updateVeiculo);
//alterar o veiculo


router.post('/unidade', UnidadeController.create);
//Cria Unidade

router.post('/funcao', FuncaoController.create);
//Cria Funcao 

router.post('/cliente', ClienteController.create);
//Cria cliente

router.get('/clientes',ClienteController.one );
//rotas para pegar cliente pelo cpf


 router.put('/updatecliente/:codcliente', ClienteController.updateClient);
//alterar cliente pelo cpf

router.delete('/deleteCliente/:codcliente', ClienteController.deleteCliente);
//deleta cliente pelo cpf


router.post('/AddServico', ServicoController.create);
//Cria servicos

router.get('/searchServicos',ServicoController.all );
// pega todoas as trocas de óleo da tabela servicos

router.get('/servico/:cod_servicos',ServicoController.one );
//rotas para pegar servicos pelo codigo

router.get('/servicoTrocaVencendo/:placa_veiculo',Servicos.servicoPrestadoVeiculo);
//rotas para pegar os veiculos com seus servicos prestados

//pega o ultimo históico do veiculo
router.get('/clientVeiculo/:placa_veiculo', Servicos.clientVeiculo);

router.get('/trocaAVencer',Servicos.trocaAVencer);
//rotas para pegar somente as trocas que estao faltando 30 dias para o vencimento...

router.get('/trocaCpf/*',Servicos.trocaporCpf);
//rotas para pesquisar trocas por cpf e cnpj, o * serve para pegar tudo o que vem do parametro...


router.get('/trocavencidas',Servicos.trocasVencidas);
//rotas para pegar somente as trocas que ja venceram...

router.get('/relatData',Servicos.relatTroca);
//rotas para montar relatorio, filtrando por datas

router.put('/updateServico/:cod_servicos', ServicoController.updateServico);
//alterar o servico pelo cod

export default router;