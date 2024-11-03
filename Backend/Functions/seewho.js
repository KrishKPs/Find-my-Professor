const { ProfessorDetail } = require("../db");

async function seewho (req,res) {


    const person = req.body;     

     const who = ProfessorDetail.find ({ category : person.category });  
     
     if (!who) {
         return res.status(401).json({
             message: 'No Professors found'
         });
     }   

     res.json ({
         who : who ,   
     })  




}


module.exports = seewho;  // Export the function for use in other files.  // Compare this snippet from Backend/Functions/seewho.js:  