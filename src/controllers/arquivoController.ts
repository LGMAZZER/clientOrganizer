import { Request, Response } from "express";
import { Arquivo } from "../models/Arquivo";
import { Cliente } from "../models/Cliente";
import path from "path";
import fs from "fs";



export const showArquivo = async (req:Request,res:Response)=>{
    const idProcesso = req.params.id;


    try{
        const processo = await Cliente.findOne({where:{id:idProcesso}});

        if(!processo){
            return res.redirect("/");
        }
        const arquivos = await Arquivo.findAll({
            where:{processo_id:idProcesso},
            order:[["criado_em","DESC"]]
        });

        // Converte para JSON e corrige caminhos antigos que ainda têm 'public/'
        const arquivosFormatados = arquivos.map(arq => {
            const data = arq.toJSON();
            //data.caminho = data.caminho.replace('public/', '');
            return data;
        });

        res.render("pages/arquivosPage",{
            processo,
            arquivos: arquivosFormatados,
            showArquivos: arquivos.length>0
        });
    } catch(error){
        res.send("Erro ao carregar arquivos "+error);
    }
     
};
export const uploadArquivoGet = async(req:Request,res:Response)=>{
    const idProcesso = req.params.id;


        const processo = await Cliente.findOne({where:{id:idProcesso}});
        if(!processo){
            return res.redirect("/");
        }
        res.render("pages/arquivoUpload", { id: idProcesso });
    

};

export const uploadArquivoPost = async(req:Request,res:Response)=>{
    const idProcesso = req.params.id;

    try{
        const processo = await Cliente.findOne({where:{id:idProcesso}});

        if(!processo){
            return res.redirect("/");
        }

        if(!req.files || (req.files as Express.Multer.File[]).length === 0){
            return res.redirect("/");
        }

        const files = req.files as Express.Multer.File[];
        
        
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            if(file){
            await Arquivo.create({
                processo_id: parseInt(idProcesso as string),
                nome_original: file.originalname,
                nome_salvo: file.filename,
                tipo: file.mimetype,
                tamanho: file.size,
                caminho: file.path.replace('public/', ''),
            });
        }
        }

        res.redirect(`/arquivosprocessos/${idProcesso}`);


    }catch(error){
        console.error('Erro no upload:', error);
        res.redirect(`/arquivosprocessos/${idProcesso}`);
    }
};

export const arquivoDeleteGet = async(req:Request,res:Response)=>{
    const idProcesso = req.params.id;

    const processo = await Arquivo.findByPk(idProcesso);

    const processo_id = processo?.processo_id;

    if(!processo){

        return res.redirect("/");
    }
    res.render("pages/arquivoDelete",{id:idProcesso,idProcess:processo_id});

};

export const arquivoDeletePost = async(req:Request,res:Response)=>{
    const idProcesso:number = parseInt(req.params.id as string);

    try{

        const arquivo = await Arquivo.findByPk(idProcesso);

        const processo_id = arquivo?.processo_id;

        if(!arquivo){

        return res.redirect("/");
        }

        const caminho = path.join(__dirname, '../..', 'public', arquivo.caminho);
        if(fs.existsSync(caminho)){
            fs.unlinkSync(caminho);
        }

        await arquivo.destroy();

        res.redirect(`/arquivosprocessos/${processo_id}`);

    }catch(error){
        console.log(error);
        res.redirect("/");
    }

};
