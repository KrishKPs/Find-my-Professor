const { Admin } = require("../db");
const generateJWT = require("../MiddleWare/generatejwt");


async function adminlogin (req,res) {

    const person = req.body; 

    const admin = await Admin.findOne ({ email: person.email }); 
    
    if (!admin) {
        return res.status(401).json({
            message: 'Invalid email or password'
        });
    }   

    const token = await generateJWT(admin);  
    res.json ({
        message: 'Admin logged in successfully',
        admin: admin , 
        token: token         
    })




}

module.exports = adminlogin;  // Export the function for use in other files.  // Compare this snippet from Backend/Functions/adminlogin.js: //   