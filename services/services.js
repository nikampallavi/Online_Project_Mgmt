const jwt=require('jsonwebtoken');
const secretekey='pallavi@123'

function setUser(user){
    const payload={
       Id:user._id,
       email : user.email,
       password : user.password
    }

    return jwt.sign(payload,secretekey)
}

module.exports={setUser}