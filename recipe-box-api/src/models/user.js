const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    authID:{
        type: String,
        required:true
    }
});

userSchema.virtual('recipes', {
    ref: 'Recipe',
    localField: 'authID',
    foreignField: 'owner'
})

const User = mongoose.model('User', userSchema)

module.exports = User
