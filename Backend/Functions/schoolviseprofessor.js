const { Professor } = require("../db");

async function schoolviseprofessor (req,res) 

{

    const schoolname = req.params.schoolname;    
    console.log(schoolname);    

    const Professors = await Professor.find ({ schoolname: schoolname });   
    
    if (!Professors) {
        return res.status(401).json({
            message: 'No Professors found'
        });
    }       

    res.json ({
        Professors : Professors ,   
    })   



}

module.exports = schoolviseprofessor;  // Export the function for use in other files.