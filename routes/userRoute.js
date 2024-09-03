const express=require('express');
const router=express.Router();

const {loginData,registerData}=require('../controllers/userController');
// const {authorization}=require('../middleware/auth');

router.post('/register',registerData);
router.post('/login',loginData);

module.exports=router;
