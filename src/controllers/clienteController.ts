

import { Request, Response } from "express";
import { ClienteService } from "../services/ClienteService";
import { PrismaClient } from "@prisma/client";
import { join } from "path";


const prisma = new PrismaClient();

// export const all = async (req: Request, res: Response) =>{
//     //pegar todos os usuarios
//     const cliente = await ClienteService.findAll();
//     res.json({cliente})
// }

//atualizar os dados



export const one = async (req: Request, res: Response) =>{
    const {cpf_cliente} = req.body;
    const cliente = await ClienteService.findOne(cpf_cliente);
    //se enconrtrar usuario
    if(cliente){
        res.json({cliente});
    }else {
        res.json({error: 'Cliente não ecnontrado'});
    }
}

export const create = async (req: Request, res: Response) => {
    const {nome_cliente, sobrenome_cliente, telefone1_cliente, telefone2_cliente, cpf_cliente,
        rg_cliente, rua_cliente, numero_rua_cliente, cidade_cliente, uf_cliente, data_nascimento_cliente,
        sexo_cliente, bairro_cliente, cep_cliente, status_cliente
        } = req.body;

    //se tiver todos esses dados....

            const cpf = await ClienteService.findOne((cpf_cliente));

            if(!cpf){

            const cliente = await ClienteService.create({
                nome_cliente, sobrenome_cliente, telefone1_cliente, telefone2_cliente, cpf_cliente,
                rg_cliente, rua_cliente, numero_rua_cliente:parseInt(numero_rua_cliente), cidade_cliente, uf_cliente, data_nascimento_cliente,
                sexo_cliente, bairro_cliente, cep_cliente:parseInt(cep_cliente), status_cliente

            });
            
            res.status(201).json({cliente});
            
            }else{
                res.json({error: "Cliente já existe"});
            }
      
            // }else {
            //     res.json({error: 'Dados não preenchidos'});
            // }


        
    }

    export const updateClient = async(req: Request, res: Response)=> {
        const {codcliente} = req.params;
        console.log(codcliente);
        //const clientId = req.params.cpf_cliente;
       
    
        const {nome_cliente, sobrenome_cliente, telefone1_cliente, telefone2_cliente,cpf_cliente,
            rg_cliente, rua_cliente, numero_rua_cliente, cidade_cliente, uf_cliente, data_nascimento_cliente,
            sexo_cliente, bairro_cliente, cep_cliente, status_cliente
            } = req.body;
            

            const encontRegistro = await prisma.cliente.findUnique({
                where: {
                    codcliente : parseInt(codcliente)  
                }
            })

            // res.json({encontRegistro});

            if(encontRegistro){

                    //se encontrou o registro, realiza a conversao ...
                    const cepCliente = parseInt(cep_cliente);
                    const numero = parseInt(numero_rua_cliente);  


                    const cliente = await prisma.cliente.update({
                        where:{
                            codcliente:parseInt(codcliente)
                        },
                        data: {nome_cliente, sobrenome_cliente, telefone1_cliente, telefone2_cliente,cpf_cliente,
                            rg_cliente, rua_cliente, numero_rua_cliente:numero, cidade_cliente, uf_cliente, data_nascimento_cliente,
                            sexo_cliente, bairro_cliente, cep_cliente:cepCliente, status_cliente}
                          
                        
                    })
                    res.json({cliente})
            }       
    
          else {
                res.json({error: "Registro não encontrado"});  
    
            }
    
          
    }   

    export  const deleteCliente =  async (req: Request, res: Response) => {
        const {codcliente} = req.params;

        const encontRegistro = await prisma.cliente.findUnique({
            where: {
                codcliente : parseInt(codcliente)
            }
        })

        if(encontRegistro){

                try{
                     await prisma.cliente.delete({
                                where : {
                                    codcliente : parseInt(codcliente)
                                }
                            });
                            res.json({success: 'excluido com sucesso!'});    
                            return encontRegistro;
                            res.status(204).send();   
                            // res.json("excluido com sucesso!");   
                            console.log('Excluido com sucesso');  
                        }catch (error){
                            console.log(error);
                            res.status(5000).send(error);
                        }
        }else {
            res.json({error: "registro nao encontrado!"})
        }

    } 

