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
    password_reset_token : {
        token : String, 
        expiration_date : Date
    }
}); 

User.methods.verify = function()
{
    this.verified = true; 
    this.verify_token = undefined;
    return this.save();
};

User.methods.set_verify_token = function(token, expiration_date)
{
    this.verify_token = {
        token: token,
        expiration_date : expiration_date
    };
    this.verified = false; 
    return this.save();
};

User.methods.set_password_reset_token = function(password_reset_token, expiration_date)
{
    this.password_reset_token = {
        token : password_reset_token, 
        expiration_date : expiration_date
    }; 
    return this.save();
}; 

User.methods.reset_password = function(password)
{
    this.password = password; 
    this.password_reset_token = undefined;
    return this.save();
};

User.methods.set_new_email = function(email)
{
    this.email = email; 
    return this.save();
};

module.exports = mongoose.model('User', User); 