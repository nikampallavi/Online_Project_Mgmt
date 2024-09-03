const jwt=require('jsonwebtoken')
const secretekey='pallavi@123'
function authorization(req,res,next){
   try {
    const headers=req.headers['authorization'];
    if(headers ===undefined){
        return res.status(404).json('Token does not match');
    }
    else{
        const bearer=headers.split(" ");
        console.log(bearer)
        const token=bearer[1];
        // console.log(token)
        // req.token==token;
      const decoded=jwt.verify(token,secretekey);
      console.log(decoded,"*************");
      req.user=decoded;
    }
    next();
    
   } catch (error) {
     return res.json({message:'server error'})
   }
}

module.exports={authorization}

// const jwt=require('jsonwebtoken');

// module.exports=(req,res,next)=>{
//     try{
//         const token=req.headers["authorization"].split(" ")[1];
//     jwt.verify(token,process.env.JWT_SECRET,(err,decoded)=>{
//         if(err){
//             return res.status(200).send({message:"Auth failed",success:false})
//         }else{
//             req.body.userId=decoded.id;
//             next();
//         }
//     })
//   }catch(error){
//     console.log(error);
//   }
