
import { Request, Response } from "express";
import { ServicoService } from "../services/ServicoService";
import { PrismaClient } from "@prisma/client";
import moment from "moment";


const prisma = new PrismaClient();




export const create = async (req:Request, res: Response) => {
    const { data_troca, proxima_troca, qtd_oleo, km, filtro_combustivel, filtro_cabine,
        status_filtro_oleo, status_filtro_ar, status_filtro_cabine, status_filtro_combustivel, 
        obs_troca, filtro_ar, cliente_codcliente, tipo_oleo, filtro_oleo, veiculo_cod_veiculo,
        usuarios_id, unidade_id_unidade} = req.body;

        const dataTroca = moment(data_troca).toDate();
        const proximaTroca = moment(proxima_troca).toDate();
        const Km = parseInt(km);
        const codCliente = parseInt(cliente_codcliente);
        const codVeiculo = parseInt(veiculo_cod_veiculo);
        const idUser = parseInt(usuarios_id);
        const idUnidade = parseInt(unidade_id_unidade);

        console.log(dataTroca);


        const servico = await prisma.servicos.create({
           data:{
            data_troca:dataTroca, proxima_troca:proximaTroca, qtd_oleo, km: Km, filtro_combustivel, filtro_cabine,
            status_filtro_oleo, status_filtro_ar, status_filtro_cabine, status_filtro_combustivel, 
            obs_troca, filtro_ar, cliente_codcliente:codCliente, tipo_oleo, filtro_oleo, veiculo_cod_veiculo:codVeiculo,
            usuarios_id:idUser, unidade_id_unidade:idUnidade 
           }
        })

         res.json({servico});

}

export const all = async (req: Request, res: Response) =>{
    //pegar todos os servicos
    const services = await ServicoService.findAll();
    res.json({services})
}

export const one = async (req: Request, res: Response) =>{
    const {cod_servicos} = req.params;
    const services = await ServicoService.findOne(parseInt(cod_servicos));
    //se enconrtrar usuario
    if(services){
        res.json({services});
    }else {
        res.json({error: 'servico não ecnontrado'});
    }
}

export const updateServico = async (req: Request, res: Response) => {
    const {cod_servicos} = req.params;
    console.log(cod_servicos);
    //const clientId = req.params.cpf_cliente;
   

    const {data_troca, proxima_troca, qtd_oleo, km, filtro_combustivel, filtro_cabine,
        status_filtro_oleo, status_filtro_ar, status_filtro_cabine, status_filtro_combustivel, 
        obs_troca, filtro_ar, cliente_codcliente, tipo_oleo, filtro_oleo, veiculo_cod_veiculo,
        usuarios_id, unidade_id_unidade
        } = req.body;


        const encontRegistro = await ServicoService.findOne(parseInt(cod_servicos))

      


      
    //se encontrou o registro, realiza a conversao ...

  
    const dataTroca = moment(data_troca).toDate();
    const proximaTroca = moment(proxima_troca).toDate();
    const Km = parseInt(km);
    const codCliente = parseInt(cliente_codcliente);
    const codVeiculo = parseInt(veiculo_cod_veiculo);
    const idUser = parseInt(usuarios_id);
    const idUnidade = parseInt(unidade_id_unidade);

    const services = await ServicoService.update(parseInt(cod_servicos),({
       data_troca:dataTroca, proxima_troca:proximaTroca, qtd_oleo, km: Km, filtro_combustivel, filtro_cabine,
        status_filtro_oleo, status_filtro_ar, status_filtro_cabine, status_filtro_combustivel, 
        obs_troca, filtro_ar, cliente_codcliente:codCliente, tipo_oleo, filtro_oleo, veiculo_cod_veiculo:codVeiculo,
        usuarios_id:idUser, unidade_id_unidade:idUnidade 
    }))

    
    res.json({services});
        
}  