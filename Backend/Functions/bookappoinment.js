const { ProfessorDetail, Appoinments, User } = require("../db");

function convertTo24Hour(time) {
  const [hours, minutes] = time.split(':').map(Number);
  return { hours, minutes };
}

function isTimeWithinRange(startTime, endTime, rangeStart, rangeEnd) {
  console.log("Checking Time Range:");
  console.log(`Input Start Time: ${startTime}, Input End Time: ${endTime}`);
  console.log(`Range Start Time: ${rangeStart}, Range End Time: ${rangeEnd}`);

  const start = convertTo24Hour(startTime);
  const end = convertTo24Hour(endTime);
  const rangeStartTime = convertTo24Hour(rangeStart);
  const rangeEndTime = convertTo24Hour(rangeEnd);

  console.log("Converted Times:");
  console.log(`Converted Start: ${start.hours}:${start.minutes}, Converted End: ${end.hours}:${end.minutes}`);
  console.log(`Converted Range Start: ${rangeStartTime.hours}:${rangeStartTime.minutes}, Converted Range End: ${rangeEndTime.hours}:${rangeEndTime.minutes}`);

  const startTotalMinutes = start.hours * 60 + start.minutes;
  const endTotalMinutes = end.hours * 60 + end.minutes;
  const rangeStartTotalMinutes = rangeStartTime.hours * 60 + rangeStartTime.minutes;
  const rangeEndTotalMinutes = rangeEndTime.hours * 60 + rangeEndTime.minutes;

  console.log(`Start Total Minutes: ${startTotalMinutes}, End Total Minutes: ${endTotalMinutes}`);
  console.log(`Range Start Total Minutes: ${rangeStartTotalMinutes}, Range End Total Minutes: ${rangeEndTotalMinutes}`);

  return startTotalMinutes >= rangeStartTotalMinutes && endTotalMinutes <= rangeEndTotalMinutes;
}

async function bookAppointment(req, res) {
  try {
    const body = req.body; 
    const professorId = req.params.professorid; 
    
    const student = req.user; 

    const studentfind = await User.findOne({ email: student });
    if (!studentfind) {
      return res.status(401).json({
        message: 'No Student found',
      });
    }

    const findProfessor = await ProfessorDetail.findOne({ _id: professorId });  
    if (!findProfessor) {
      return res.status(401).json({
        message: 'No Professor found',
      });
    }    

    const officeHours = findProfessor.office_hours.find(oh => oh.day === body.day);
    if (!officeHours) {
      return res.json({ message: 'No office hours available on this day.' });
    }

    const isWithinOfficeHours = isTimeWithinRange(
      body.startTime, 
      body.endTime, 
      officeHours.startTime, 
      officeHours.endTime
    );

    if (!isWithinOfficeHours) {
      return res.status(400).json({
        error: 'Requested time is outside of the professor\'s office hours.',
      });
    }

    const appointmentExists = await Appoinments.findOne({
      professor: findProfessor.name,
      day: body.day,
      startTime: body.startTime,
      status: "Pending",
    });

    if (appointmentExists) {
      return res.status(400).json({
        error: 'Appointment already exists',
      });
    }    

    await Appoinments.create({
      professor: findProfessor.name, 
      professor_email: findProfessor.email, 
      student_email: studentfind.email, 
      student_name: studentfind.name,   
      day: body.day, 
      startTime: body.startTime, 
      endTime: body.endTime,
    });

    res.json({
      message: 'Appointment booked successfully',
    });
  } catch (error) {
    console.error('Error booking appointment:', error);
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
}

module.exports = bookAppointment;
