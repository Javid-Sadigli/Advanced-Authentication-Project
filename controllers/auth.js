const crypto = require('crypto');

const User = require('../models/user');

const email_sender_controller = require('./email_sender');

// GET request to /signup
module.exports.GET_Sign_Up = function(req, res, next)
{
    // If user has logged in, then he will not be able to access to the signup page. 
    if(req.logged_in)
    {
        return next();
    }
    // Otherwise, we render the signup page
    res.render('signup', {
        page_title : 'Sign Up',
        error_message : req.flash('error')[0]
    });
};

// GET request to /signin
module.exports.GET_Sign_In = function(req, res, next)
{
    // If user has logged in, then he will not be able to access to the signin page. 
    if(req.logged_in)
    {
        return next();
    }
    // Otherwise, we render the signin page
    res.render('signin', {
        page_title : 'Sign In',
        error_message : req.flash('error')[0]
    });
};

// POST request to /signup
module.exports.POST_Sign_Up = function(req, res, next)
{
    // Getting values from the request body
    const email = req.body.email; 
    const password = req.body.password;
    const confirm_password = req.body.confirm_password;

    // Variables that will be used
    let verify_token, response_sent = false; 

    if(!email)
    {
        // If email is empty, then we redirect to the signup page with error message. 
        req.flash('error', 'Email is required!');
        return res.redirect('/signup');
    }
    else if (email.indexOf('@') == - 1)
    {
        // If email is not valid, then we redirect to the signup page with error message.
        req.flash('error', 'Please enter a valid email address!');
        return res.redirect('/signup');
    }
    else if(!password || !confirm_password)
    {
        // If one of the passwords is empty, then we redirect to the signup page with error message.
        req.flash('error', 'Password is required!');
        return res.redirect('/signup');
    }
    else 
    {
        if(password == confirm_password) // Check if passwords matches.
        {
            // Find the user with the given email.
            User.findOne({email: email}).then(function(user)
            {
                if(!user)
                {
                    // Create a new user with new verify token. 
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
                    // If user with the given email already exists, then we redirect to the signup page with error message.
                    response_sent = true; 
                    req.flash('error', 'We have user with this email. Please use another email.');
                    res.redirect('/signup');
                }
            }).then(function(user)
            {
                if(!response_sent)
                { 
                    // If we didn't send a response yet, we inform the user to verify his email. 
                    req.flash('verify_email', email);
                    res.redirect('/verify_info');

                    // We send a verification email to user's email address.
                    return email_sender_controller.SEND_Verify_Token(verify_token, email); 
                }
            }).catch(function(error)
            {
                // If we got an error, we log the error to see it. 
                console.log(error);
                next();
            });
        }
        else 
        {
            // If passwords do not match, then we redirect to the signup page with error message. 
            req.flash('error', 'Your passwords do not match!');
            res.redirect('/signup');
        }
    }
};

// GET request to /verify_info
module.exports.GET_Verify_Info = function(req, res, next)
{
    // If the request doesn't come from /signup, then the user will get 404 not found error.
    const verify_email = req.flash('verify_email')[0]; 
    if(!verify_email)
    {
        return next();
    }

    // Otherwise we render the page. 
    res.render('verify_info', {
        page_title : 'Info',
        verify_email : verify_email
    });
};

// GET request to /verified_info
module.exports.GET_Verified_Info = function(req, res, next)
{
    // If request doesn't come from /verify_token, the user will get 404 not found error.
    const verified = req.flash('verified')[0];
    if(!verified)
    {
        return next();
    }

    // Otherwise we render the page.
    res.render('verified_info', {page_title : 'Info'});
};

