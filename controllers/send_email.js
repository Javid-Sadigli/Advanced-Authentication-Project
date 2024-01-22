const variables = require('../variables'); 
const sendgrid_variables = variables.SendGrid; 

const nodemailer = require('nodemailer');
const sendgrid_transport = require('nodemailer-sendgrid-transport');

const transporter = nodemailer.createTransport(sendgrid_transport({auth : {
    api_key : sendgrid_variables.api_key
}})); 