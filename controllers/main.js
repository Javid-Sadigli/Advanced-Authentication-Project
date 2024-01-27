const User = require('../models/user');

module.exports.SEND_Error_Page = function(req, res, next) 
{
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="shortcut icon" href="/assets/icons/favicon.ico">
            <title>404 Not found</title>
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Tektur:wght@400;500;600;700;800;900&display=swap');
                body{
                    background-color: black;
                }
                h1{
                    font-family: 'Tektur';
                    color: rgba(189, 189, 189, 0.8);
                    text-align: center;
                }
            </style>
        </head>
        <body>
            <h1>404 NOT FOUND!</h1>
        </body>
        </html>
    `);
};

module.exports.SET_Request_User = function(req, res, next)
{
    if(req.session.user_id)
    {
        User.findById(req.session.user_id).then(function(user)
        {
            if(user)
            {
                req.logged_in = true;
                req.user = user;
            }
        }).then(function()
        {
            next();
        }).catch(function(error)
        {
            console.log(error);
        });
    }
    else
    {
        next();
    }
};
module.exports.SET_Local_Variables = function(req, res, next)
{
    res.locals.logged_in = req.logged_in; 
    res.locals.user = req.user;
    res.locals.csrf_token = req.csrfToken();
    next();
};