import express from 'express';
import dotenv from 'dotenv'
import connectDB from './db/connectDB.js'
import userRouter from './routes/user.js'
import taskRouter from './routes/task.js';
dotenv.config();
const app = express();


app.use(express.json());



//ROUTES 
app.use('/api/tasks',taskRouter);
app.use('/api/users',userRouter)


// app.use((err, req, res, next) => {
//    return res.status(500).json({status:"fail",err:err})
//   });

connectDB(process.env.MONGODB_CONNECTION_URI)
const PORT = process.env.PORT || 300
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})