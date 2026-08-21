import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './db.js';


dotenv.config();
const app = express();

app.use(cors());

//this work as similar as body-parser
app.use(express.json());

import userRoutes from './routes/userRoutes.js';

import habitRoutes from './routes/habitRoutes.js';

app.get('/',(req,res)=>{
    res.send("E-Commerce Platform");
});

app.use('/user',userRoutes);

app.use('/user',habitRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log("server is running on http://localhost:3000");
})
