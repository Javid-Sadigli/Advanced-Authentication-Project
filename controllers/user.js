module.exports.GET_Home = function(req, res, next)
{
    res.render('home', {page_title : 'Home'});
}; 