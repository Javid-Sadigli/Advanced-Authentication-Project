const variables = require('./variables');

// Modules
const express = require('express');
const mongoose = require('mongoose');
const body_parser = require('body-parser');
const path = require('path');

// Controllers 
const console_controller = require('./controllers/console');
const main_controller = require('./controllers/main');

// Routes 

const app = express(); 

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(body_parser.urlencoded({extended : false})); 
app.use(express.static(path.join(variables.main_dir, 'public')));

/* Start handling */
app.use(console_controller.LOG_Request);



app.use(console_controller.LOG_Not_Found);
/* End handling */ 

// Connect to database and start server
mongoose.connect(variables.DATABASE_URI).then(function(result)
{
    app.listen(variables.port, variables.hostname, function()
    {
        console.log(`\n\nServer succesfully started at http://${variables.hostname}:${variables.port}/\n`);
    })
}).catch(function(error)
{
    console.log(error);
});