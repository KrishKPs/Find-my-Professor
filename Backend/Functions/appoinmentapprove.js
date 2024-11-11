const { Appoinments, Professor } = require("../db");

async function approveappoinment (req, res) {


    const professor = req.user ;   
    
    
    if (!professor) {
        return res.status(401).json({
            message: 'No Professor found #1 '
        });
    }    


    const appoinments = await Appoinments.find ({ professor_email : professor , status : "Pending" });   

    if (!appoinments) {
        return res.status(401).json({
            message: 'No Appoinments found'
        });
    }  
    
  
    
    

    res.json ({
        appoinments : appoinments ,   
    })  
    
    







}

module.exports = approveappoinment;  // Export the function for use in other files.  // Compare this snippet from Backend/Functions/appoinmentapprove.js: 