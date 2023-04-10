
//importar o prisma client
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();


type createDataProp = {
    nome: string;
    email: string;
    senha: string;
    status_usuario: number;
    // id: number;
    funcao_cod_funcao: number;
}


export const UserService = {
    findAll: async () => {
        //pega todos os users da tabela usuarios...
        return await prisma.usuarios.findMany({
            orderBy:{
                id: 'desc'
            }
        });
    },

    findOne: async (id: number) => {
        return await prisma.usuarios.findFirst({
            where:{
                id
            }
        });
    },

    create: async (data: createDataProp) => {
        return await prisma.usuarios.create({data});
    }
}

