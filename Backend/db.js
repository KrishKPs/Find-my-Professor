

const mongoose = require('mongoose');    

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("Connected to MongoDB"))     
.catch (err => console.log(err));   
 

const UserSchema = mongoose.Schema({

    name : {
        type: String,
        required: true,
    }, 
    email : {
        type: String,
        required: true,
    },
    college_name : {
        type: String,
        required: true,
    }, 
    password : {
        type: String,
        required: true,
    } 

})
const ProfessorSchema = mongoose.Schema({

    name : {
        type: String,
        required: true, 
    }, 
    email : {
        type: String,
        required: true, 
    }, 
    college_name : {
        type: String,
        required: true, 

    }, 
    category : {
        type: String,
        required     : true,     
        enum : ["Professor" , "Academic Advisor" , "Consultant"]
    }, 
    password : {
        type: String,
        required: true, 
    } 
})

const adminSchema = mongoose.Schema({

    name : {
        type: String,
        required: true, 
    }, 
    email : {
        type: String,
        required: true, 
    }, 
    password : {
        type: String,
        required: true, 
    } 
})



const ProfessorDetailSchema = mongoose.Schema({
    name: {
        type: String,
        ref: 'Professor',
        required: true,
    },
    email: {
        type: String,
        ref: 'Professor',
        required: true,
    },
    college_name: {
        type: String,
        ref: 'Professor',
        required: true,
    },
    category: {
        type: String,
        ref: 'Professor',
        required: true,
    },
    phone_number : {
        type: String,
        required: true,
    }, 
    
    profile_photo: {
        type: String,
        required: true,
    },
    major: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    office_hours: [
        {
            day: {
                type: String,
                required: true,
                enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
            },
            startTime: {
                type: String,
                required: true,  
            },
            endTime: {
                type: String,
                required: true, 
            }
        }
    ],
    available: {
        type: String,
        required: true,
        enum: ['Available', 'Not-Available'],
    },
    verification: {
        type: String,
        required: true,
        enum: ['Verified', 'Not-Verified'],
    }
});


const Professor = mongoose.model('Professor', ProfessorSchema);  
const Admin = mongoose.model('Admin', adminSchema); 
const ProfessorDetail = mongoose.model('ProfessorDetail', ProfessorDetailSchema);  
const User = mongoose.model('User', UserSchema);      


module.exports = {
    Professor,
    Admin,
    ProfessorDetail  , 
    User 
};   