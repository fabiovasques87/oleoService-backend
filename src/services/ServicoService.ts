import {PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();


type createDataProp = {
    data_troca : Date;
    proxima_troca: Date;
    qtd_oleo: string;
    km: number;
    filtro_combustivel: string;
    filtro_cabine: string;
    status_filtro_oleo: string;
    status_filtro_ar: string;
    status_filtro_cabine: string;
    status_filtro_combustivel: string;
    obs_troca: string;
    filtro_ar: string;
    cliente_codcliente: number;
    tipo_oleo: string;
    filtro_oleo: string;
    veiculo_cod_veiculo: number;
    usuarios_id: number;
    unidade_id_unidade: number;

}

type updateDataProp = {
    data_troca: Date;
    proxima_troca:Date;
    qtd_oleo: string;
    km: number;
    filtro_combustivel:string;
    filtro_cabine:string;
    status_filtro_oleo:string;
    status_filtro_ar:string;
    status_filtro_cabine:string;
    status_filtro_combustivel:string 
    obs_troca:string;
    filtro_ar:string;
    cliente_codcliente:number;
    tipo_oleo:string;
    filtro_oleo:string;
    veiculo_cod_veiculo:number;
    usuarios_id:number;
    unidade_id_unidade:number;
}

export const ServicoService = {

    // create: async (data: createDataProp) => {
    //     return await prisma.servicos.create({data});
    // }, 

    findAll: async () => {
        //pega todos os users da tabela usuarios...
        // return await prisma.servicos.findMany({
        //     // orderBy:{
        //     //     id: 'desc'
        //     // }
        // });

        return await prisma.servicos.count({});
    },
    findOne: async (cod_servicos: number) => {
        return await prisma.servicos.findFirst({
            where:{
                cod_servicos
            }
        });
    },
    update: async (cod_servicos: number, data: updateDataProp) => {
        return await prisma.servicos.updateMany({
            where:{
                cod_servicos
            },
            data
            
            
        });
    }
}