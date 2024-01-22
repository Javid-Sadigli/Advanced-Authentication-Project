const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const User = new Schema({
    email : {
        type : String, 
        required : true
    }, 
    password : { 
        type : String, 
        required : true
    },
    verified : {
        type: Boolean, 
        required : true,
        default : false
    },
    verify_token : {
        token : String, 
        expiration_date : Date
    },
    reset_token : {
        token : String, 
        expiration_date : Date
    }
}); 

module.exports = mongoose.model('User', User); 