
import {Router} from 'express';

import * as UserController from '../controllers/userController';
// import * as FuncaoController from '../controllers/funcaoController';


const router = Router();

//rotas
router.get('/users',UserController.all );
// router.get('/funcao',FuncaoController.all );

router.get('/user/:id',UserController.one );
// pega o usuario pelo id

router.post('/user', UserController.create);
//Cria usuário 

// router.put('/user/:id', UserController.update);

// //delete
// router.delete('/user/id:', UserController.deleteUser );

export default router;