
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
    try {
        let appointments = await Appointment.find().lean(); // Convert query result to array
    
        // Filter by specialization
        const specialization = req.query.specialization;
        if (specialization) {
          appointments = appointments.filter(doctor => doctor.specialization === specialization);
        }
    
        // Sort by date
        const sortByDate = req.query.sort === 'date';
        if (sortByDate) {
          appointments.sort((a, b) => a.date.localeCompare(b.date));
        }
    
        // Search query
        const searchQuery = req.query.search;
        if (searchQuery) {
          appointments = appointments.filter(doctor => doctor.name.toLowerCase().includes(searchQuery.toLowerCase()));
        }
    
        res.status(200).json(appointments);
      } catch (err) {
        res.status(500).json({ err });
      }
}  
exports.getbyid=async(req,res)=>{
    try{
 const {id} = req.params 
 const updatedAppointment = req.body 
 const appointment = await Appointment.findById(id) 
 if(!appointment){
    return res.status(404).json({error:'Appointment not found'})
 }  
 res.status(201).json({appointment}) 
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