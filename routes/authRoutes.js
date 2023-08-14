const express = require('express')
const passport = require('passport')
const keys = require("../config/keys")
const User = require('../models/User')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const GitHubStrategy = require('passport-github2').Strategy

const router = express.Router()

passport.serializeUser((user,done)=>(
    done(null,user.uid)
))

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

    }
  
}))


passport.use(new GitHubStrategy({
    clientID : keys.githubClientId,
    clientSecret : keys.githubClientSecret,
    callbackURL: '/auth/github/callback'
},(accessToken,refreshToken,profile,done)=>{

}))



//google
router.get('/google',passport.authenticate('google',{
    scope : ['profile', 'email']
}))
router.get('/google/callback',passport.authenticate('google',{
    scope : ['profile', 'email']
}))



//github
router.get('/github',passport.authenticate('github',{
    scope : ['profile', 'email']
}))
router.get('/github/callback',passport.authenticate('github',{
    scope : ['profile', 'email']
}))

module.exports = router