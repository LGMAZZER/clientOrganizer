import { Request, Response, NextFunction } from "express";
import bycrypt from "bcrypt";
import { Users } from "../models/Users";

declare module "express-session"{
    interface SessionData{
        userId: number;
        userName:string;
    }
}

export const requireAuth = (req:Request,res: Response, next: NextFunction)=>{
    if(req.session.userId){
        next();
    }
    else{
        res.redirect("/login");
    }
};


export const loginErrado = async(req:Request,res:Response)=>{
    res.render("pages/loginErrado");
};


export const loginGet = async(req:Request,res:Response)=>{
    if(req.session.userId){
        return res.redirect("/");
    }
    res.render("pages/login");
};

export const loginPost = async(req:Request,res:Response)=>{
    const email = req.body.email;
    const password = req.body.senha;

    try{
        const user = await Users.findOne({where:{email:email}});

        if(!user){
            return res.redirect("/loginerrado");
        }   
        const validPassword = await bycrypt.compare(password,user.senha);
        if(!validPassword){
            return res.redirect("/loginerrado")
        }

        req.session.userId = user.id;
        req.session.userName = user.nome;

        res.redirect("/");




    }catch(error){
        console.error("Erro no login:", error);
        res.render("pages/login", { error: "Erro ao processar login" });
    }
};

export const logout = (req:Request,res:Response)=>{
    req.session.destroy((err)=>{
        if(err){
            console.error("Erro ao fazer logout:", err);
        }
        res.redirect("login");
    });
};

