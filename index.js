import express from 'express';
import dotenv from 'dotenv'
import connectDB from './db/connectDB.js'
dotenv.config();
const app = express();

connectDB(process.env.MONGODB_CONNECTION_URI)
const PORT = process.env.PORT || 300
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})