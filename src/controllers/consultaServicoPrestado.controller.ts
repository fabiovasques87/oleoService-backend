
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { count } from "console";
import { json } from "stream/consumers";
import JSONbig from 'json-bigint'



const prisma = new PrismaClient();




// export const servicoPrestadoVeiculo = async (req:Request, res: Response) => {
//     const cod_veiculo= req.query;
   



//         const trocaOleo = await prisma.veiculo.findMany({
            
//             where:{
//                     placa_veiculo
//                 },
            
//             include: {
                
//                 cliente: true,
//                 servicos:true,
//             },  
                        
//     });
   
//        res.json({trocaOleo})
   

// }

// export const servicoPrestadoVeiculo = async (req: Request, res: Response) => {
//     const cod_veiculo = Number(req.params.cod_veiculo);
  
//     if (isNaN(cod_veiculo)) {
//       res.status(400).json({ error: 'O parâmetro cod_veiculo é inválido' });
//       return;
//     }
    
//     const trocaOleo = await prisma.veiculo.findMany({
//       where: {
//         cod_veiculo,
//       },
//       include: {
//         cliente: true,
//         servicos: true,
//       },
//     });
  
//     res.json({ trocaOleo });
//   };

export const servicoPrestadoVeiculo = async (req: Request, res:Response) => {
  const placa_veiculo = req.params.placa_veiculo;

  const result = await prisma.$queryRaw<number>`

select 
								c.nome_cliente,c.sobrenome_cliente,c.cpf_cliente,cod_veiculo, v.placa_veiculo,v.modelo_veiculo,s.cod_servicos,
								s.filtro_combustivel,s.filtro_cabine,s.obs_troca,s.filtro_ar,tipo_veiculo,fabricante_veiculo,
								s.filtro_oleo,data_troca,proxima_troca,
								s.tipo_oleo,s.status_filtro_combustivel,
								s.status_filtro_cabine,s.status_filtro_ar,
								s.status_filtro_oleo,s.km,s.qtd_oleo
								FROM servicos s
								INNER JOIN cliente c on s.cliente_codcliente = c.codcliente
								INNER JOIn veiculo v on s.veiculo_cod_veiculo = cod_veiculo
								WHERE placa_veiculo = ${placa_veiculo}   order BY proxima_troca desc 

  

  `

const resultado = JSONbig.stringify(result);
res.json({resultado});

}
  

//API para buscar o ultimo histórico do veículo

export const clientVeiculo = async (req: Request, res:Response) => {
  const placa_veiculo = req.params.placa_veiculo;

  const result = await prisma.$queryRaw<number>`

                

        select   
                c.nome_cliente,c.sobrenome_cliente,c.codcliente,c.cpf_cliente, 
 								v.tipo_veiculo, v.fabricante_veiculo, cod_veiculo,v.modelo_veiculo,
 								v.placa_veiculo,v.status_veiculo,v.obs_veiculo,v.clientecodCliente
 								FROM cliente AS c
								JOIN veiculo AS v ON c.codcliente = v.clientecodCliente
				WHERE v.placa_veiculo = ${placa_veiculo}
        

  `

const resultado = JSONbig.stringify(result);
res.json({resultado});

}


export const clientVeiculoCpf = async (req: Request, res:Response) => {
  const cpf = req.params[0];

  const result = await prisma.$queryRaw<number>`

                

        select   
                c.nome_cliente,c.sobrenome_cliente,c.codcliente,c.cpf_cliente, 
 								v.tipo_veiculo, v.fabricante_veiculo, cod_veiculo,v.modelo_veiculo,
 								v.placa_veiculo,v.status_veiculo,v.obs_veiculo,v.clientecodCliente
 								FROM cliente AS c
								JOIN veiculo AS v ON c.codcliente = v.clientecodCliente
				WHERE c.cpf_cliente = ${cpf}
        

  `

const resultado = JSONbig.stringify(result);
res.json({resultado});

}

   export const trocaAVencer = async (req: Request, res: Response) => {

        // const trocaAVencer = await prisma.servicos.count({
        //     where: {
        //         proxima_troca: {
        //         lte: new Date(new Date(30).getTime() )
        //         }
        //     }
          

        // })

    

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

//         // const cpf_cliente = req.params.cpf_cliente;
        const cpf_cliente =req.params[0]; //pega tudo que vem do parametro
        
//         

const cpfTroca = await prisma.$queryRaw<number>`



SELECT c.nome_cliente, c.sobrenome_cliente,c.cpf_cliente, v.placa_veiculo, v.tipo_veiculo, v.fabricante_veiculo ,
 v.modelo_veiculo, c.codcliente,v.cod_veiculo, v.modelo_veiculo, v.cod_veiculo
  FROM cliente AS c 
  INNER JOIN veiculo AS v ON c.codcliente = v.clientecodCliente 
  WHERE c.cpf_cliente = ${cpf_cliente}

    `
const resultado = JSONbig.stringify(cpfTroca);

    res.json({resultado});

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