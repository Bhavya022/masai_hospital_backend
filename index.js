
const express = require('express') 
const mongoose = require('mongoose') 
const bodyParser = require('body-parser')  
const cors = require('cors') 
const app = express() 
const authRoutes = require('./routes/authRoutes') 
const appointmentRoutes = require('./routes/appointmentRoutes')  
const {connection} = require('./db') 
require('dotenv').config()
app.use(bodyParser.json())  
app.use(cors())
app.use('/api/auth',authRoutes) 
app.use('/api/appointments',appointmentRoutes)
app.listen(process.env.PORT,async()=>{
    try{
        await connection 
        console.log('connected to mongodb,server started')
    } 
    catch(err){
        console.log(err) 
    }
})