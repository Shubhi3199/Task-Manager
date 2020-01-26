const mongoose = require('mongoose');
const validator = require('validator');

// constructor function/model of the user

const User  = mongoose.model('User', {
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

module.exports = User;