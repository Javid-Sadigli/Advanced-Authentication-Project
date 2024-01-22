module.exports.GET_Sign_Up = function(req, res, next)
{
    res.render('signup', {page_title : 'Sign Up'});
};
module.exports.GET_Sign_In = function(req, res, next)
{
    res.render('signin', {page_title : 'Sign In'});
};

// salam eleykum