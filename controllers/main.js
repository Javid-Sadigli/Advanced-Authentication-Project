module.exports.SEND_Error_Page = function(req, res, next) 
{
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>404 Not foun</title>
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Tektur:wght@400;500;600;700;800;900&display=swap');
                body{
                    background-color: black;
                }
                h1{
                    font-family: 'Tektur';
                    color: rgba(189, 189, 189, 0.8);
                    text-align: center;
                }
            </style>
        </head>
        <body>
            <h1>404 NOT FOUND!</h1>
        </body>
        </html>
    `);
};