const crypto = require('crypto');

const User = require('../models/user');

const email_sender_controller = require('./email_sender');
const { response } = require('express');

module.exports.GET_Sign_Up = function(req, res, next)
{
    res.render('signup', {
        page_title : 'Sign Up',
        error_message : req.flash('error')[0]
    });
};
module.exports.GET_Sign_In = function(req, res, next)
{
    res.render('signin', {
        page_title : 'Sign In',
        error_message : req.flash('error')[0]
    });
};
module.exports.POST_Sign_Up = function(req, res, next)
{
    const email = req.body.email; 
    const password = req.body.password;
    const confirm_password = req.body.confirm_password;
    let verify_token, response_sent = false; 

    if(!email)
    {
        req.flash('error', 'Email is required!');
        return res.redirect('/signup');
    }
    else if(!password || !confirm_password)
    {
        req.flash('error', 'Password is required!');
        return res.redirect('/signup');
    }
    else 
    {
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
                else
                {
                    response_sent = true; 
                    req.flash('error', 'We have user with this email. Please use another email.');
                    res.redirect('/signup');
                }
            }).then(function(user)
            {
                if(!response_sent)
                {
                    res.redirect('/verify_info');
                    return email_sender_controller.SEND_Verify_Token(verify_token, email); 
                }
            }).catch(function(error)
            {
                console.log(error);
            });
        }
        else 
        {
            req.flash('error', 'Your passwords do not match!');
            res.redirect('/signup');
        }
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
    let response_sent = false; 
    const verify_token = req.params.verify_token; 
    User.findOne({
        'verify_token.token' : verify_token,
        'verify_token.expiration_date' : {$gt : Date.now()}, 
        verified : false
    }).then(function(user)
    {
        if(user)
        {
            user.verify_token = undefined;
            user.verified = true; 
            return user.save();
        }
        else
        {
            response_sent = true; 
            next();
        }
    }).then(function(user)
    {
        if(!response_sent) 
        {
            res.redirect('/verified_info');
        }
    }).catch(function(error)
    {
        console.log(error);
    });
};
module.exports.POST_Sign_In = function(req, res, next)
{
    const email = req.body.email; 
    const password = req.body.password;
    let response_sent = false;

    if(!email)
    {
        req.flash('error', 'Email is required!');
        return res.redirect('/signin');
    }
    else if(!password)
    {
        req.flash('error', 'Password is required!');
        return res.redirect('/signin');
    }
    else
    {
        User.findOne({
            email : email, 
            password : password
        }).then(function(user)
        {
            if(user && user.verified)
            {
                req.session.user_id = user._id;
                res.redirect('/'); 
            }
            else if(user)
            {
                req.flash('error', 'Your account is not verified!');
                res.redirect('/signin');
            }
            else 
            {
                req.flash('error', 'Invalid email or password!');
                res.redirect('/signin');
            }
        }).catch(function(error)
        {
            console.log(error);
        });
    }
};