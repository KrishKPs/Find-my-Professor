const jwt = require ('jsonwebtoken'); 
const jwtpass = process.env.JWT_SECRET;    

const generateJWT = async (person) => {

    const token = await jwt.sign( person.email , jwtpass); 
    return token;        
} 

module.exports = generateJWT;  // Export the function for use in other files.  // Compare this snippet from Backend/Route/index.js: //   