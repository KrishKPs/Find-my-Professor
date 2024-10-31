const zod = require ('zod');     

const adminSchema = zod.object({

    name : zod.string().min(1, 'Name is required'),  
    email : zod.string().email('Invalid email format'), 
    password : zod.string().min(6, 'Password must be at least 6 characters long'),  

})

const professorSchema = zod.object({ 
    
        name : zod.string().min(1, 'Name is required'),  
        email : zod.string().email('Invalid email format'), 
        category : zod.string().min(1, 'Category is required'), 
        password : zod.string().min(6, 'Password must be at least 6 characters long'),
  }) 


const professorDetailSchema = zod.object({
    
        name : zod.string().min(1, 'Name is required').optional(),  
        email : zod.string().email('Invalid email format').optional(), 
        category : zod.string().min(1, 'Category is required').optional(), 
        profile_photo : zod.string(), 
        major : zod.string().min(1, 'Major is required'),  
        location : zod.string().min(1, 'Location is required'),  
        office_hours : zod.string().min(1, 'Office hours are required'),     
        available : zod.enum(['Available', 'Not-Available']).optional(),     
       verification : zod.enum(['Verified', 'Not-Verified']).optional(),     


})


module.exports = { 
    adminSchema, 
    professorSchema, 
    professorDetailSchema 
}; 