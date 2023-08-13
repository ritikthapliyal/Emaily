const express = require('express')
const passport = require('passport')
const keys = require("./config/keys")
const GoogleStrategy = require('passport-google-oauth20').Strategy
const GitHubStrategy = require('passport-github2').Strategy


const app = express()


passport.use(new GoogleStrategy({
    clientID : keys.googleClientId,
    clientSecret : keys.goodleClientSecret,
    callbackURL: '/auth/google/callback'
},(accessToken)=>{
    console.log(accessToken)
}))


passport.use(new GitHubStrategy({
    clientID : keys.githubClientId,
    clientSecret : keys.githubClientSecret,
    callbackURL: '/auth/github/callback'
},(accessToken,refreshToken,profile,done)=>{
    console.log("accessToken : ",accessToken)
    console.log("refreshToken : ",refreshToken)
    console.log("profile : ",profile)
    console.log("done : ",done)
}))


app.get('/', (req,res)=>{
    res.send({messagne : 'hii there'})
})


//google
app.get('/auth/google',passport.authenticate('google',{
    scope : ['profile', 'email']
}))
app.get('/auth/google/callback',passport.authenticate('google',{
    scope : ['profile', 'email']
}))



//github
app.get('/auth/github',passport.authenticate('github',{
    scope : ['profile', 'email']
}))
app.get('/auth/github/callback',passport.authenticate('github',{
    scope : ['profile', 'email']
}))

app.listen(5000,()=>{
    console.log("listning...")
})

