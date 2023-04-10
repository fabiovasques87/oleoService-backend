

import { Request, Response } from "express";
import {UserService} from '../services/UserService'
const bcrypt = require("bcryptjs");



export const all = async (req: Request, res: Response) =>{
    //pegar todos os usuarios
    const user = await UserService.findAll();
    res.json({user})
}

export const one = async (req: Request, res: Response) =>{
    const {id} = req.params;
    const user = await UserService.findOne(parseInt(id));
    //se enconrtrar usuario
    if(user){
        res.json({user});
    }else {
        res.json({error: 'Usuário não ecnontrado'});
    }
}


export const create = async (req: Request, res: Response) => {
    const {nome, email, senha,  status_usuario,  funcao_cod_funcao} = req.body;
    const salt = bcrypt.genSaltSync(10);

    //se tiver todos esses dados....

            const password = await bcrypt.hash(senha,10) //criptografa a senha
            const user = await UserService.create({
                senha  : password, //criptografa a senha
                nome, email,  status_usuario:parseInt(status_usuario), funcao_cod_funcao:parseInt(funcao_cod_funcao)
            });
            
            res.status(201).json({user});
      
            // }else {
            //     res.json({error: 'Dados não preenchidos'});
            // }
    }
