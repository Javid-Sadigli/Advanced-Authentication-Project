// Required modules
const crypto = require('crypto');

// Controllers
const email_sender_controller = require('./email_sender');

// Models
const User = require('../models/user');

// GET request to /
module.exports.GET_Home = function(req, res, next)
{
    res.render('home', {page_title : 'Home'});
};

// GET request to /profile
module.exports.GET_Profile = function(req, res, next)
{
    if(!req.logged_in)
    {
        // If the user is not logged in, we redirect to the signin page 
        return res.redirect('/signin');
    }
    // Otherwise we render the profile page
    res.render('profile', {page_title : 'Profile'});
}; 

// GET request to /logout
module.exports.GET_Log_Out = function(req, res, next)
{
    if(!req.logged_in)
    {
        // If the user is not logged in, he will get a 404 not found error
        return next();
    }

    // Otherwise, we log the user out and we redirect back to the home page
    req.session.user_id = undefined;
    res.redirect('/');
};

// GET request to /change_password
module.exports.GET_Change_Password = function(req, res, next)
{
    if(!req.logged_in)
    {
        // If the user is not logged in, he will get a 404 not found error
        return next();
    }
    const verified_yourself = req.flash('verified_yourself')[0]; 

    if(verified_yourself)
    {
        // If the user has verified himself by entering his password, we redirect to the password reset page
        req.flash('user_id', req.user._id); 
        res.redirect('/password_reset');
    }
    else 
    {
        // Otherwise, we redirect to the enter password page to let the user verify himself
        req.flash('verify_reason', 'change_password'); 
        res.redirect('/enter_password');
    }
}; 

// GET request to /change_email
module.exports.GET_Change_Email = function(req, res, next) 
{
    if(!req.logged_in)
    {
        // If the user is not logged in, he will get a 404 not found error
        return next();
    }

    const verified_yourself = req.flash('verified_yourself')[0]; 

    if(verified_yourself)
    {
        // If the user has verified himself by entering his password, we redirect to the email reset page
        req.flash('email_reset', true); 
        res.redirect('/email_reset'); 
    }
    else 
    {
        // Otherwise, we redirect to the enter password page to let the user verify himself
        req.flash('verify_reason', 'change_email'); 
        res.redirect('/enter_password');
    }
};

// GET request to /enter_password
module.exports.GET_Enter_Password = function(req, res, next)
{
    // Getting variables from flash
    const verify_reason = req.flash('verify_reason')[0];
    const error_message = req.flash('error')[0]; 
    
    if(verify_reason)
    {
        // If there is a verify reason, we render the enter password page with this reason
        return res.render('enter_password', {
            page_title : 'Verify yourself', 
            error_message : error_message, 
            verify_reason : verify_reason
        }); 
    }
    next(); // Otherwise, the user will get a 404 not found error
}; 

// POST request to /enter_password
module.exports.POST_Enter_Password = function(req, res, next)
{
    // Getting values from request body
    const password = req.body.password;
    const verify_reason = req.body.verify_reason;
    
    if(password == req.user.password) // Check if the password is correct
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
            // If there isn't verify reason, the user will get a 404 not found error
            next();
        }
    }
    else 
    {
        // If password is incorrect, we redirect to the enter password page with an error message
        req.flash('verify_reason', verify_reason); 
        req.flash('error', 'Wrong password!'); 
        res.redirect('/enter_password');
    }
};

// GET request to /email_reset
module.exports.GET_Email_Reset = function(req, res, next) 
{
    // Getting variables from flash
    const email_reset = req.flash('email_reset')[0];
    const error_message = req.flash('error')[0];

    if(!req.logged_in || !email_reset) 
    {
        // If the user hasn't logged in, or email_reset is undefined, the user will get a 404 not found error
        return next();
    }
    
    // Otherwise, we render the email reset page
    return res.render('email_reset', {
        page_title : 'Reset email', 
        error_message : error_message
    }); 
};

// POST request to /email_reset
module.exports.POST_Email_Reset = function(req, res, next)
{
    // Getting values from request body
    const email = req.body.email;

    // Variables that will be used
    let verify_token, response_sent = false; 

    if(email.indexOf('@') == -1)
    {
        // If email is invalid, we redirect to the email reset page with an error message 
        req.flash('email_reset', true); 
        req.flash('error', 'Please enter a valid email address!'); 
        return res.redirect('/email_reset');
    }

    if(email == req.user.email)
    {
        // If email is same as current user's email, we redirect to the email reset page with an error message
        req.flash('email_reset', true); 
        req.flash('error', 'This email is your current email. Please enter another email!'); 
        return res.redirect('/email_reset');
    }
    
    // Searching for an user with that email
    User.findOne({
        email : email
    }).then(function(user)
    {
        if(user)
        {
            // If there is an user with that email, we redirect to the email reset page with an error message
            req.flash('email_reset', true); 
            req.flash('error', 'We have a user with that email. Please enter another email!'); 
            response_sent = true; 
            res.redirect('/email_reset');
        }
        else 
        {
            // Otherwise, we create a new verification token for the new email
            verify_token = crypto.randomBytes(32).toString('hex');
            return req.user.set_new_email(email); 
        }
    }).then(function(user)
    {
        if(verify_token)
        {
            // Then we set this verify token to this user
            return user.set_verify_token(
                verify_token, 
                Date.now() + 3600000
            ); 
        }
    }).then(function(user)
    {   
        if(!response_sent)
        {
            // If we hasn't sent a response yet, we inform the user to verify his new email 
            req.session.user_id = undefined;
            req.flash('verify_email', email); 
            res.redirect('/verify_info');

            // And we send the verification email to the user's email address
            email_sender_controller.SEND_Verify_Token(
                verify_token, email
            ); 
        }
    }).catch(function(error)
    {
        // If we got an error, we log the error to see it.
        console.log(error);
        next();
    });
};