// GET request to /verify_token
module.exports.GET_Verify_Token = function(req, res, next)
{
    // Needed variables 
    let response_sent = false; 
    const verify_token = req.params.verify_token; 
    
    // Search for a user that has the given verify token, and it has not expired. 
    User.findOne({
        'verify_token.token' : verify_token,
        'verify_token.expiration_date' : {$gt : Date.now()}, 
        verified : false
    }).then(function(user)
    {
        if(user)
        {
            // If the user exists, then we verify it. 
            return user.verify();
        }
        else
        {
            // If the user doesn't exist, the user will get an 404 not found error.
            response_sent = true; 
            next();
        }
    }).then(function(user)
    {
        if(!response_sent) 
        {
            // If we didn't send a response yet, then we inform the user that his account has been verified.
            req.flash('verified', true);
            res.redirect('/verified_info');
        }
    }).catch(function(error)
    {
        // If we got an error, we log the error to see it.
        console.log(error);
        next();
    });
};

// POST request to /signin
module.exports.POST_Sign_In = function(req, res, next)
{
    // Getting values from the request body
    const email = req.body.email; 
    const password = req.body.password;

    // Variables that will be used
    let response_sent = false;

    if(!email)
    {
        // If email is empty, then we redirect to the signin page with an error message. 
        req.flash('error', 'Email is required!');
        return res.redirect('/signin');
    }
    else if(!password)
    {
        // If password is empty, then we redirect to the signin page with an error message.
        req.flash('error', 'Password is required!');
        return res.redirect('/signin');
    }
    else
    {
        // Search for a user that has the given email and password.
        User.findOne({
            email : email, 
            password : password
        }).then(function(user)
        {
            if(user && user.verified)
            {
                // If the user exists and is verified, then we log the user in.
                req.session.user_id = user._id;
                res.redirect('/'); 
            }
            else if(user)
            {
                // If the user exists and is not verified, then we redirect to the signin page with an error message.
                req.flash('error', 'Your account is not verified!');
                res.redirect('/signin');
            }
            else 
            {
                // If the user doesn't exist, then we redirect to the signin page with an error message.
                req.flash('error', 'Invalid email or password!');
                res.redirect('/signin');
            }
        }).catch(function(error)
        {
            // If we got an error, we log the error to see it.
            console.log(error);
            next();
        });
    }
};

// GET request to /password_reset_form
module.exports.GET_Password_Reset_Form = function(req, res, next)
{
    if(req.logged_in) // Check if the user is logged in
    {
        // We set a new password reset token for this user.
        let password_reset_token = crypto.randomBytes(32).toString('hex');; 
        req.user.set_password_reset_token(
            password_reset_token, 
            Date.now() + 3600000
        ).then(function(user)
        {
            // Then we inform the user to reset his password
            req.flash('password_reset_email', user.email); 
            res.redirect('/password_reset_info'); 

            // And we send the password reset email to the user's email address
            email_sender_controller.SEND_Password_Reset_Token(password_reset_token, user.email);
        }).catch(function(error)
        {
            // If we got an error, we log the error to see it.
            console.log(error);
            next();
        });
    }
    else
    {
        // If the user is not logged in, we render the password reset form to let the user enter his email
        res.render('password_reset_form', {
            page_title : 'Reset your password',
            error_message : req.flash('error')[0]
        });
    }
}; 

// POST request to /password_reset_form
module.exports.POST_Password_Reset_Form = function(req, res, next)
{
    // Variables will be used
    let response_sent = false, password_reset_token;
    
    // Getting values from the request body
    const email = req.body.email;
    
    if(!email)
    { 
        // If email is empty, we redirect to the password reset form page with an error message.
        req.flash('error', 'Email is required!');
        return res.redirect('/password_reset_form');
    }
    
    // Search for a user that has the given email.
    User.findOne({
        email : email
    }).then(function(user)
    {
        if(user && user.verified)
        {
            // If the user exists and is verified, then we set a new password reset token for this user.
            password_reset_token = crypto.randomBytes(32).toString('hex');
            return user.set_password_reset_token(
                password_reset_token, 
                Date.now() + 3600000
            );
        }
        else
        {
            // If the user doesn't exist, we redirect to the password reset form page with an error message. 
            req.flash('error', "Can't find user with this email. Please sign up or verify your account.");
            response_sent = true; 
            res.redirect('/password_reset_form');
        }
    }).then(function(user)
    {
        if(!response_sent)
        {
            // If we haven't sent a response yet, we inform the user to reset his password
            response_sent = true; 
            req.flash('password_reset_email', email); 
            res.redirect('/password_reset_info'); 

            // And we send the password reset email to the user's email address
            email_sender_controller.SEND_Password_Reset_Token(password_reset_token, email);
        }
    }).catch(function(error)
    {
        // If we got an error, we log the error to see it.
        console.log(error);
        next();
    });
};

