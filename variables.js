const path = require('path');

module.exports = {
    hostname : "localhost",
    port : 3000, 
    DATABASE_URI : 'mongodb+srv://mycompany:mycompany@cluster0.guuhffm.mongodb.net/myauthproject?retryWrites=true&w=majority', 
    main_dir : path.dirname(require.main.filename),
    SendGrid : {
        api_key : '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', 
        sender : 'thebestcompany2024@mail.ru'
    }
};