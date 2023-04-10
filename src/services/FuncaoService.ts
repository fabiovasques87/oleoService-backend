//importar o prisma client
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();


type createDataProp = {
    nome_funcao: string;
    descricao_funcao : string;
}




export const FuncaoController = {



    create: async (data: createDataProp) => {
        return await prisma.funcao.create({data});
    }
}