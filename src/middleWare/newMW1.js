const loggedMW= function (req,res,next)
{

next()    
}

module.exports.loggedMW=loggedMW