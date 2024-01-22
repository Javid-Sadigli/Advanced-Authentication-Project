const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const User = new Schema({
    email : {
        type : String, 
        required : true
    }, 
    username : {
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
    reset_token : {
        required : false, 
        default : undefined, 
        token : String, 
        expiration_date : Date
    }
}); 

module.exports = mongoose.model('User', User); 