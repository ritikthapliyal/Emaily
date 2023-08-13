const express = require('express')
const authRouter = require('./routes/authRoutes')

const app = express()

app.use(express.json())

app.use('/auth',authRouter)

app.get('/', (req,res)=>{
    res.send({messagne : 'hii there'})
})

app.listen(5000,()=>{
    console.log("listning...")
})

