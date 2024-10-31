const { Professor } = require("../db");
const generateJWT = require("../MiddleWare/generatejwt");
const {  professorSchema } = require("../type");
const bcrypt = require('bcrypt');    

async function professorSignup (req,res){




    const person = req.body; 

    const finding = await Professor.findOne({ email: person.email });    

    if (finding) {
            
            return res.json ({
                message: 'Professor already exists'
            });  
    }

    const safeperson = professorSchema.safeParse(person);  
    
    if (!safeperson.success) {
        return res.status(400).json({
            message: safeperson.error.format()
        });
    } 
    
    const hashed = await bcrypt.hash(person.password, 10);   

    await Professor.create ({

        name : person.name,  
        email : person.email,  
        category : person.category,  
        password : hashed,  
    })

    const token = await generateJWT(person);    

    res.json ({
        message: 'Professor created successfully', 
        token : token   
    })  




}

module.exports = professorSignup;  // Export the function for use in other files.  // Compare this snippet from Backend/Functions/professorsignup.js:    