const { Professor } = require("../db");
const generateJWT = require("../MiddleWare/generatejwt");
const bcrypt = require('bcrypt');    


async function professorlogin (req,res) {

    const person = req.body ; 

    const professor = await Professor.findOne ({ email: person.email });     

    if(!professor) {
        return res.status(401).json({
            message: 'Invalid email or password'
        }); 
    }

    const checkpass = await bcrypt.compare (person.password, professor.password);  

    if (!checkpass) {
        return res.status(401).json({
            message: 'Invalid email or password'  
    })
}

    const token = await generateJWT(professor);  

    res.json ({

        message : 'Professor logged in successfully',    
        professor : professor ,  
        token : token    
    })




}

module.exports = professorlogin;  // Export the function for use in other files.  // Compare this snippet from Backend/Functions/professorlogin.js: 