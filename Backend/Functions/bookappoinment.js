const { ProfessorDetail, Appoinments } = require("../db");

async function bookAppointment(req, res) {
    const body = req.body; 
    const professorId = req.params.professorid;   
  
    // Validate if the professor exists
    const findProfessor = await ProfessorDetail.findOne({ _id: professorId });  
    if (!findProfessor) {
      return res.status(401).json({
        message: 'No Professor found'
      });
    }    
  
    // Find office hours for the given day
    const officeHours = findProfessor.office_hours.find(oh => oh.day === body.day);
    if (!officeHours) {
      return res.json({ message: 'No office hours available on this day.' });
    }
  
    // Validate requested time within office hours
    const isWithinOfficeHours = body.startTime >= officeHours.startTime && body.endTime <= officeHours.endTime;
    if (!isWithinOfficeHours) {
      return res.status(400).json({
        error: 'Requested time is outside of the professor\'s office hours.'
      });
    }
  
    // Check if an appointment already exists for the given slot
    const appointmentExists = await Appoinments.findOne({
      professorId: professorId,
      day: body.day,
      startTime: body.startTime,

    });
  
    if (appointmentExists) {
      return res.status(400).json({
        error: 'Appointment already exists'
      });
    }    
  
    // Create the appointment
    await Appoinments.create({
      professorId: professorId, 
      studentId: body.studentId, 
      day: body.day, 
      startTime: body.startTime, 
      endTime: body.endTime
    });
  
    res.json({
      message: 'Appointment booked successfully'
    });
  }
  
  module.exports = bookAppointment;
  