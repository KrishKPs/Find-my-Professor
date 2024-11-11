const { ProfessorDetail } = require("../db");

async function getprofessor (req, res) {


    const professor = req.user ; 


    if (!professor) {
        return res.status(401).json({
            message: 'No Professor found #1 '
        });
    }        


    const professorfind = await ProfessorDetail.findOne ({ email : professor  });   

    if (!professorfind) {
        return res.status(401).json({
            message: 'No Professor found #2'
        });
    }    

    res.json ({
        professor : professorfind ,   
    })   


}

module.exports = getprofessor;  // Export the function for use in other files.  // Compare this snippet from Backend/Functions/getprofessor.js:  