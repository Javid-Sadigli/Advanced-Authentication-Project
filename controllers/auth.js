const crypto = require('crypto');

const User = require('../models/user');

const email_sender_controller = require('./email_sender');
const { response } = require('express');

module.exports.GET_Sign_Up = function(req, res, next)
{
    res.render('signup', {page_title : 'Sign Up'});
};
module.exports.GET_Sign_In = function(req, res, next)
{
    res.render('signin', {page_title : 'Sign In'});
};
module.exports.POST_Sign_Up = function(req, res, next)
{
    const email = req.body.email; 
    const password = req.body.password;
    const confirm_password = req.body.confirm_password;
    let verify_token, response_sent = false; 

    if(password == confirm_password)
    {
        User.findOne({email: email}).then(function(user)
        {
            if(!user)
            {
                verify_token = crypto.randomBytes(32).toString('hex');
                const new_user = new User({
                    email : email, 
                    password : password, 
                    verify_token : {
                        token : verify_token, 
                        expiration_date : Date.now() + 3600000
                    }
                }); 
                return new_user.save();
            }
        }).then(function(user)
        {
            res.redirect('/verify_info');
            return email_sender_controller.SEND_Verify_Token(verify_token, email); 
        }).catch(function(error)
        {
            console.log(error);
        });
    }
    else 
    {
        next();
    }
};
module.exports.GET_Verify_Info = function(req, res, next)
{
    res.render('verify_info', {page_title : 'Info'});
};
module.exports.GET_Verified_Info = function(req, res, next)
{
    res.render('verified_info', {page_title : 'Info'});
};
module.exports.GET_Verify_Token = function(req, res, next)
{
    const verify_token = req.params.verify_token; 
    User.findOne({
        'verify_token.token' : verify_token,
        'verify_token.expiration_date' : {$gt : Date.now()}, 
        verified : false
    }).then(function(user)
    {
        user.verify_token = undefined;
        user.verified = true; 
        return user.save();
    }).then(function(user)
    {
        res.redirect('/verified_info');
    }).catch(function(error)
    {
        console.log(error);
    });
};