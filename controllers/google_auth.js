const variables = require('../variables'); 
const OAuth_variables = variables.GoogleClient.OAuth;

// Models
const User = require('../models/user'); 

// Required modules
const OAuth2Client = require('google-auth-library').OAuth2Client; 

// Defining our Google OAuth client
const client = new OAuth2Client({
    clientId : OAuth_variables.client_id, 
    clientSecret : OAuth_variables.client_secret, 
    redirectUri : `http://${variables.hostname}:${variables.port}/google_auth/callback`
}); 

// GET request to /google_auth
module.exports.GET_Google_Auth = function(req, res, next) 
{
    const auth_url = client.generateAuthUrl({
        access_type : 'offline', 
        scope : ['email', 'profile']
    }); 
    res.redirect(auth_url); 
}; 

// GET request to /google_auth/callback
module.exports.GET_Google_Auth_Callback = function(req, res, next)
{
    // Getting values from request query
    const code = req.query.code; 

    // Variables that will be used
    let payload; 
    
    client.getToken(code).then(function(response)
    {
        // Getting token using code
        return client.verifyIdToken({
            idToken : response.tokens.id_token, 
            audience : OAuth_variables.client_id
        }); 
    }).then(function(ticket)
    {
        // Getting payload from ticket
        payload = ticket.getPayload();
        return User.findOne({email : payload.email}) // Searching for the user by email using the payload
    }).then(function(user)
    {
        if(user && user.verified)
        {
            // If the user exists and is verified, then we log the user in
            req.session.user_id = user._id; 
            res.redirect('/');
        }
        else if(user)
        {
            // If the user exists and is not verified, we redirect to signin page with an error message
            req.flash('error', 'Your account is not verified!');
            res.redirect('/signin');
        }
        else 
        {
            // If the user does not exist, we redirect to signin page with an error message
            req.flash('error', 'Not found user with that email. Please sign up first!');
            res.redirect('/signin');
        }
    }).catch(function(error)
    {
        // If we got an error, we log the error to see it.
        console.log(error);
        next();
    });
}; 

