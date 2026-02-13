import { Response,Request } from "express";
import{ Op, where } from "sequelize";
import { Cliente } from "../models/Cliente";
import { Arquivo } from "../models/Arquivo";
import path from "path";
import fs from "fs";

// Função para remover . e - do CPF
const limparCPF = (cpf: string | null | undefined): string | null | undefined => {
    if (!cpf) return cpf;
    
    return cpf.replace(/\D/g, '');
};


function fixcpf(cpf:string|null|undefined):string|null|undefined{
    if(!cpf) return cpf;
    let op: string[]=[];
    let result:string="";

    for(let i=0;i<cpf.length;i++){
        op.push(cpf.charAt(i));
        if(i===2||i==5){
            op.push("-");
        }
        if(i===8){
            op.push(".")
        }
    }
    for(let i=0;i<op.length;i++){
        result+=op[i];
    }

    

    return result;
}

export const showCpfResgisterError = async(req:Request,res:Response)=>{

    res.render("pages/erroCpfCadastro");
};

export const deletarclienteGet = async(req:Request,res:Response)=>{
    let idCliente:number = parseInt(req.params.id as string);
    res.render("pages/clienteDelete", {id: idCliente});
};

export const deletarclientePost = async(req:Request,res:Response)=>{
    const idCliente:number = parseInt(req.params.id as string);
   /* let results = await Cliente.findAll({
        where:{id:idCliente}
    });
    if(results.length>0){
        let usuario = results[0];
        if(usuario){
            await usuario.destroy();
            res.redirect("/vizualizarclientes");
            return;
        }
    }
    res.redirect("/vizualizarclientes");*/
try{
    const cliente = await Cliente.findByPk(idCliente);

    const arquivo = await Arquivo.findOne({where:{processo_id:idCliente}});

    if(!cliente){
        return res.redirect("/");
    }

    if(arquivo){
    const caminhoOp = path.join(__dirname, '../..', 'public', arquivo.caminho);
    const caminho = path.dirname(caminhoOp);
    if(fs.existsSync(caminho)){
        fs.rmSync(caminho,{ recursive: true, force: true });
    }
    await Arquivo.destroy({where:{processo_id:idCliente}});

    }



    await cliente.destroy();

    res.redirect("/vizualizarclientes");
    }catch(error){
        console.error("Erro ao deletar cliente:", error);
        return res.status(500).send("Erro ao deletar cliente.");
      
    }   
};
export const addProcessoGet = async(req:Request,res:Response)=>{
    let idCliente:number = parseInt(req.params.id as string);
    let user = await Cliente.findOne({where:{id:idCliente}});
    res.render("pages/clienteAddProcesso",user?.toJSON());
};

export const addProcessoPost = async(req:Request,res:Response)=>{
    try {

        const emptyToNull = (value: any) => (value === "" ? null : value);
        
        const dados = {
            nome_completo: req.body.nome_completo,
            
            // Variáveis com restrição UNIQUE (Tratadas com emptyToNull)
            cpf: emptyToNull(req.body.cpf),
            numero_processo: emptyToNull(req.body.numero_processo),

            // Datas (Também recomendado tratar com emptyToNull para o MySQL)
            data_nascimento: emptyToNull(req.body.data_nascimento),
            data_protocolo: emptyToNull(req.body.data_protocolo),
            data_audiencia:emptyToNull(req.body.data_audiencia),
            data_transito_julgado: emptyToNull(req.body.data_transito_julgado),

            // Demais campos
            estado_civil: req.body.estado_civil,
            naturalidade: req.body.naturalidade,
            rg: req.body.rg,
            telefone_contato: req.body.telefone_contato,
            endereco_residencial: req.body.endereco_residencial,
            email: emptyToNull(req.body.email),
            profissao: req.body.profissao,
            nome_conjuge: req.body.nome_conjuge,
            profissao_conjuge: req.body.profissao_conjuge,
            
            numero_filhos: req.body.numero_filhos ? parseInt(req.body.numero_filhos) : 0,
            idade_filhos: req.body.idade_filhos,
            
            empresa_trabalho: req.body.empresa_trabalho,
            endereco_comercial: req.body.endereco_comercial,
            telefone_comercial: req.body.telefone_comercial,
            acao: req.body.acao,
            
            honorarios: req.body.honorarios ? parseFloat(req.body.honorarios) : 0,
            data_pagamento: emptyToNull(req.body.data_pagamento),
            plano_pagamento: req.body.plano_pagamento,
            observacoes: req.body.observacoes,

            vara:req.body.vara,
            data_contestacao: emptyToNull(req.body.data_contestacao),
            data_alegacoes: emptyToNull(req.body.data_alegacoes),
            data_recurso: emptyToNull(req.body.data_recurso),
            data_sentenca: emptyToNull(req.body.data_sentenca),

            id2:req.params.id
        };

        
        await Cliente.create(dados);

        

        
        res.redirect("/vizualizarclientes");

    } catch (error) {
        console.error("Erro ao salvar:", error);
        res.status(500).send("Erro ao processar o cadastro.");
    }
};

export const editarProcessoGet = async(req:Request,res:Response)=>{
    let idCliente:number = parseInt(req.params.id as string);
    let user = await Cliente.findOne({where:{id:idCliente}});
    
    let userData = user?.toJSON();
    
    // Formatar data_audiencia para o formato datetime-local (YYYY-MM-DDTHH:MM)
    if (userData && userData.data_audiencia) {
        const date = new Date(userData.data_audiencia);
        if (!isNaN(date.getTime())) {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            userData.data_audiencia = `${year}-${month}-${day}T${hours}:${minutes}`;
        }
    }
    
    res.render("pages/processoEdit", userData);
};

export const editarProcessoPost = async(req:Request, res:Response)=>{
    try {
        let idCliente:number = parseInt(req.params.id as string);
        let user = await Cliente.findOne({where:{id:idCliente}});
        
        
        
        if(user){
            const emptyToNull = (value: any) => (value === "" ? null : value);
            
            const dados = {
                
                honorarios: req.body.honorarios ? parseFloat(req.body.honorarios) : 0,
                data_pagamento: emptyToNull(req.body.data_pagamento),
                plano_pagamento: req.body.plano_pagamento,
                observacoes: req.body.observacoes,
                

                numero_processo: emptyToNull(req.body.numero_processo),
                data_protocolo: emptyToNull(req.body.data_protocolo),
                data_audiencia:emptyToNull(req.body.data_audiencia),
                data_transito_julgado: emptyToNull(req.body.data_transito_julgado),
                acao: req.body.acao,
                vara:req.body.vara,
                data_contestacao: emptyToNull(req.body.data_contestacao),
                data_alegacoes: emptyToNull(req.body.data_alegacoes),
                data_recurso: emptyToNull(req.body.data_recurso),
                data_sentenca: emptyToNull(req.body.data_sentenca)
            };
            
            await user.update(dados);
        }
                
        res.redirect(`/cliente/${idCliente}`);
    } catch (error) {
        console.error("Erro ao atualizar:", error);
        res.status(500).send("Erro ao processar a atualização.");
    }

};




export const editarclienteGet = async(req:Request,res:Response)=>{
    let idCliente:number = parseInt(req.params.id as string);
    let user = await Cliente.findOne({where:{id:idCliente}});
    res.render("pages/clienteEdit",user?.toJSON());
};



export const editarClientePost = async(req:Request, res:Response)=>{
    try {
        let idCliente:number = parseInt(req.params.id as string);
        let userOP = await Cliente.findOne({where:{id:idCliente}});
        let id2Cliente:number = userOP?.id2 as number;
        let users = await Cliente.findAll({where:{id2:id2Cliente}})
        
        
        if(users){
            const emptyToNull = (value: any) => (value === "" ? null : value);
            
            const dados = {
                nome_completo: req.body.nome_completo,
                cpf: limparCPF(emptyToNull(req.body.cpf)),
                data_nascimento: emptyToNull(req.body.data_nascimento), 
                estado_civil: req.body.estado_civil,
                naturalidade: req.body.naturalidade,
                rg: req.body.rg,
                telefone_contato: req.body.telefone_contato,
                endereco_residencial: req.body.endereco_residencial,
                email: emptyToNull(req.body.email),
                profissao: req.body.profissao,
                nome_conjuge: req.body.nome_conjuge,
                profissao_conjuge: req.body.profissao_conjuge,
                numero_filhos: req.body.numero_filhos ? parseInt(req.body.numero_filhos) : 0,
                idade_filhos: req.body.idade_filhos,
                empresa_trabalho: req.body.empresa_trabalho,
                endereco_comercial: req.body.endereco_comercial,
                telefone_comercial: req.body.telefone_comercial,
                
                
                
            };
            
            await Cliente.update(dados, {
                where:{
                    id2:id2Cliente
                }
            });
        }
        res.redirect(`/cliente/${idCliente}`);
    } catch (error) {
        console.error("Erro ao atualizar:", error);
        res.status(500).send("Erro ao processar a atualização.");
    }

};

