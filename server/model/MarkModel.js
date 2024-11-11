import { DataTypes } from "sequelize";
import { dbConnection } from "../db/index.js";
import Student from "./StudentModel.js";

const Mark = dbConnection.dbInstance().define(
    'Mark',
    {
        id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
        student_id:{
            type:DataTypes.INTEGER,

            references:{
                model:Student,
                key:'id'
            }
        },

        mark:{
            type:DataTypes.INTEGER,
            allowNull:false
        }
    

    },
    {
        modelName:'Mark'
    }
)
export default Mark;