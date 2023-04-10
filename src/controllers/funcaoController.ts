

import { Request, Response } from "express";
import {UserService} from '../services/UserService'
import { FuncaoController } from "../services/FuncaoService";
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
    const {nome_funcao, descricao_funcao} = req.body;
  

    //se tiver todos esses dados....

            const funcao = await FuncaoController.create({
                nome_funcao,descricao_funcao
            });
            
            res.status(201).json({funcao});
      
            // }else {
            //     res.json({error: 'Dados não preenchidos'});
            // }
    }
