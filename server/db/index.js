import { Sequelize } from "sequelize";
import { DB_CONNECTION_STRING } from "../constants.js";


class DBConnection {
    constructor(){
        this.sequelize = new Sequelize(DB_CONNECTION_STRING,{dialect:'postgres'});
    }


    async connect(){
        try{
            await this.sequelize.authenticate();
            console.log('Connected to DB successfully')
        
        }
        catch(err){
            console.log('Failed to connect to DB --> ',err)
        }   
    }

    dbInstance(){
        return this.sequelize;
    }

}

// class Singleton{
//     constructor(){
//         if(!this.instance){
//             const instance = new DBConnection();
//             return instance
//         }
//         return this
//     }
// }

export const dbConnection = new DBConnection;