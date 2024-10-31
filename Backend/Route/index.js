
const express = require('express');  
const adminSignup = require('../Functions/adminsignup');
const adminlogin = require('../Functions/adminlogin');
const professorSignup = require('../Functions/professorsignup');
const professorlogin = require('../Functions/professorlogin');
const authenticate = require('../MiddleWare/auth');
const professorDetails = require('../Functions/professordetails');
const detailsupdate = require('../Functions/professordetailupdate');

const router = express.Router(); 



router.post('/adminsignup',  adminSignup); 
router.post('/adminlogin' , adminlogin); 
router.post('/professorsignup', professorSignup); 
router.post('/professorlogin' , professorlogin); 
router.post('/enterdetails' , authenticate , professorDetails)
router.put('/updatedetails' , authenticate , detailsupdate )



module.exports  = router;     