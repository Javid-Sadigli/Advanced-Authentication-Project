const path = require('path');

module.exports = {
    hostname : "localhost",
    port : 3000, 
    DATABASE_URI : 'mongodb+srv://mycompany:mycompany@cluster0.guuhffm.mongodb.net/myauthproject?retryWrites=true&w=majority', 
    main_dir : path.dirname(require.main.filename),
    SendGrid : {
        api_key : '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', 
        sender : 'javidsadiglimongodbclusters@gmail.com'
    }, 
    GoogleClient : {
        OAuth : {
            client_id : '456821147939-gjf4mm22ifmrcd6n7hgeqgu356g70aoa.apps.googleusercontent.com', 
            client_secret : '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'
        }
    }
};
