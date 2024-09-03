const User=require('../Models/LoginModel');
const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs')
const auth=require('../middleware/auth')
const {setUser}=require('../services/services');

async function registerData(req,res){
    try{
    const{name,email,password}=req.body;

    if(!name && !email && !password){
        return res.status(400).json({msg:'Form is empty'});
    }
    else if(!name){
        return res.status(400).json({msg:'Name field is empty'});
    }else if(!email){
        return res.status(400).json({msg:'email field is empty'});
    }else if(!password){
        return res.status(400).json({msg:'password field is empty'});
    }else{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const addData=new User({name:name,email:email,password:hashedPassword})
        await addData.save();
        return res.status(200).json({msg:'User registered successfully'})
    }

    }catch(err)
    {
        return res.status(400).json({msg:'server error'})
    }
}

async function loginData(req,res){
    // try {
    //     const{email,password}=req.body;
        
    //     const checkData=await User.findOne({email,password})
    //     if(!checkData){
    //         return res.status(400).json({msg:"email and password dosen't exists"})
    //     }
    //     else{
    //         const token=setUser(checkData)
    //         return res.status(201).json({msg:"Valid User",data:checkData,token:token})
    //     }
    // } catch (error) {
    //     return res.json({msg:'server error'});
    // }

    try {
        const {email,password}=req.body;
        const user=await User.findOne({email:email});
        if (!email && !password) {
            return res.status(400).json({ err: "Form is empty !" })
        } else if (!email) {
            return res.status(400).json({ err: "Email is not defined !" })
        } else if (!password) {
            return res.status(400).json({ err: "Password is not defined !" })
        }
        else if (password.length > 8) {
            return res.status(400).json({ err: "password is over the 8 characters !" })
        }
        else if (password.length < 8) {
            return res.status(400).json({ err: "password is under the 8 characters !" })
        }
        else if (!findEmail) {
            return res.status(400).json({ err: "Invalid Credentials !" })
        }else{
        const isMatch=await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(200).send({message:"Password is incorrect", success:false})
        }
            const token=setUser(user)
            console.log("token",token)
           return res.status(200).send({message:"Login Successfully", success:true,data:token})
        }
    
    } catch (error) {
        return res.status(400).send({msg:"Error",error})
    }
}

module.exports={registerData,loginData}