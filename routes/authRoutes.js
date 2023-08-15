const express = require('express')
const passport = require('passport')
const keys = require("../config/keys")
const User = require('../models/User')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const GitHubStrategy = require('passport-github2').Strategy

const router = express.Router()

passport.serializeUser((user,done)=>{
    console.log(user.id)
    done(null,user.id)
})

passport.deserializeUser( async (id,done)=>{
    const user = await User.findById(id)
    done(null,user)
})

passport.use(new GoogleStrategy({
    clientID : keys.googleClientId,
    clientSecret : keys.goodleClientSecret,
    callbackURL: '/auth/google/callback'
},async (accessToken,refreshToken,profile,done)=>{

    try{
        
        let user = await User.findOne({uid : profile.id})
    
        if(!user){
            user = User.create({uid : profile.id})
        }

        done(null,user)

    }catch(err){
        console.log(err)
    }
  
}))


passport.use(new GitHubStrategy({
    clientID : keys.githubClientId,
    clientSecret : keys.githubClientSecret,
    callbackURL: '/auth/github/callback'
},async (accessToken,refreshToken,profile,done)=>{
    
    try{

        let user = await User.findOne({uid : profile.id})
    
        if(!user){
            user = User.create({uid : profile.id})
        }

        done(null,user)

    }catch(err){
        console.log(err)
    }
}))



//google
router.get('/google',passport.authenticate('google',{
    scope : ['profile', 'email']
}))
router.get('/google/callback',passport.authenticate('google'),(req,res)=>{
    res.redirect('/api/curr_user')
})



//github
router.get('/github',passport.authenticate('github',{
    scope : ['profile', 'email']
}))
router.get('/github/callback',passport.authenticate('github'),(req,res)=>{
    res.redirect('/api/curr_user')
})

module.exports = router