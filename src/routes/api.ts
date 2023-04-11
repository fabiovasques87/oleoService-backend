
import {Router} from 'express';

import * as UserController from '../controllers/userController';
import * as FuncaoController from '../controllers/funcaoController';
import * as UnidadeController from '../controllers/unidadeController';
import * as VeiculoController from '../controllers/veiculoController';

const router = Router();

router.get('/users',UserController.all );
//rotas para pegar todos os usuários



// router.get('/funcao',FuncaoController.all );

router.get('/user/:id',UserController.one );
// pega o usuario pelo id

router.post('/user', UserController.create);
//Cria usuário 

router.post('/unidade', UnidadeController.create);
//Cria Unidade

router.post('/funcao', FuncaoController.create);
//Cria Funcao 

router.post('/veiculo', VeiculoController.create);
//Cria veiculos 

// router.put('/user/:id', UserController.update);

// //delete
// router.delete('/user/id:', UserController.deleteUser );

export default router;