import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();


const main = async () => {
    await prisma.usuarios.deleteMany({});

    const funcao = await prisma.funcao.create({
        data: {
            nome_funcao: "analista de sistemas",
            descricao_funcao:"responsável pela criacao e manutencao dos sistemas internos"

        }
    });

    const user = await prisma.usuarios.create({
        data: {
            nome: "teste",
            email:"teste@gmail.com",
            senha:"123456",
            funcao_cod_funcao: funcao.cod_funcao,
            status_usuario: 1


        }
    });

}

main();