export const paginaCliente = async(req:Request, res:Response)=>{
    
    let idCliente:number = parseInt(req.params.id as string);
    
    let user = await Cliente.findOne({
        where:{
            id: idCliente
        }
        
    });
    let cpfEdited = fixcpf(user?.cpf);


    if (!user) {
        return res.status(404).send("Cliente não encontrado");
    }

    res.render("pages/clientePage", {...user.toJSON(), cpfEdited});

};

export const vizualizarCliente = async(req:Request, res:Response)=>{
    const itemsPorPagina = 10;
    let numPage = parseInt(req.query.page as string)||1;
    let off = parseInt(req.query.offset as string) || 0;
    
    if(req.query.mais){
        off += itemsPorPagina;
        numPage++;
    }
    if(req.query.menos && off > 0){
        off -= itemsPorPagina;
        numPage--;
    }
    
    let users = await Cliente.findAll({
        offset: off,
        limit: itemsPorPagina
    });
    
    let buscar = req.query.buscar;
    if(buscar){
        users = await Cliente.findAll({
            where:{
                [Op.or]:[
                {nome_completo:{
                    [Op.like]: `%${buscar}%`
                }},
                {numero_processo:{
                    [Op.like]: `%${buscar}%`
                }}
                ]
            },
            offset: off,
            limit: itemsPorPagina
        });
    }
    
    res.render("pages/clienteList",{
        users,
        offset: off,
        itemsPorPagina,
        page:numPage
    });
};


export const clienteAddGet = async(req: Request,res: Response)=>{
    let users = await Cliente.findAll();
    res.render("pages/clienteAdd",{
        users
    });
    
};



export const clienteAddPost = async (req: Request, res: Response) => {
    try {

        const emptyToNull = (value: any) => (value === "" ? null : value);


        
        const dados = {
                
                nome_completo: req.body.nome_completo,
                cpf: limparCPF(emptyToNull(req.body.cpf)),
                data_nascimento: emptyToNull(req.body.data_nascimento), 
                estado_civil: req.body.estado_civil,
                naturalidade: req.body.naturalidade,
                rg: req.body.rg,
                telefone_contato: req.body.telefone_contato,
                endereco_residencial: req.body.endereco_residencial,
                email: emptyToNull(req.body.email),
                profissao: req.body.profissao,
                nome_conjuge: req.body.nome_conjuge,
                profissao_conjuge: req.body.profissao_conjuge,
                numero_filhos: req.body.numero_filhos ? parseInt(req.body.numero_filhos) : 0,
                idade_filhos: req.body.idade_filhos,
                empresa_trabalho: req.body.empresa_trabalho,
                endereco_comercial: req.body.endereco_comercial,
                telefone_comercial: req.body.telefone_comercial,
                
                
                honorarios: req.body.honorarios ? parseFloat(req.body.honorarios) : 0,
                data_pagamento: emptyToNull(req.body.data_pagamento),
                plano_pagamento: req.body.plano_pagamento,
                observacoes: req.body.observacoes,
                

                numero_processo: emptyToNull(req.body.numero_processo),
                data_protocolo: emptyToNull(req.body.data_protocolo),
                data_audiencia:emptyToNull(req.body.data_audiencia),
                data_transito_julgado: emptyToNull(req.body.data_transito_julgado),
                acao: req.body.acao,
                vara:req.body.vara,
                data_contestacao: emptyToNull(req.body.data_contestacao),
                data_alegacoes: emptyToNull(req.body.data_alegacoes),
                data_recurso: emptyToNull(req.body.data_recurso),
                data_sentenca: emptyToNull(req.body.data_sentenca)
        };

        let userOP = await Cliente.findAll({
            where:{
                cpf:dados.cpf
            }
        });
        
        
        if(userOP.length===0){
        const user = await Cliente.create(dados);
        
        let op = user?.id;
        
        await user?.update({id2:op});

        
        res.redirect("/");
    }
    else{
        res.redirect("/errocadastro");
    }

    } catch (error) {
        console.error("Erro ao salvar:", error);
        res.status(500).send("Erro ao processar o cadastro.");
    }
};
