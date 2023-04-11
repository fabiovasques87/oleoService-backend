
import { Request, Response } from "express";
import { UnidadeService } from "../services/UnidadeService";



export const create = async (req: Request, res: Response) => {
    const {nome_unidade, descricao_unidade, rua_unidade, bairro_unidade, cidade_unidade,
        uf_unidade, cep_unidade, numero_unidade, telefone_unidade, id_unidade}  = req.body;
  

    //se tiver todos esses dados....

            const id = await UnidadeService.findOne(parseInt(id_unidade));

            if(!id){

            const unidade = await UnidadeService.create({
                nome_unidade, descricao_unidade, rua_unidade, bairro_unidade, cidade_unidade,
                uf_unidade, cep_unidade, numero_unidade, telefone_unidade, id_unidade:parseInt(id_unidade)
            });
            
            res.status(201).json({unidade});
            
            }else{
                res.json({error: "Unidade já existe"});
            }
      
            // }else {
            //     res.json({error: 'Dados não preenchidos'});
            // }


        
    }

