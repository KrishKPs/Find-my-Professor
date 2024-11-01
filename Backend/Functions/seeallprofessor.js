const { Professor } = require("../db");


async function seeallprofessor (req,res) {


    const Professors = await Professor.find ({}); 

    if (!Professors) {
        return res.status(401).json({
            message: 'No Professors found'
        });
    }   

    res.json ({
        Professors : Professors ,   
    })


}

module.exports = seeallprofessor;  // Export the function for use in other files.  // Compare this snippet from Backend/Functions/seeallprofessor.js:    