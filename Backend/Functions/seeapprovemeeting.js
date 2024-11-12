const { Professor, Appoinments } = require("../db");


async function seeapprovemeeting (req, res) {


    const professor = req.user ; 

    if ( ! professor ) {
        return res.status(401).json({
            message: 'No Professor found #1 '
        });
    }    

    const professorfind = await Appoinments.find( { professor_email : professor , status : "Approved" } ); 

    if (!professorfind) {
        return res.status(401).json({
            message: 'No Professor found #2'
        });
    }    

    res.json ({

     approved_meetings : professorfind ,    
    }) 


}

module.exports = seeapprovemeeting;  // Export the function for use in other files.  // Compare this snippet from Backend/Functions/getprofessor.js: 