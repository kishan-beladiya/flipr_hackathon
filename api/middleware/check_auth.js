const jwt = require('jsonwebtoken');


module.exports = (req,res,next)=>{
    try{
        const token = req.headers.authorization.split(' ')[1];
        const verify = jwt.verify(token,"kishan123");
        next();
    }catch(err){
        return res.status(200).json({
            msg:"bad request"
        });
    }
}