require('dotenv').config()
module.exports ={
    connection:{ 
     connectionURL:process.env.mongodbURL || 'mongodb+srv://bhavya:bhavya@cluster0.kin5ecd.mongodb.net/masaihospital?retryWrites=true&w=majority'
    },
    jwt:{
        secretKey:process.env.JWT_SECRET_KEY || 'masai_hospital',
        expiresIn:process.env.JWT_EXPIRES_IN || '1h',
    }
}