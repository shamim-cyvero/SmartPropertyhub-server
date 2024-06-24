import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import DBconnection from './DataBase/DB.js';
import {v2 as cloudinary} from 'cloudinary';
import cors from 'cors';

const app= express();
dotenv.config({path:'./Config/config.env'});

DBconnection();
          
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.CLOUD_API_KEY, 
  api_secret: process.env.CLOUD_API_SECRET
});


app.use(express.json({limit:'50mb'}));
app.use(express.urlencoded({extended:true,limit:'50mb'}));
app.use(cookieParser());
app.use(cors({
  origin:'*',
  methods:['GET','POST','DELETE','PUT'],
  credentials:true,
  
}))



import adminRoute from './Routes/admin.routes.js';
import postRoute from './Routes/post.routes.js';
import contactRoute from './Routes/contact.routes.js';

app.use('/api/v1/admin',adminRoute);
app.use('/api/v1/post',postRoute);
app.use('/api/v1',contactRoute);




app.listen(process.env.PORT,()=>{
    console.log(`Server is Running on Port : ${process.env.PORT} `);
})