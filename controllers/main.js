const User = require('../models/user');

// Function for sending error page
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

// Function for setting request user for every request if the user has logged in
module.exports.SET_Request_User = function(req, res, next)
{
    if(req.session.user_id) // Check if user has logged in
    {
        // Searching for the user with the user id taken from the session
        User.findById(req.session.user_id).then(function(user)
        {
            if(user)
            {
                // If the user exists, we set the request user
                req.logged_in = true;
                req.user = user;
            }
        }).then(function()
        {
            // Then we pass this middleware 
            next();
        }).catch(function(error)
        {
            // If we got an error, we log the error to see it.
            console.log(error);
        });
    }
    else
    {
        // If the user has not logged in, then we just pass
        next();
    }
};

// Function for setting some local variables for every response
module.exports.SET_Local_Variables = function(req, res, next)
{
    res.locals.logged_in = req.logged_in; 
    res.locals.user = req.user;
    res.locals.csrf_token = req.csrfToken();
    next();
};