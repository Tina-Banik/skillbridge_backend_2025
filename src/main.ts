// import express  = require ('express');
// // import dotenv from "dotenv";
// require('dotenv').config();
import express  from 'express';
import { config } from '../types/type';
// import {cookieParser} from "cookie-parser"
const app = express();
app.use(express.urlencoded({extended:true}));
app.use(express.json());
/**cookie parser initialize */
const cookieParser = require("cookie-parser");
app.use(cookieParser());
// Here I declare the user route
const userPath = "/user";
import authRoute from '../routes/user.route';
app.use(`${config.apiUrl}${userPath}`, authRoute); 
app.get('/',(req,res)=>{
   res.send(`<h2 style="color:green;">Welcome to the Training management system</h2>`)
})
app.listen(process.env.PORT,()=>{
    console.log(`The server is listening at port:  ${config.port}`) 
})