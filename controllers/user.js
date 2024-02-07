const crypto = require('crypto');

const email_sender_controller = require('./email_sender');

const User = require('../models/user');

module.exports.GET_Home = function(req, res, next)
{
    res.render('home', {page_title : 'Home'});
};
module.exports.GET_Profile = function(req, res, next)
{
    if(!req.logged_in)
    {
        return res.redirect('/signin');
    }
    res.render('profile', {page_title : 'Profile'});
}; 
module.exports.GET_Log_Out = function(req, res, next)
{
    if(!req.logged_in)
    {
        return next();
    }
    req.session.user_id = undefined;
    res.redirect('/');
};

module.exports.GET_Change_Password = function(req, res, next)
{
    if(!req.logged_in)
    {
        return next();
    }

    const verified_yourself = req.flash('verified_yourself')[0]; 

    if(verified_yourself)
    {
        req.flash('user_id', req.user._id); 
        res.redirect('/password_reset');
    }
    else 
    {
        req.flash('verify_reason', 'change_password'); 
        res.redirect('/enter_password');
    }
}; 

module.exports.GET_Change_Email = function(req, res, next) 
{
    if(!req.logged_in)
    {
        return next();
    }

    const verified_yourself = req.flash('verified_yourself')[0]; 

    if(verified_yourself)
    {
        req.flash('email_reset', true); 
        res.redirect('/email_reset'); 
    }
    else 
    {
        req.flash('verify_reason', 'change_email'); 
        res.redirect('/enter_password');
    }
};

module.exports.GET_Enter_Password = function(req, res, next)
{
    const verify_reason = req.flash('verify_reason')[0];
    const error_message = req.flash('error')[0]; 
    
    if(verify_reason)
    {
        return res.render('enter_password', {
            page_title : 'Verify yourself', 
            error_message : error_message, 
            verify_reason : verify_reason
        }); 
    }
    next();
}; 

module.exports.POST_Enter_Password = function(req, res, next)
{
    const password = req.body.password;
    const verify_reason = req.body.verify_reason;
    
    if(password == req.user.password)
    {
        req.flash('verified_yourself', true); 
        if(verify_reason == 'change_password')
        {
            res.redirect('/change_password');
        }
        else if (verify_reason == 'change_email')
        {
            res.redirect('/change_email');
        }
        else 
        {
            next();
        }
    }
    else 
    {
        req.flash('verify_reason', verify_reason); 
        req.flash('error', 'Wrong password!'); 
        res.redirect('/enter_password');
    }
};

module.exports.GET_Email_Reset = function(req, res, next) 
{
    const email_reset = req.flash('email_reset')[0];
    const error_message = req.flash('error')[0];

    if(!req.logged_in || !email_reset) 
    {
        return next();
    }
    
    return res.render('email_reset', {
        page_title : 'Reset email', 
        error_message : error_message
    }); 
};

module.exports.POST_Email_Reset = function(req, res, next)
{
    const email = req.body.email;
    let verify_token, response_sent = false; 

    if(email.indexOf('@') == -1)
    {
        req.flash('email_reset', true); 
        req.flash('error', 'Please enter a valid email address!'); 
        return res.redirect('/email_reset');
    }

    if(email == req.user.email)
    {
        req.flash('email_reset', true); 
        req.flash('error', 'This email is your current email. Please enter another email!'); 
        return res.redirect('/email_reset');
    }
    
    User.findOne({
        email : email
    }).then(function(user)
    {
        if(user)
        {
            req.flash('email_reset', true); 
            req.flash('error', 'We have a user with that email. Please enter another email!'); 
            response_sent = true; 
            res.redirect('/email_reset');
        }
        else 
        {
            verify_token = crypto.randomBytes(32).toString('hex');
            return req.user.set_new_email(email); 
        }
    }).then(function(user)
    {
        if(verify_token)
        {
            return user.set_verify_token(
                verify_token, 
                Date.now() + 3600000
            ); 
        }
    }).then(function(user)
    {   
        if(!response_sent)
        {
            req.session.user_id = undefined;
            req.flash('verify_email', email); 
            res.redirect('/verify_info');
            email_sender_controller.SEND_Verify_Token(
                verify_token, email
            ); 
        }
    }).catch(function(error)
    {
        console.log(error);
        next();
    });
};