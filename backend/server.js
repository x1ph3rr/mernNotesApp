import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./routes/userRoute";
import taskRouter from "./routes/taskRoute";
import forgotPasswordRouter from "./routes/forgotPassword";

//app config
dotenv.config();
const app = express();
const port = process.env.port || 8001;
mongoose.set('strictQuery', true);

//middlewares
app.use(express.json());
app.use(cors());

//db config
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
},(err)=>{
    if(err){
        console.log(err)
    } else{
        console.log("db connected")
    }
})

//api endpoints
app.use("/api/user", userRouter);
app.use("/api/task", taskRouter);
app.use("/api/forgotPassword", forgotPasswordRouter);

//listen
app.listen(port, ()=>console.log(`Listening on localhost:${port}`))