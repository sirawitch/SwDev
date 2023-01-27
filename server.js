const express= require('express')
const dotenv=require('dotenv')
const hospitals=require('./routes/hospitals')
dotenv.config({path:'./config/config.env'})
const app=express();
const PORT=process.env.PORT||5000
app.use('/api/v1/hospitals',hospitals);
app.listen(PORT,console.log('Server running in',process.env.NODE_ENV,'mode on port',PORT))