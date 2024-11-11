import express from 'express';
import cors from 'cors';
import  {PORT} from './constants.js'
import { dbConnection } from './db/index.js';
import { studentRouter } from './routes/studentRoutes.js';
const app = express();

//db connection
dbConnection.connect();

//middlewares
app.use(express.json());
app.use(cors())


//routes
app.use('/api/user',studentRouter);

app.listen(PORT,()=>{
    console.log("Server is running at ", PORT)
})