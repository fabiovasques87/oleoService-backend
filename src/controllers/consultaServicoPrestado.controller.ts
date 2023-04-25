
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { count } from "console";
import { json } from "stream/consumers";
import JSONbig from 'json-bigint'



const prisma = new PrismaClient();




export const servicoPrestadoVeiculo = async (req:Request, res: Response) => {
    const {placa_veiculo}= req.params;
   
       const trocaOleo = await prisma.veiculo.findMany({
           
           where:{
               placa_veiculo
            },
           
           include: {
               
               cliente: true,
               servicos:true,
           },                
   });

       res.json({trocaOleo})
   
   }

   export const trocaAVencer = async (req: Request, res: Response) => {

        // const trocaAVencer = await prisma.servicos.count({
        //     where: {
        //         proxima_troca: {
        //         lte: new Date(new Date(30).getTime() )
        //         }
        //     }
          

        // })

        interface Row {
            servicos: string
          }

          const result = await prisma.$queryRaw<number>`
               select 
                     COUNT(*) AS vencer
                    FROM
                      (SELECT
                          veiculo_cod_veiculo AS cod, filtro_combustivel AS fil,
                          cliente_codcliente AS cli, max(proxima_troca) AS pro
                         FROM
                          servicos GROUP BY veiculo_cod_veiculo) p
                        INNER JOIN cliente c
                        ON p.cli = c.codcliente
                        INNER JOIN veiculo v
                        ON p.cod = v.cod_veiculo
                    WHERE
                       p.pro BETWEEN CURRENT_DATE AND date_add(CURRENT_DATE , INTERVAL 30 day)
                       AND v.status_veiculo = 'ativo'
          
          `;
          const resultado = JSONbig.stringify(result);
         res.json(resultado);

   }

   export const trocasVencidas = async (req: Request, res: Response) =>{

        // const vencidas = await prisma.servicos.findMany({
        //     where: {
        //         proxima_troca: {
        //             lt: new Date()
        //         }
               
        //     },
        
        //     include:{
        //         cliente: true,
        //         veiculo: true
        //     }
        // })

        //exibe a quantidade de trocas vencidas

        const vencidos = await prisma.$queryRaw<number>`

                                    select
                                       COUNT(*) AS vencidas
                                        FROM
                                          (SELECT
                                              veiculo_cod_veiculo AS cod, filtro_combustivel AS fil,
                                              cliente_codcliente AS cli, max(proxima_troca) AS pro
                                             FROM
                                              servicos GROUP BY veiculo_cod_veiculo) p
                                            INNER JOIN cliente c
                                            ON p.cli = c.codcliente
                                            INNER JOIN veiculo v
                                            ON p.cod = v.cod_veiculo
                                        WHERE
                                          p.pro < CURRENT_DATE AND status_veiculo = 'ativo';
                                   

        `

                    const resultado = JSONbig.stringify(vencidos);


                    console.log(resultado);
                    res.json(resultado)
   }

   export const trocaporCpf = async (req: Request, res: Response) => {

        const {cpf_cliente} = req.params;

        const cpfTroca = await prisma.cliente.findMany({
            where: {
                cpf_cliente
            },
            include:{
                servicos: true,
                veiculo: true,
            }
        })

        res.json({cpfTroca});
      
   }

   export const relatTroca = async (req: Request, res: Response)  => {

        // const {data_troca} = req.params;
        // const {proxima_troca} = req.params;

        const  {data_troca, proxima_troca} = req.body;

        const dataTroca = await prisma.servicos.findMany({

            
            where:{
                data_troca : {
                    gte: new Date(data_troca),
                    lte: new Date(proxima_troca),
                }
                
            } ,
            include: {
                unidade: true,
            }
        })

        if(!dataTroca){
            res.json({error: 'Não encontrado'})
        }else{
            res.json({dataTroca});
        }

   }