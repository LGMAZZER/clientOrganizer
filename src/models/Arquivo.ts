import { Model, DataTypes } from "sequelize";
import { sequelize } from "../instances/mysql";


export interface ArquivoInstance extends Model{
    
    id: number;
    processo_id: number;      // Referência ao processo (id do Cliente)
    nome_original: string;    // Nome original do arquivo
    nome_salvo: string;       // Nome único gerado (UUID)
    tipo: string;             // Tipo MIME (pdf, docx, etc)
    tamanho: number;          // Tamanho em bytes
    caminho: string;          // Caminho no servidor
    criado_em: Date;


}

export const Arquivo = sequelize.define<ArquivoInstance>("Arquivo",{
    id:{
        primaryKey:true,
        autoIncrement:true,
        type:DataTypes.INTEGER

    },
    processo_id:{
        type:DataTypes.INTEGER
    },
    nome_original:{
        type:DataTypes.STRING
    },
    nome_salvo:{
        type:DataTypes.STRING
    },
    tipo:{
        type:DataTypes.STRING
    },
    tamanho:{
        type:DataTypes.NUMBER
    },
    caminho:{
        type:DataTypes.STRING
    },
    criado_em: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false
    } 

},{
    tableName: "arquivos_processos",
    timestamps:false
}
);