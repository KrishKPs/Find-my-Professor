const { Appoinments } = require("../db");

async function declinemeetings (req,res) {

    const professor = req.user ; 

    const body = req.body ;  

    if ( ! professor ) {
        return res.status(401).json({
            message: 'No Professor found #1 '
        });
    }    


    const professorfind = await Appoinments.find ( { professor_email : professor , status : "Pending" } );
    
    if (!professorfind) {
        return res.status(401).json({
            message: 'No Pending Appoinments'
        });
    }        

    await Appoinments.updateOne ( {  professor_email : professor , status : "Pending" , student_email : body.student_email } , { status : "Declined" } );



    res.json ({
        message : "Meeting Declined" ,  
    }) 




}

module.exports = declinemeetings;  // Export the function for use in other files.  // Compare this snippet from Backend/Functions/declinemeetings.js: