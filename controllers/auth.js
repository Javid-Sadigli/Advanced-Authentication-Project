module.exports.GET_Sign_Up = function(req, res, next)
{
    res.render('signup', {page_title : 'Sign Up'});
};