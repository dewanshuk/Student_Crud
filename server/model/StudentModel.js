import { Sequelize,DataTypes } from "sequelize";
import { dbConnection } from "../db/index.js";
import Mark from "./MarkModel.js";

const Student = dbConnection.dbInstance().define(
    'Student',
    {
        id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
        name:{
            type:DataTypes.STRING,
            allowNull:false
        },
        age:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        email:{
            type:DataTypes.STRING
        }

    },
    {
        modelName:'Student'
    }
)


export default Student

