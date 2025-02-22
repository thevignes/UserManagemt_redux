import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config()

mongoose.connect(process.env.MONGO_URL,{
   
}).then(()=>{
    console.log('mongodb connected succefully')
}).catch((err)=>{
    console.log(err,'failed to connect')
})


