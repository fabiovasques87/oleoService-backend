
//importar o prisma client
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();


type createDataProp = {
    nome_unidade: string;
    descricao_unidade: string;
    rua_unidade : string;
    bairro_unidade : string;
    cidade_unidade: string;
    uf_unidade: string;
    cep_unidade: string;
    numero_unidade: string;
    telefone_unidade: string;
    id_unidade: number;
}


export const UnidadeService = {



    create: async (data: createDataProp) => {
        return await prisma.unidade.create({data});
    },
    findOne: async (id_unidade: number) => {
        return await prisma.unidade.findFirst({
            where:{
                id_unidade
            }
        });
    },
}