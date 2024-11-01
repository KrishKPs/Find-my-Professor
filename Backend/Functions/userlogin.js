const { User } = require("../db");
const bcrypt = require('bcrypt');    
const generateJWT = require("../MiddleWare/generatejwt");

async function userlogin (req, res) {


    const person = req.body; 
    
    
    const user = await User.findOne ({ email : person.email });  

    if (!user) {
        return res.status(401).json({
            message: 'Invalid email or password'
        }); 
    }    

    const checkpass = await bcrypt.compare (person.password, user.password);  
    
    if (!checkpass) {
        return res.status(401).json({
            message: 'Invalid email or password'
        }); 
    }    

    const token = await generateJWT(user);  

    res.json ({
        message: 'User logged in successfully', 
        user : user , 
        token : token    
    })   



}

module.exports = userlogin;  // Export the function for use in other files.  // Compare this snippet from Backend/Functions/userlogin.js: