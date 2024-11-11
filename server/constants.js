import dotenv from 'dotenv';

dotenv.config({path:'../.env'});

export const PORT = process.env.PORT;
export const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING;