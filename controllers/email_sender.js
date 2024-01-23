/*

Check that website
https://designmodo.com/postcards/app/

*/

const variables = require('../variables'); 
const sendgrid_variables = variables.SendGrid; 

const nodemailer = require('nodemailer');
const sendgrid_transport = require('nodemailer-sendgrid-transport');

const transporter = nodemailer.createTransport(sendgrid_transport({auth : {
    api_key : sendgrid_variables.api_key
}})); 

module.exports.SEND_Verify_Token = function(verify_token, email)
{
    return transporter.sendMail({
        from : sendgrid_variables.sender, 
        to : email, 
        subject : 'Verify your email', 
        html : ``
    }).catch((err) => {
        console.log(err);
    });
};