const express =require('express') 
const router = express.Router() 
const appointmentController = require('../controllers/appointmentController') 
const authMiddleware = require('../middleware/authMiddleware') 
router.post('/',appointmentController.createAppointment) 
router.get('/',appointmentController.getAllAppointment) 
router.put('/:id',appointmentController.updateAppointment) 
router.delete('/:id',appointmentController.deleteAppointment) 
module.exports = router;