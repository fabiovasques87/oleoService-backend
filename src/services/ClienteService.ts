//importar o prisma client
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();


type createDataProp = {
    nome_cliente: string;
    sobrenome_cliente: string;
    telefone1_cliente: string;
    telefone2_cliente: string;
    cpf_cliente: string;
    rg_cliente: string;
    rua_cliente: string;
    numero_rua_cliente: number | undefined;
    cidade_cliente: string;
    uf_cliente: string;
    data_nascimento_cliente: string;
    sexo_cliente: string;
    bairro_cliente: string;
    cep_cliente: number;
    status_cliente: string;

}

type updateDataProp = {
    nome_cliente?: string;
    sobrenome_cliente?: string;
    telefone1_cliente?: string;
    telefone2_cliente?: string;
    cpf_cliente?: string;
    rg_cliente?: string;
    rua_cliente?: string;
    numero_rua_cliente?: number;
    cidade_cliente?: string;
    uf_cliente?: string;
    data_nascimento_cliente?: string;
    sexo_cliente?: string;
    bairro_cliente?: string;
    cep_cliente?: number;
    status_cliente?: string;
}



export const ClienteService = {

    // findAll: async (cpf_cliente) => {
    //     //pega todos os users da tabela usuarios...
    //     return await prisma.cliente.findMany({
    //         orderBy:{
    //             cpf_cliente
    //         }
    //     });
    // },

    findOne: async (cpf_cliente: string) => {
        return await prisma.cliente.findFirst({
            where:{
                cpf_cliente
            }
        });
    },
    // findOneCodcliente: async (cpf_cliente: string) => {
    //     return await prisma.cliente.findFirst({
    //        where: {
    //             cpf_cliente
    //        }
    //     });
    // },

    create: async (data: createDataProp) => {
        return await prisma.cliente.create({data});
    },
    
    //  update: async (cpf_cliente: string, data: updateDataProp) => {
    //     return await prisma.cliente.updateMany({
    //         where: {cpf_cliente},
    //         data
    //     });
    //  }  
    

     update : async (codcliente: number, data: updateDataProp) => {
        return await prisma.cliente.update({
            where:{codcliente},
            data
        })
    }
   
}


