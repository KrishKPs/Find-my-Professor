const { Appoinments } = require("../db");

async function seecompletedappoinments ( req, res) {

    const professor = req.user ; 

    if (!professor) {
        return res.status(401).json({
            message: 'No Professor found #1 '
        });
    } 

    const professorfind =  await Appoinments.find ( { professor_email : professor , status : "Completed" } );    


    if (!professorfind) {
        return res.status(401).json({
            message: 'No Professor found #2'
        });
    }    

    res.json ({
        completed_meetings : professorfind ,    
    })   


}

module.exports = seecompletedappoinments;  // Export the function for use in other files.  // Compare this snippet from Backend/Functions/getprofessor.js: 