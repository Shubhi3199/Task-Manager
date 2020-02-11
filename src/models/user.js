const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
        },
        unique: true
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
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
});
userSchema.pre('save', async function (next) {
    const user = this;                                       // here this gives us access to individual user that is about to be saved ... so as to apply operations on the user before (pre) it's saved.
    if(user.isModified('password')){                         // user.isModified() will be true when the user is first created and when the password field is updated!
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();                                                   // If we don't call next, it will hang for ever thinking that more operations are to be applied to the user before saving it...
});

userSchema.methods.generateAuthToken = async function(){
    const user = this;
    const token = jwt.sign({_id: user._id.toString()}, 'nodejscourse');
    user.tokens = user.tokens.concat({token});
    await user.save();
    return token;
};

userSchema.statics.findByCredentials = async (email, password) =>{
    const user = await User.findOne({email: email});
    if(!user){
        throw new Error(`Unable to login!`);
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        throw new Error(`Unable to login!`);
    }
    return user;
};

const User  = mongoose.model('User', userSchema );

module.exports = User;