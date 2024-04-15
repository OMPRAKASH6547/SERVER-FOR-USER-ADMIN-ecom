const express=require('express')
const cors= require('cors');
const cookiesParser=require('cookie-parser')

const app=express()

app.use(cors())
app.use(express.json())
app.use(cookiesParser())
//route import
const products=require('./routes/productRoute');
const user=require('./routes/userRoute')
const exp = require('constants');
app.use('/api/v1',products)
app.use('/api/v1',user);

module.exports=app