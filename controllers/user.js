module.exports.GET_Home = function(req, res, next)
{
    res.render('home', {page_title : 'Home'});
};
module.exports.GET_Profile = function(req, res, next)
{
    if(!req.logged_in)
    {
        return next();
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