import { Request,Response } from "express";
import { Meetings } from "../models/Meetings";


export const cadastrarReuniaoGet = async(req:Request,res:Response)=>{
    
    res.render("pages/meetingAdd");

};

export const cadastrarReuniaoPost = async(req:Request,res:Response)=>{

    try{

        const dados={
            name_meeting: req.body.reuniao,
            date_meeting: req.body.data_reuniao,
            link_meeting: req.body.link_reuniao


        };

        const reuniao = await Meetings.create(dados);

        res.redirect("/");

    }catch(err){

    }


};

export const editarReuniaoGet = async(req:Request,res:Response)=>{
    const id:number = parseInt(req.params.id as string);

    const meeting = await Meetings.findByPk(id);

    if(meeting) {
        // Formatar a data para o formato datetime-local (YYYY-MM-DDTHH:mm)
        let formattedDate = '';
        if(meeting.date_meeting) {
            const date = new Date(meeting.date_meeting);
            // Obter data e hora local no formato correto
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            
            formattedDate = `${year}-${month}-${day}T${hours}:${minutes}`;
        }

        res.render("pages/meetingEdit", {
            meeting: {
                ...meeting.toJSON(),
                date_meeting: formattedDate
            }
        });
    } else {
        res.redirect("/calendario");
    }
};

export const editarReuniaoPost = async(req:Request,res:Response)=>{
    
    try{
        const id:number = parseInt(req.params.id as string);
        const meeting = await Meetings.findByPk(id);

        if(meeting){
            const emptyToNull = (value: any) => (value === "" ? null : value);

            const dados={
                name_meeting:emptyToNull(req.body.reuniao),
                date_meeting:emptyToNull(req.body.data_reuniao),
                link_meeting:emptyToNull(req.body.link_reuniao),
            }

            await meeting.update(dados);

            res.redirect("/calendario");
        } else {
            res.redirect("/calendario");
        }

    }catch(err){
        console.error("Erro ao editar reunião:", err);
        res.redirect("/calendario");
    }


};

export const deletarReuniaoGet = async(req:Request,res:Response)=>{
    try{
        const id:number = parseInt(req.params.id as string);
        const meeting = await Meetings.findByPk(id);

        if(meeting){
            res.render("pages/meetingDelete", {
                id: meeting.id,
                name_meeting: meeting.name_meeting
            });
        } else {
            res.redirect("/calendario");
        }
    }catch(err){
        res.redirect("/calendario");
    }
};

export const deletarReuniao = async(req:Request,res:Response)=>{
    try{
        const id:number = parseInt(req.params.id as string);

        const meeting = await Meetings.findByPk(id);

        if(meeting){
            await meeting.destroy();
        }

        res.redirect("/calendario");
    }catch(err){
        res.redirect("/calendario");
    }
};

export const configReuniao = async(req:Request,res:Response)=>{
    const id:number = parseInt(req.params.id as string);
    
    res.render("pages/meetingConfig",{id});

};