// import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import routes from './src/routes/routes.js';
import { configs } from './src/config.js';
const app = express();
app.use(express.json())
// dotenv.config();

// db connection 
mongoose.connect(configs.db_url,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then((console.log('successfull'))).catch((err)=>{console.log(err)})

app.use('/users', routes);

app.listen(configs.port , () =>{
    console.log('connected to port ', configs.port);
})