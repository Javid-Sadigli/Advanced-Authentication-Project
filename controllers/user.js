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

module.exports.GET_Enter_Password = function(req, res, next)
{
    const verify_reason = req.flash('verify_reason')[0];
    const error_message = req.flash('error')[0]; 
    
    if(verify_reason == 'change_password')
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
    
    if(password == req.user.password)
    {
        req.flash('verified_yourself', true); 
        res.redirect('/change_password');
    }
    else 
    {
        req.flash('verify_reason', 'change_password'); 
        req.flash('error', 'Wrong password!'); 
        res.redirect('/enter_password');
    }
};