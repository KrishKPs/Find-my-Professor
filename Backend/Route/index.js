
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

const router = express.Router(); 



router.post('/adminsignup',  adminSignup); 
router.post('/adminlogin' , adminlogin); 
router.get('/seeprofessor', authenticate , adminverification); 
router.post('/updateverification' , authenticate , changeverification)

router.post('/professorsignup', professorSignup); 
router.post('/professorlogin' , professorlogin); 

router.post('/enterdetails' , authenticate , professorDetails)
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



module.exports  = router;     