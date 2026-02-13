import {Model, DataTypes} from "sequelize";
import { sequelize } from "../instances/mysql";

export interface MeetingsInstance extends Model{
    id: number;
    name_meeting: string;
    date_meeting: string;

}

export const Meetings = sequelize.define<MeetingsInstance>("Meetings",{
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    name_meeting:{
        type: DataTypes.STRING
    },
    date_meeting:{
        type: DataTypes.DATE
    }
},{
    tableName: "meetings",
    timestamps: false 
}
)