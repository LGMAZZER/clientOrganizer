import { Response,Request } from "express";
import{ Op, where,fn,col,literal } from "sequelize";

import { Cliente } from "../models/Cliente";
import { Meetings } from "../models/Meetings";
import { DATE } from "sequelize";

export const home = async(req: Request, res: Response)=>{
    
    let day = new Date().getDate(); 
    let year = new Date().getFullYear();
    let month = new Date().getMonth(); 

    

    let today = new Date();
    today.setHours(0, 0, 0, 0);

    let weekDayOP= new Date().getDay();

    let weekDays:string[] = [
        "Domingo","Segunda","Terça","Quarta","Quinta","Sexta","sabado"
    ];
    let months:string[]=[
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];
    let currentMonth = months[month];

    let weekDay:string = weekDays[weekDayOP] as string;

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

    
    
     



    const clientesAudiencia = await Cliente.findAll({
            
            where:{
                
                data_audiencia:{[Op.ne]:null,[Op.between]:[today,dayInterval[1]]},
                      
            
            },
             attributes: {
                include: [
                    [fn('DAY', col('data_audiencia')), 'dia_audiencia'],
                    [literal("HOUR(CONVERT_TZ(data_audiencia, '+00:00', '-03:00'))"), 'hora_audiencia'],
                    [literal("LPAD(MINUTE(CONVERT_TZ(data_audiencia, '+00:00', '-03:00')), 2, '0')"), 'minuto_audiencia'],
                    [literal("CASE DAYOFWEEK(data_audiencia) WHEN 1 THEN 'Domingo' WHEN 2 THEN 'Segunda' WHEN 3 THEN 'Terça' WHEN 4 THEN 'Quarta' WHEN 5 THEN 'Quinta' WHEN 6 THEN 'Sexta' WHEN 7 THEN 'Sábado' END"), 'semana_audiencia'],
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
                    [coluna]: { [Op.ne]:null,[Op.between]:[today,dayInterval[1]] },
                    
                },
                attributes: {
                    include: [
                        [fn('DAY', col(coluna)), `dia_${sufixo}`],
                        [literal(`CASE DAYOFWEEK(${coluna}) WHEN 1 THEN 'Domingo' WHEN 2 THEN 'Segunda' WHEN 3 THEN 'Terça' WHEN 4 THEN 'Quarta' WHEN 5 THEN 'Quinta' WHEN 6 THEN 'Sexta' WHEN 7 THEN 'Sábado' END`), `semana_${sufixo}`],
                    ]
                },
                order: [[coluna, "ASC"]]
            });
    
            clientesResults.push(...resultados);
        }

        const reuniao = await Meetings.findAll({
            
            where:{
                
                date_meeting:{[Op.ne]:null,[Op.between]:[today,dayInterval[1]]},
                      
            
            },
             attributes: {
                include: [
                    [fn('DAY', col('date_meeting')), 'dia_meeting'],
                    [literal("HOUR(CONVERT_TZ(date_meeting, '+00:00', '-03:00'))"), 'hora_meeting'],
                    [literal("LPAD(MINUTE(CONVERT_TZ(date_meeting, '+00:00', '-03:00')), 2, '0')"), 'minuto_meeting'],
                    [literal("CASE DAYOFWEEK(date_meeting) WHEN 1 THEN 'Domingo' WHEN 2 THEN 'Segunda' WHEN 3 THEN 'Terça' WHEN 4 THEN 'Quarta' WHEN 5 THEN 'Quinta' WHEN 6 THEN 'Sexta' WHEN 7 THEN 'Sábado' END"), 'semana_meeting'],
                ]
            },
    
            
            order:[
                ["date_meeting","ASC"]
            ]
        });
        

        
    
        
    
    
        
        const clientesComDia = [
        ...clientesResults.map(cliente => cliente.toJSON()),
        ...clientesAudiencia.map(cliente => cliente.toJSON()),
        ...reuniao.map(cliente => cliente.toJSON())
        ];

        // Ordenar todas as datas em ordem crescente
        clientesComDia.sort((a, b) => {
            // Pegar a data relevante de cada cliente
            const getDataRelevante = (cliente: any): Date => {
                const datasDisponiveis = [
                    cliente.data_audiencia,
                    cliente.data_pagamento,
                    cliente.data_protocolo,
                    cliente.data_contestacao,
                    cliente.data_alegacoes,
                    cliente.data_recurso,
                    cliente.data_sentenca,
                    cliente.data_transito_julgado,
                    cliente.date_meeting,
                ];
                for (const data of datasDisponiveis) {
                    if (data) return new Date(data);
                }
                return new Date(0);
            };
            return getDataRelevante(a).getTime() - getDataRelevante(b).getTime();
        });

    res.render("pages/home",{clientes:clientesComDia,weekDay,day,currentMonth,lastDay:dayInterval[1]?.getDate()});
};