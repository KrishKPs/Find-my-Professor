const { Admin, ProfessorDetail } = require("../db");

async function changeverification (req,res) { 


    const admin = req.user ; 

    const Exists = Admin.findOne ({ email: admin });     

    if (!Exists) {
        return res.status(401).json({
            message: 'Admin not found'
        });  
    }        

    const professor = req.body ;     

    if (!professor.email) {
        return res.status(400).json({
            message: 'Email is required'
        });
    }    

    const professorfind = await ProfessorDetail.findOne({ email: professor.email });     

    if (!professorfind) {
        return res.status(401).json({
            message: 'Professor not found'
        });
    }    

   await ProfessorDetail.updateOne({ email: professor.email }, { verification: professor.verification });    

    res.json({
        message: 'Professor verification changed successfully'

    }); 



}

module.exports = changeverification;  // Export the function for use in other files.  // Compare this snippet from Backend/Functions/changeverification.js:  