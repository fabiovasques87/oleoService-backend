//importar o prisma client
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();


type createDataProp = {
    placa_veiculo: string;
    tipo_veiculo: string;
    cor_veiculo: string | undefined;
    modelo_veiculo: string;
    fabricante_veiculo: string;
    ano_fabricacao_veiculo: string;
    km_veiculo: number;
    obs_veiculo: string | undefined;
    status_veiculo: string;
    cliente_codcliente: number;
}




export const VeiculoService = {



    create: async (data: createDataProp) => {
        return await prisma.veiculo.create({data});
    },
    //pega todos os veículos
    findAll: async () => {
        //pega todos os users da tabela usuarios...
        return await prisma.veiculo.findMany({});
    },
    //valida se a placa já existe...
    findOne: async (placa_veiculo: string) => {

        

        return await prisma.veiculo.findUnique({
            where: {
                placa_veiculo
              },
        });
    },
}
