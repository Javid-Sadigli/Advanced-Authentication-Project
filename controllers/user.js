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
    req.session.destroy(function(err)
    {
        if(err)
        {
            console.log(err);
        }
        res.redirect('/');
    });
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