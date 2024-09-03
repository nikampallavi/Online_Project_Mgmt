const express=require('express');
const router=express.Router();

const {createProject,updateData,getProjectData}=require('../controllers/projectController')
const {authorization} =require('../middleware/auth')
router.post('/newproject',createProject)
router.patch('/updateStatus/:id',authorization, updateData)

router.get('/getData',authorization, getProjectData)

module.exports=router;