// GET request to /password_reset_info
module.exports.GET_Password_Reset_Info = function(req, res, next) 
{
    const password_reset_email = req.flash('password_reset_email')[0]; 
    if(password_reset_email)
    {
        return res.render('password_reset_info', {
            page_title : 'Info', 
            password_reset_email : password_reset_email
        });
    }

    // If the password_reset_email is undefined, then the user will get 404 not found error.
    next();
};

// GET request to /password_reset_token 
module.exports.GET_Password_Reset_Token = function(req, res, next)
{
    // Getting the values from the request parameters
    const password_reset_token = req.params.password_reset_token; 
    
    // Search for the user that has the given password reset token and not expired.
    User.findOne({
        'password_reset_token.token' : password_reset_token, 
        'password_reset_token.expiration_date' : {$gt : Date.now()}
    }).then(function(user)
    {
        if(user)
        {
            // If we found the user, then we redirect to password reset page.
            req.flash('user_id', user._id); 
            res.redirect('/password_reset');
        }
        else 
        {
            // Otherwise, the user will get a 404 not found error.
            next();
        }
    }).catch(function(error)
    {
        // If we got an error, we log the error to see it.
        console.log(error);
        next();
    }); 
};

// GET request to /password_reset
module.exports.GET_Password_Reset = function(req, res, next)
{
    // Getting values from flash 
    const user_id = req.flash('user_id')[0];
    const error_message = req.flash('error')[0]; 

    if(!user_id) 
    {
        // If the user_id is undefined, the user will get a 404 not found error
        return next(); 
    }

    // We search for the user by his id
    User.findById(user_id).then(function(user)
    {
        if(user)
        {
            // If the user has found, we render the password reset page to let the user enter his new password. 
            res.render('password_reset', {
                page_title : 'Reset password', 
                user_id : user_id, 
                error_message : error_message
            }); 
        }
        else 
        {
            // Otherwise, the user will get a 404 not found error
            next(); 
        }
    }).catch(function(error)
    {
        // If we got an error, we log the error to see it.
        console.log(error);
        next();
    });
};

// POST request to /password_reset
module.exports.POST_Password_Reset = function(req, res, next)
{
    // Getting values from the request body and declaring variables that will be used
    const password = req.body.password;
    const confirm_password = req.body.confirm_password;
    const user_id = req.body.user_id;
    let response_sent = false; 

    if(password != confirm_password) 
    {
        // If passwords doesn't match, we redirect to the password reset page with an error message
        req.flash('user_id', user_id); 
        req.flash('error', 'Your passwords do not match!'); 
        return res.redirect('/password_reset'); 
    }

    // We search for the user by his id.
    User.findById(user_id).then(function(user)
    {
        if(user)
        {
            // If the user exists, we reset his password.
            return user.reset_password(password); 
        }
        else 
        {
            // Otherwise, the user will get an 404 not found error.
            response_sent = true; 
            next();
        }
    }).then(function(user)
    {
        if(!response_sent)
        {
            // If we didn't send a response yet, we inform the user that his password has been resetted.
            req.flash('password_resetted', true); 
            res.redirect('/password_resetted_info'); 
        }
    }).catch(function(error)
    {
        // If we got an error, we log the error to see it.
        console.log(error);
        next();
    }); 
}; 

// GET request to /password_resetted_info
module.exports.GET_Password_Resetted_Info = function(req, res, next)
{
    if(req.flash('password_resetted')[0])
    {
        // If the request came from /password_reset, we render the required page.
        return res.render('password_resetted_info', {page_title : 'Info'}); 
    }
    next(); // Otherwise, the user will get a 404 not found error
};