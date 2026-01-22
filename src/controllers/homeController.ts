import { Response,Request } from "express";
import{ Op, where,fn,col,literal } from "sequelize";

import { Cliente } from "../models/Cliente";
import { DATE } from "sequelize";

export const home = async(req: Request, res: Response)=>{
    
    let day = new Date().getDate(); 
    let year = new Date().getFullYear();
    let month = new Date().getMonth(); 

    const dataInicio = new Date(year,month,day);
    const dataFim = new Date(year,month,day+7);

    function getIntervaloSemana(dia: number, mes: number): [Date, Date] {
    const anoAtual = new Date().getFullYear();
    const dataReferencia = new Date(anoAtual, mes, dia); 
    const diaDaSemana = dataReferencia.getDay();
    
    
    const primeiroDia = new Date(dataReferencia);
    primeiroDia.setDate(dataReferencia.getDate() - diaDaSemana);
    primeiroDia.setHours(0, 0, 0, 0);
    
    
    const ultimoDia = new Date(dataReferencia);
    ultimoDia.setDate(dataReferencia.getDate() + (6 - diaDaSemana)+7);
    ultimoDia.setHours(23, 59, 59, 999);

   // let dayFirst:number = primeiroDia.getDay();
   // let dayLast:number = ultimoDia.getDay();
    
    return [primeiroDia, ultimoDia];
    }

    let dayInterval:Date[]=getIntervaloSemana(day,month);

    
    
    let today = new Date();
    today.setHours(0, 0, 0, 0);

    const clientesAudiencia = await Cliente.findAll({
            
            where:{
                
                data_audiencia:{[Op.ne]:null,[Op.between]:[today,dayInterval[1]]},
                      
            
            },
             attributes: {
                include: [
                    [fn('DAY', col('data_audiencia')), 'dia_audiencia'],
                    [literal("HOUR(CONVERT_TZ(data_audiencia, '+00:00', '-03:00'))"), 'hora_audiencia'],
                    [literal("LPAD(MINUTE(CONVERT_TZ(data_audiencia, '+00:00', '-03:00')), 2, '0')"), 'minuto_audiencia']
                ]
            },
    
            
            order:[
                ["data_audiencia","ASC"]
            ]
        });

            const colunasDatas = [
            'data_pagamento',
            'data_protocolo',
            'data_contestacao',
            'data_alegacoes',
            'data_recurso',
            'data_sentenca',
            'data_transito_julgado',
            ];
    
        let clientesResults = [];
    
        for (const coluna of colunasDatas) {
            const sufixo = coluna.split('_')[1];
    
            const resultados = await Cliente.findAll({
                where: {
                    [coluna]: { [Op.ne]: null },
                    [Op.and]: [
                        where(fn("MONTH", col(coluna)), month + 1),
                        where(fn("YEAR", col(coluna)), year),
                    ]
                },
                attributes: {
                    include: [
                        [fn('DAY', col(coluna)), `dia_${sufixo}`]
                    ]
                },
                order: [[coluna, "ASC"]]
            });
    
            clientesResults.push(...resultados);
        }
    
        
    
    
        
        const clientesComDia = [
        //...clientesResults.map(cliente => cliente.toJSON()),
        ...clientesAudiencia.map(cliente => cliente.toJSON()),
    
    
        ];
    



    res.render("pages/home",{clientes:clientesComDia});
};