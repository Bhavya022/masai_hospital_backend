
const jwt = require('jsonwebtoken') 

exports.verifyToken =(req,res,next)=>{
    const token = req.headers.authorization;
    if(!token){
        return res.status(401).json({error:'Token not found'})
    } 
    try{
        const decodedToken = jwt.verify(token,'masai_hospital') 
        req.userId = decodedToken.userId;
        next()
    } 
    catch(error){
        return res.status(401).json({error:'Invalid Token'}) 
    }
}