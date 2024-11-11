import Mark from "../model/MarkModel.js";
import Student from "../model/StudentModel.js"
import { dbConnection } from "./index.js";

async function syncDb(){
    await dbConnection.connect();
    const args = process.argv.slice(2)[0];

    if(args === 'drop'){
        await Mark.drop();
        await Student.drop();
    }

    if(args === 'create'){
        await Student.sync({force:true})
        await Mark.sync({force:true})
    }

}

syncDb()