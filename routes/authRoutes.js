const express = require('express')
const passport = require('passport')
const keys = require("../config/keys")
const GoogleStrategy = require('passport-google-oauth20').Strategy
const GitHubStrategy = require('passport-github2').Strategy

const router = express.Router()

passport.use(new GoogleStrategy({
    clientID : keys.googleClientId,
    clientSecret : keys.goodleClientSecret,
    callbackURL: '/auth/google/callback'
},(accessToken,refreshToken,profile,done)=>{
    console.log("accessToken : ",accessToken)
    console.log("refreshToken : ",refreshToken)
    console.log("profile : ",profile)
    console.log("done : ",done)
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