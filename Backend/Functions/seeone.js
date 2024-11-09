const {  ProfessorDetail } = require("../db");

async function seeone (req,res) {


    const id = req.params.id; 



    if (!id) {
        return res.status(401).json({
            message: 'No Professor found'
        });
    }    

    const professor = await ProfessorDetail.findOne  ({ _id : id });       

    if (!professor) {
        return res.status(401).json({
            message: 'No Professor found'
        });
    }        

    res.json ({
        professor : professor ,   
    })       



}

module.exports = seeone;  // Export the function for use in other files.  // Compare this snippet from Backend/Functions/seeoneprofessor.js:     