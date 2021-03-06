const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    displayName: {
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
        required:true,
        unique:true
    }
});


userSchema.virtual('shopingList', {
    ref: 'ShopingList',
    localField: 'authID',
    foreignField: 'owner'
})

const User = mongoose.model('User', userSchema)

module.exports = User
