const express = require('express')
const mongoose = require('mongoose')
const authRouter = require('./routes/authRoutes')
const { mongoURI } = require('./config/keys')

const app = express()

app.use(express.json())

app.use('/auth',authRouter)

app.get('/', (req,res)=>{
    res.send({messagne : 'hii there'})
})


async function connectAndListen(){
    try{
        await mongoose.connect(mongoURI)
        console.log("Mongo connected")
        app.listen(5000,()=>{console.log("listning...")})
    }
    catch(err){
        console.log(err)
    }
}
    
connectAndListen()
