const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

// constructor function/model of the user
const userSchema = new mongoose.Schema({  // we need to create the Schema yo get the middleware functionality
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error(`Email is not correct!`);
            }
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 7,
        trim: true,
        validate(value) {
            if(value.toLowerCase().includes('password')){
                throw new Error(`cannot include password in password!`);
            }
        }
    },
    age:{
        type: Number
    }
});
userSchema.pre('save', async function (next) {
    const user = this;                                       // here this gives us access to individual uer that us about to be saved ... so as to apply operations on the user before (pre) it's saved.
    if(user.isModified('password')){                         // user.isModified() will be true when the user is first created and when the password field is updated!
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();                                                   // If we don't call next, it will hang for ever thinking that more operations are to be applied to the user before saving it...
});
const User  = mongoose.model('User', userSchema );

module.exports = User;