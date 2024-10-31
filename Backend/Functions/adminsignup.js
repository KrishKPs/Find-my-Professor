const { Admin } = require("../db");
const generateJWT = require("../MiddleWare/generatejwt");
const { adminSchema } = require("../type");

async function adminSignup(req,res) {

    const person = req.body ; 

    const safeperson = adminSchema.safeParse(person); 

    if (!safeperson.success) {
        return res.status(400).json({
            message: safeperson.error.format()
        });
    } 

    const finding = await Admin.findOne({ email: person.email }); 

    if (finding) { 

        return res.json ({
            message: 'Admin already exists'
        });  
    }
    
    const token = await generateJWT(person);   
    console.log(token); 

   await Admin.create ({


      name : person.name,  
      email : person.email,  
        password : person.password,  


    })

  

    res.json ({
        message: 'Admin created successfully', 
        token : token 
    })

}

module.exports = adminSignup;  // Export the function for use in other files.  // Compare this snippet from Backend/Functions/adminsignup.js: //     