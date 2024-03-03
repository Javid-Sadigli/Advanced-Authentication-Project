const variables = require('../variables'); 

const User = require('../models/user'); 

const OAuth2Client = require('google-auth-library').OAuth2Client; 

const OAuth_variables = variables.GoogleClient.OAuth;

const client = new OAuth2Client({
    clientId : OAuth_variables.client_id, 
    clientSecret : OAuth_variables.client_secret, 
    redirectUri : `http://${variables.hostname}:${variables.port}/google_auth/callback`
}); 

module.exports.GET_Google_Auth = function(req, res, next) 
{
    const auth_url = client.generateAuthUrl({
        access_type : 'offline', 
        scope : ['email', 'profile']
    }); 
    res.redirect(auth_url); 
}; 

module.exports.GET_Google_Auth_Callback = function(req, res, next)
{
    const code = req.query.code; 
    let payload; 
    
    client.getToken(code).then(function(response)
    {
        return client.verifyIdToken({
            idToken : response.tokens.id_token, 
            audience : OAuth_variables.client_id
        }); 
    }).then(function(ticket)
    {
        payload = ticket.getPayload();
        return User.findOne({email : payload.email})
    }).then(function(user)
    {
        if(user && user.verified)
        {
            req.session.user_id = user._id; 
            res.redirect('/');
        }
        else if(user)
        {
            req.flash('error', 'Your account is not verified!');
            res.redirect('/signin');
        }
        else 
        {
            req.flash('error', 'Not found user with that email. Please sign up first!');
            res.redirect('/signin');
        }
    }).catch(function(error)
    {
        console.log(error);
        next();
    });

}; 

