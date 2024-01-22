const variables = require('./variables');

// Modules
const express = require('express');
const mongoose = require('mongoose');
const body_parser = require('body-parser');
const path = require('path');
const session = require('express-session');
const mongoddb_session_store = require('connect-mongodb-session')(session);

// Controllers 
const console_controller = require('./controllers/console');
const main_controller = require('./controllers/main');

// Routes 
const user_router = require('./routes/user');
const auth_router = require('./routes/auth');

const app = express(); 
const store = new mongoddb_session_store({
    uri : variables.DATABASE_URI, 
    collection :'sessions'
});

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(body_parser.urlencoded({extended : false})); 
app.use(express.static(path.join(variables.main_dir, 'public')));
app.use(session({
    secret : 'advanced-authentication-project', 
    resave : false, 
    saveUninitialized : false, 
    store : store
})); 

/* Start handling */
app.use(console_controller.LOG_Request);

app.use(auth_router);
app.use(user_router);

app.use(console_controller.LOG_Not_Found);
/* End handling */ 

// Connect to database and start server
mongoose.connect(variables.DATABASE_URI).then(function(result)
{
    app.listen(variables.port, variables.hostname, function()
    {
        console.log(`\n\nServer succesfully started at http://${variables.hostname}:${variables.port}/\n`);
    });
}).catch(function(error)
{
    console.log(error);
});