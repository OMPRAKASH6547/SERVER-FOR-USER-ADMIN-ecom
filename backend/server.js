const app=require('./app')
const dotenv=require('dotenv')
const connectionDb=require('./config/database')



dotenv.config({path:"backend/config/config.env"})

connectionDb()

app.listen(process.env.PORT,()=>{
    console.log(`sever is runing on http://localhost:${process.env.PORT}`)
})