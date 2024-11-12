const { Appoinments } = require("../db");

async function completeappoinments ( req, res) {

    const professor = req.user ;     

    const body = req.body ; 

    if (!professor) {
        return res.status(401).json({
            message: 'No Professor found #1 '
        });
    }    

    const profeesorfind = await Appoinments.find ( { professor_email : professor , status : "Approved" } ); 
    
    if (!profeesorfind) {
        return res.status(401).json({
            message: 'No Professor found #2'
        });
    }   

    await Appoinments.updateOne ( { professor_email : professor , status : "Approved" , student_email : body.student_email } , { $set : { status : "Completed" } } );  
    
    
    res.json ({
        msg : "Appoinment Completed" ,    
    })   
}

module.exports = completeappoinments;  // Export the function for use in other files.  // Compare this snippet from Backend/Functions/getprofessor.js: