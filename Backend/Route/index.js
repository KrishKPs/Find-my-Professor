
const express = require('express');  
const adminSignup = require('../Functions/adminsignup');
const adminlogin = require('../Functions/adminlogin');
const professorSignup = require('../Functions/professorsignup');
const professorlogin = require('../Functions/professorlogin');
const authenticate = require('../MiddleWare/auth');
const professorDetails = require('../Functions/professordetails');
const detailsupdate = require('../Functions/professordetailupdate');
const adminverification = require('../Functions/adminverification');
const changeverification = require('../Functions/changeverification');
const userlogin = require('../Functions/userlogin');
const usersignup = require('../Functions/usersignup');
const seeallprofessor = require('../Functions/seeallprofessor');
const schoolviseprofessor = require('../Functions/schoolviseprofessor');
const seewho = require('../Functions/seewho');
const seeone = require('../Functions/seeone');
const bookappoinment = require('../Functions/bookappoinment');
const getprofessor = require('../Functions/getprofessor');
const approveappoinment = require('../Functions/appoinmentapprove');
const approvetheappoinment = require('../Functions/approvetheappoinment');
const seeapprovemeeting = require('../Functions/seeapprovemeeting');
const declinemeetings = require('../Functions/declinemeetings');
const seecompletedappoinments = require('../Functions/seecompletedappoinments');
const completeappoinments = require('../Functions/completeappoinments');

const router = express.Router(); 

// Add multer configuration here to ensure it works with professorDetails
const multer = require('multer');
const path = require('path');
const uploadImage = require('../Functions/uploadimage');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Set destination folder
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true); // Accept image files only
        } else {
            cb(new Error('Only image files are allowed'), false);
        }
    }
});

// Use multer middleware for /enterdetails route
router.post('/enterdetails', authenticate, upload.single('profile_photo'), professorDetails);




router.post('/adminsignup',  adminSignup); 
router.post('/adminlogin' , adminlogin); 
router.get('/seeprofessor', authenticate , adminverification); 
router.post('/updateverification' , authenticate , changeverification)

router.post('/professorsignup', professorSignup); 
router.post('/professorlogin' , professorlogin); 

// router.post('/enterdetails' , authenticate , professorDetails)
router.put('/updatedetails' , authenticate , detailsupdate )

router.post('/usersignup' , usersignup)
router.post('/userlogin' , userlogin)
router.get('/schoolprofessor/:schoolname' ,  schoolviseprofessor)


router.get('/seeallprofessor' , seeallprofessor)
router.post ('/seewho' , seewho)
router.get ('/seeone/:id' , seeone)
router.post ('/bookappoinment/:professorid' , authenticate , bookappoinment)
router.get ('/getprofessor' , authenticate , getprofessor)

router.get ('/seeappoinments' , authenticate , approveappoinment); 
router.post ('/approveappoinment' , authenticate , approvetheappoinment); 

router.get('/seeapprovemettings' , authenticate , seeapprovemeeting); 

router.post('/declineappoinment' , authenticate , declinemeetings); 

router.get ('/seecompletedmeeting' , authenticate , seecompletedappoinments); 
router.post('/completemeetings' , authenticate, completeappoinments); 

router.post('/upload', uploadImage);




module.exports  = router;     