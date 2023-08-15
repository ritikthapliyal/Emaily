const express = require('express')
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')
const authRouter = require('./routes/authRoutes')
const { mongoURI, cookieKey } = require('./config/keys')
const passport = require('passport')

const app = express()

app.use(express.json())
app.use(cookieSession({
    maxAge: 60 * 1000,
    keys: [cookieKey]
}))
app.use(passport.initialize())
app.use(passport.session())

app.use('/auth',authRouter)


app.get('/api/curr_user', (req,res)=>{
    res.send({message : req.user})
})

app.get('/', (req,res)=>{
    res.send({message : 'hii there'})
})

app.get('/api/logout', (req,res)=>{
    req.logout()
    res.send({message : 'logged out'})
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
