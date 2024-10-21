import mongoose from 'mongoose';
// require('dotenv').config({path: './env'});

import dotenv from 'dotenv';
import { DB_NAME } from './constant.js';
import express from 'express';
import connectDB from './db/index.js';
const app = express();
dotenv.config({path: './env'});
connectDB().then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log(`Server is running on port ${process.env.PORT}`);
    });
})
.catch((error)=>{
    console.log(error);
    process.exit(1);
});








// (async ()=>{
//     try{
//        await mongoose.connect('mongodb+srv://aadi20233002:uiopqwe45@cluster0.vyc7y.mongodb.net/videotube')
//        console.log("Database connected")
//        app.on("error",(error) =>{
//         console.log("Error")
//         throw error
//        })
//          app.listen(process.env.PORT,()=>{
//               console.log(`Server is running on port ${process.env.PORT}`)
//          })
//     } catch (error){ 
//         console.log(error)
//         throw error
//     }

// })()
