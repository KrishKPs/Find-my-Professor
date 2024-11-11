const { Appoinments, User, Professor } = require("../db");

async function approvetheappoinment(req, res) {
  try {
    const professor = req.user; 
    const body = req.body;  

    if (!professor) {
      return res.status(401).json({
        message: 'No Professor found #1',
      });
    }

    const professorfind = await Professor.findOne ({ email : professor });      

    // Validate student email
    const student = await User.findOne({ email: body.student_email });
    if (!student) { 
      return res.status(404).json({
        message: 'Student not found',
      });
    }

    // Find the pending appointment
    const appointment = await Appoinments.findOne({
      professor_email: professorfind.email,
      student_name: student.name,
      student_email: student.email,
      status: "Pending",
    });

    if (!appointment) {
      return res.status(404).json({
        message: 'No Pending Appointment found',
      });
    }

    // Approve the appointment
    await Appoinments.updateOne(
      { _id: appointment._id },
      { $set: { status: "Approved" } }
    );

    // Push approved appointment to professor's appointments array
    await Professor.updateOne(
      { email: professorfind.email }, 
      { $push: { appoinments: appointment._id } }
    );

    res.json({
      msg: "Appointment Approved",
      appointment: appointment,
    });
  } catch (error) {
    console.error("Error approving appointment:", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

module.exports = approvetheappoinment;
