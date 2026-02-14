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