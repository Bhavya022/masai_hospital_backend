
const Appointment = require("../models/Appointment") 
exports.createAppointment=async(req,res)=>{
    try{
  const data = req.body  
  console.log(data) 
  const appointment = new Appointment(data) 
  await appointment.save() 
  res.status(201).json({message:'Appointment booked successfully'})  
    } 
    catch(error){  
        console.log(error)
        res.send(error) 
        //res.status(500).json({err})
    }
} 
exports.getAllAppointment=async(req,res)=>{
    try{
 const appointments = await Appointment.find() 
 res.status(200).json(appointments) 
    } 
    catch(err){
        res.status(500).json({err})
    }
} 
exports.updateAppointment=async(req,res)=>{
    try{
 const {id} = req.params 
 const updatedAppointment = req.body 
 const appointment = await Appointment.findByIdAndUpdate(id,updatedAppointment,{new:true}) 
 if(!appointment){
    return res.status(404).json({error:'Appointment not found'})
 }  
 res.status(201).json({message:'Appointment booked successfully',appointment}) 
    } 
    catch(err){
        res.status(500).json({err})
    }
} 
exports.deleteAppointment=async(req,res)=>{
    try{
        const {id} = req.params  
        const appointment = await Appointment.findByIdAndDelete(id) 
        if(!appointment){
           return res.status(404).json({error:'Appointment not found'})
        }  
        res.status(201).json({message:'Appointment deleted successfully',appointment}) 
    } 
    catch(err){
        res.status(500).json({error:'unable to delete appointment'}) 
    }
}