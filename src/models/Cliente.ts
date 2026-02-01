import { Model, DataTypes } from "sequelize";
import { sequelize } from "../instances/mysql";

export interface UserInstance extends Model {
    id: number;
    nome_completo: string;
    data_nascimento?: string;
    estado_civil?: string;
    naturalidade?: string;
    cpf?: string;
    rg?: string;
    telefone_contato?: string;
    endereco_residencial?: string;
    email?: string;
    profissao?: string;
    nome_conjuge?: string;
    profissao_conjuge?: string;
    numero_filhos?: number;
    idade_filhos?: string;
    empresa_trabalho?: string;
    endereco_comercial?: string;
    telefone_comercial?: string;
    acao?: string;
    numero_processo?: string;
    data_protocolo?: string;
    data_audiencia?: string;
    data_transito_julgado?: string;
    honorarios?: number;
    data_pagamento?:string;
    plano_pagamento?: string;
    observacoes?: string;
    vara?: string;
    data_contestacao?:string;
    data_alegacoes?:string;
    data_recurso?:string;
    data_sentenca?:string;
    id2?:number;
    readonly criado_em?: Date;
}

export const Cliente = sequelize.define<UserInstance>("Cliente", {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    nome_completo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    data_nascimento: {
        type: DataTypes.DATEONLY // DATEONLY remove a parte da hora (HH:mm:ss)
    },
    estado_civil: {
        type: DataTypes.STRING
    },
    naturalidade: {
        type: DataTypes.STRING
    },
    cpf: {
        type: DataTypes.STRING,
        allowNull: false
    },
    rg: {
        type: DataTypes.STRING
    },
    telefone_contato: {
        type: DataTypes.STRING
    },
    endereco_residencial: {
        type: DataTypes.TEXT
    },
    email: {
        type: DataTypes.STRING
    },
    profissao: {
        type: DataTypes.STRING
    },
    nome_conjuge: {
        type: DataTypes.STRING
    },
    profissao_conjuge: {
        type: DataTypes.STRING
    },
    numero_filhos: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    idade_filhos: {
        type: DataTypes.STRING
    },
    empresa_trabalho: {
        type: DataTypes.STRING
    },
    endereco_comercial: {
        type: DataTypes.TEXT
    },
    telefone_comercial: {
        type: DataTypes.STRING
    },
    acao: {
        type: DataTypes.STRING
    },
    numero_processo: {
        type: DataTypes.STRING,
        unique: true,
        
    },
    data_protocolo: {
        type: DataTypes.DATEONLY
    },
    data_transito_julgado: {
        type: DataTypes.DATEONLY
    },
    data_audiencia: {
        type: DataTypes.DATE
    },
    honorarios: {
        type: DataTypes.DECIMAL(15, 2),
        defaultValue: 0.00
    },
    data_pagamento: {
        type: DataTypes.DATEONLY
    },
    plano_pagamento: {
        type: DataTypes.TEXT
    },
    vara: {
        type: DataTypes.STRING
    },
    data_contestacao:{
        type: DataTypes.DATE
    },
    data_alegacoes:{
        type: DataTypes.DATE
    },
    data_recurso:{
        type: DataTypes.DATE
    },
    data_sentenca:{
        type: DataTypes.DATE
    },

    observacoes: {
        type: DataTypes.TEXT
    },
    id2:{
        type: DataTypes.INTEGER
    },
    criado_em: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false
    }   

}, {
    tableName: "clientes_processos",
    timestamps: false 
});