import { Response, Request } from "express";
import { Op,fn,col,where,literal } from "sequelize";
import { Cliente } from "../models/Cliente";

export const calendario = async(req:Request,res:Response)=>{


    let month_dateNum = new Date().getMonth();

    let yearOp = new Date().getFullYear();

    let year = parseInt(req.query.year as string) || yearOp;

    let months:string[]=[
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];

    let numMonth:number = parseInt(req.query.numMonth as string) || month_dateNum;
    let month:string = months[numMonth] as string;

    if(req.query.mais){
        console.log(numMonth);
        numMonth++;
        
        if(numMonth>11){
            numMonth=0;
            year++;
        }
        month = months[numMonth] as string;
        
    }
    if(req.query.menos&&numMonth>0){
        console.log(numMonth);
        numMonth--;
        month = months[numMonth] as string;
    } 
    if(req.query.menos && numMonth===0){
        numMonth=11;
        year--;
        month = months[numMonth] as string;
    }

    if(req.query.month_dateNum){
        if(parseInt(req.query.month_dateNum as string)<=12){
            numMonth = parseInt(req.query.month_dateNum as string)-1;
            month = months[numMonth] as string;
        }
    }

    

    const clientesAudiencia = await Cliente.findAll({
        
        where:{
            
            data_audiencia:{[Op.ne]:null},
            [Op.and]:[
                where(fn("MONTH",col("data_audiencia")),numMonth + 1),
                where(fn("YEAR",col("data_audiencia")),year),
            ]
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
                    where(fn("MONTH", col(coluna)), numMonth + 1),
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
    ...clientesResults.map(cliente => cliente.toJSON()),
    ...clientesAudiencia.map(cliente => cliente.toJSON()),


    ];
    
    
 


    return res.render("pages/calendario",{clientes: clientesComDia, month, year, numMonth,month_dateNum});
};


