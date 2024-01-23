const User = require('../models/user');

const email_sender_controller = require('./email_sender');

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

    if(password == confirm_password)
    {
        // User.findOne({email: email}).then(function(user)
        // {
        //     if(!user)
        //     {
        //         return User.insertOne({email: email, password : password}); 
        //     }
        // }).then(function(user)
        // {
            
        // });
        email_sender_controller.SEND_Verify_Token('asdsd', email); 
    }
    else 
    {
        next();
    }
};