const jwt = require('jsonwebtoken');     

    const jwtpass = process.env.JWT_SECRET;  



async function authenticate (req, res , next) {


    const token = req.headers['authorization'];  
    console.log(token) ; 

    if (!token ) {

       return res.json ({
            message: 'Unauthorized access'   
        })
    }

    try {
        
        const decode = jwt.verify (token, jwtpass);  
        console.log (decode); 
        const user = decode;   
        req.user = user;        

        next(); 
    } catch (error) {

        console.log (error);     

        res.status(411).json({
            message: error ,   

        })
        
    }

}

 module.exports = authenticate;   