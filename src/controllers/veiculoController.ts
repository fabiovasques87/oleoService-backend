
import { Request, Response } from "express";
import {UserService} from '../services/UserService'
import { VeiculoService } from "../services/VeiculoService";



export const create = async (req: Request, res: Response) => {
    const {placa_veiculo, tipo_veiculo, cor_veiculo, modelo_veiculo, fabricante_veiculo,
        ano_fabricacao_veiculo, km_veiculo, obs_veiculo, status_veiculo, cliente_codcliente} = req.body;
  

    //se tiver todos esses dados....

            const placa = await VeiculoService.findOne(placa_veiculo);

            if(!placa){

                const cadVeiculo = await VeiculoService.create({
                    placa_veiculo, tipo_veiculo, cor_veiculo, modelo_veiculo, fabricante_veiculo,
                    ano_fabricacao_veiculo, km_veiculo:parseInt(km_veiculo), obs_veiculo, status_veiculo, cliente_codcliente:parseInt(cliente_codcliente)
                });
                
                res.status(201).json({cadVeiculo});
        
                // }else {
                //     res.json({error: 'Dados não preenchidos'});
                // }
        }else {
            res.json({error: "placa já está cadastrada"});            
        }
    }