const path = require('path');

module.exports = {
    hostname : "localhost", // If you want, you can change
    port : 3000,  // If you want, you can change
    DATABASE_URI : 'YOUR_DATABASE_URI', 
    main_dir : path.dirname(require.main.filename),
    SendGrid : {
        api_key : 'YOUR_SENDGRID_API_KEY', 
        sender : 'YOUR_SENDGRID_SENDER'
    }, 
    GoogleClient : {
        OAuth : {
            client_id : 'YOUR_GOOGLE_OAUTH_CLIENT_ID', 
            client_secret : 'YOUR_GOOGLE_OAUTH_CLIENT_SECRET'
        }
    }
};
