
const User = require('../models/User') 
const bcrypt = require('bcrypt') 
const jwt=require('jsonwebtoken') 

exports.signup=async(req,res)=>{
    try{
  const {email,password}=req.body 
  const hashedPassword = await bcrypt.hash(password,10) 
  const user = new User({email,password:hashedPassword}) 
  await user.save() 
  res.status(201).json({message:'signup successfully'})
    } 
    catch(err){
        res.status(500).json({err:'err in signing up'})
    }
} 

exports.login=async(req,res)=>{
    try{
        const {email,password}=req.body 
        const user = await User.findOne({email}) 
        if(!user){
            return res.status(401).json({error:'User Not Found'})
        } 
        const ispassword =await bcrypt.compare(password,user.password) 
        if(!ispassword){
            return res.status(401).json({error:'Password not match'})
        }  
        const token = jwt.sign({userId:user._id},'masai_hospital',{expiresIn:'1h'}) 
        res.status(200).json({message:'Login Successfully',token}) 
    } 
    catch(err){
        res.status(500).json({err:'err in login'})
    }
}