const { User } = require("../db");
const generateJWT = require("../MiddleWare/generatejwt");
const { UserSchema } = require("../type");
const bcrypt = require('bcrypt');    

async function usersignup (req, res) {

    const person = req.body ;

    const safeperson = UserSchema.safeParse(person); 

    if (!safeperson.success) {
        return res.status(400).json({
            message: safeperson.error.format()
        });
    }

    const finding = await User.findOne ({ email : person.email});    

    if (finding) {
        return res.json ({
            message: 'User already exists'
        });  
    }    

    const hashed = await bcrypt.hash(person.password, 10);

    const token = await generateJWT(person);     

    await User.create ({

        name : person.name,  
        email : person.email, 
        college_name : person.college_name,   
        password : hashed,  
    })   


    res.json ({
        message: 'User created successfully', 
        token : token    
    })   





}

module.exports = usersignup;  // Export the function for use in other files.  // Compare this snippet from Backend/Functions/userlogin.js:    