const { ProfessorDetail } = require("../db");
const { professorDetailSchema } = require("../type");

async function detailsupdate (req,res) {



    const details = req.body ; 

    const safedetails = professorDetailSchema.safeParse(details); 

    if (!safedetails.success) {
        return res.status(400).json({
            message: safedetails.error.format()
        });
    }    

    const professor = req.user;  

    const detailfind = await ProfessorDetail.findOne( {email : professor});  

    if (!detailfind) {
        return res.status(411).json({
            message: 'Professor details not found'
        });
    } 
    
    const updating = await ProfessorDetail.findOneAndUpdate ({

        email : professor
    } , 

     {
        name : detailfind.name,  
        email : detailfind.email,    
        category : details.category,  
        profile_photo : details.profile_photo,   
        major : details.major,  
        location : details.location,    
        office_hours : details.office_hours,    
        available : details.available,  
     }

)
    
        res.json ({
            message: 'Professor details updated successfully'
        })   
} 
  

module.exports = detailsupdate;  // Export the function for use in other files.  // Compare this snippet from Backend/Functions/professordetailupdate.js:    