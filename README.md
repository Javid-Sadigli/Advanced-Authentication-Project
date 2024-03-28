# Advanced Authentication Project 
This project implements an advanced session based authentication system using NodeJS and ExpressJS framework. It provides advanced authentication features including sign in, sign up, sign in with Google, email verification, email and password resetting, CSRF protection and so on. 

## Table of Contents

## Installation 
To install and start the project, you should go through the following steps : 
#### Step 1 : Clone the repository 
At first you need to clone this repository by typing the following command in your terminal : 
``` 
git clone https://github.com/Javid-Sadigli/Advanced-Authentication-Project.git
cd Advanced-Authentication-Project
```
#### Step 2 : Install the dependencies
After cloning the project, you need to install its dependencies by typing the following command in your terminal : 
```
npm install
```
#### Step 3 : Set up the variables
In the main project directory, find the variables.js file and open it. You should make some changes in this file. Find the following lines in the variables.js file : 
```
SendGrid : {
    api_key : 'YOUR_SENDGRID_API_KEY', 
    sender : 'YOUR_SENDGRID_SENDER'
}, 
```
Here you should put API key, and sender email of your SendGrid account (For that, you should create a new API key, and do a sender authentication in SendGrid).<br>

After setting up the SendGrid variables, you should also configure the Google OAuth variables. Find the following lines in the variables.js file : 
```
GoogleClient : {
    OAuth : {
        client_id : 'YOUR_GOOGLE_OAUTH_CLIENT_ID', 
        client_secret : 'YOUR_GOOGLE_OAUTH_CLIENT_SECRET'
    }
}
```
Here you should put your client id and client secret of your OAuth client (For that, you should create a new Google OAuth client in the <a href="https://console.cloud.google.com/cloud-resource-manager">Google Developer Console</a>)

