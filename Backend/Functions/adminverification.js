const { ProfessorDetail, Admin } = require("../db");


async function adminverification (req, res) {

    const adminExist = req.user;     

    const admin = await Admin.findOne ({ email: adminExist });   

    if (!admin) {
        return res.status(401).json({
            message: 'Admin not found'
        });  
    }


    const unverified = await ProfessorDetail.find({ verification : "Not-Verified" });  


    res.json ({

        unverfied_professors : unverified ,  
    }) 


}

module.exports = adminverification;  // Export the function for use in other files.  // Compare this snippet from Backend/Functions/adminverification.js:    