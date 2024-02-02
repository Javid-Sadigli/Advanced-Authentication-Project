const crypto = require('crypto');

const User = require('../models/user');

const email_sender_controller = require('./email_sender');

module.exports.GET_Sign_Up = function(req, res, next)
{
    if(req.logged_in)
    {
        return next();
    }
    res.render('signup', {
        page_title : 'Sign Up',
        error_message : req.flash('error')[0]
    });
};
module.exports.GET_Sign_In = function(req, res, next)
{
    if(req.logged_in)
    {
        return next();
    }
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
                    req.flash('verify_email', email);
                    res.redirect('/verify_info');
                    return email_sender_controller.SEND_Verify_Token(verify_token, email); 
                }
            }).catch(function(error)
            {
                console.log(error);
                next();
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
    const verify_email = req.flash('verify_email')[0]; 
    if(!verify_email)
    {
        return next();
    }
    res.render('verify_info', {
        page_title : 'Info',
        verify_email : verify_email
    });
};
module.exports.GET_Verified_Info = function(req, res, next)
{
    const verified = req.flash('verified')[0];
    if(!verified)
    {
        return next();
    }
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
            return user.verify();
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
            req.flash('verified', true);
            res.redirect('/verified_info');
        }
    }).catch(function(error)
    {
        console.log(error);
        next();
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
            next();
        });
    }
};
module.exports.GET_Password_Reset_Form = function(req, res, next)
{
    if(req.logged_in)
    {
        let password_reset_token = crypto.randomBytes(32).toString('hex');; 
        req.user.set_password_reset_token(
            password_reset_token, 
            Date.now() + 3600000
        ).then(function(user)
        {
            req.flash('password_reset_email', user.email); 
            res.redirect('/password_reset_info'); 
            email_sender_controller.SEND_Password_Reset_Token(password_reset_token, user.email);
        }).catch(function(error)
        {
            console.log(error);
            next();
        });
    }
    else
    {
        res.render('password_reset_form', {
            page_title : 'Reset your password',
            error_message : req.flash('error')[0]
        });
    }
}; 
module.exports.POST_Password_Reset_Form = function(req, res, next)
{
    let response_sent = false, password_reset_token;
    const email = req.body.email;
    
    if(!email)
    {
        req.flash('error', 'Email is required!');
        return res.redirect('/password_reset_form');
    }
    
    User.findOne({
        email : email
    }).then(function(user)
    {
        if(user && user.verified)
        {
            password_reset_token = crypto.randomBytes(32).toString('hex');
            return user.set_password_reset_token(
                password_reset_token, 
                Date.now() + 3600000
            );
        }
        else
        {
            req.flash('error', "Can't find user with this email. Please sign up or verify your account.");
            response_sent = true; 
            res.redirect('/password_reset_form');
        }
    }).then(function(user)
    {
        if(!response_sent)
        {
            response_sent = true; 
            req.flash('password_reset_email', email); 
            res.redirect('/password_reset_info'); 
            email_sender_controller.SEND_Password_Reset_Token(password_reset_token, email);
        }
    }).catch(function(error)
    {
        console.log(error);
        next();
    });
};
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
    next();
};
module.exports.GET_Password_Reset_Token = function(req, res, next)
{
    const password_reset_token = req.params.password_reset_token; 
    
    User.findOne({
        'password_reset_token.token' : password_reset_token, 
        'password_reset_token.expiration_date' : {$gt : Date.now()}
    }).then(function(user)
    {
        if(user)
        {
            req.flash('user_id', user._id); 
            res.redirect('/password_reset');
        }
        else 
        {
            next();
        }
    }).catch(function(error)
    {
        console.log(error);
        next();
    }); 
};

module.exports.GET_Password_Reset = function(req, res, next)
{
    const user_id = req.flash('user_id')[0];
    const error_message = req.flash('error')[0]; 

    if(!user_id) 
    {
        return next(); 
    }
    User.findById(user_id).then(function(user)
    {
        if(user)
        {
            res.render('password_reset', {
                page_title : 'Reset password', 
                user_id : user_id, 
                error_message : error_message
            }); 
        }
        else 
        {
            next(); 
        }
    }).catch(function(error)
    {
        console.log(error);
        next();
    });
};

module.exports.POST_Password_Reset = function(req, res, next)
{
    const password = req.body.password;
    const confirm_password = req.body.confirm_password;
    const user_id = req.body.user_id;
    let response_sent = false; 

    if(password != confirm_password) 
    {
        req.flash('user_id', user_id); 
        req.flash('error', 'Your passwords do not match!'); 
        return res.redirect('/password_reset'); 
    }

    User.findById(user_id).then(function(user)
    {
        if(user)
        {
            return user.reset_password(password); 
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
            req.flash('password_resetted', true); 
            res.redirect('/password_resetted_info'); 
        }
    }).catch(function(error)
    {
        console.log(error);
        next();
    }); 
}; 

module.exports.GET_Password_Resetted_Info = function(req, res, next)
{
    if(req.flash('password_resetted')[0])
    {
        return res.render('password_resetted_info', {page_title : 'Info'}); 
    }
    next();
};