const mongoose = require('mongoose')

const Schema = {
    uid : String,
} 

const userSchema = new mongoose.Schema(Schema)

const User = mongoose.model('User', userSchema)

module.exports = User