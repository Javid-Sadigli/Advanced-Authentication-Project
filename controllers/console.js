const Colors = {
    RED : "\u001b[31m",
    GREEN : "\u001b[32m",
    BLUE : "\u001b[34m",
    WHITE : "\u001b[37m"
};

module.exports.LOG_Request = function(req,res,next) 
{
    if(req.url != '/favicon.ico')
    {
        console.log(Colors.WHITE + `${req.method.toUpperCase()} request to ${req.url}`);
        next();
    }   
};

module.exports.LOG_Not_Found = function(req, res, next)  
{
    console.log(Colors.RED + `NOT FOUND ${req.url}`);
    next();
};
