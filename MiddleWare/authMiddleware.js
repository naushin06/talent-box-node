const User=require("../models/UserModel")
const jwt=require("jsonwebtoken")


module.exports.LogOut=(req,res,next)=>{
    const token=req.cookies.jwt;
    console.log(token)
    if(token){
        jwt.verify(token,"talent-box_secret-key",async(err,decodedToken)=>{
            if(err){
                res.json({status:false})
                    next()
            }else{
                const user=await User.findById(decodedToken.id);
                if(user){
                    res.json({status:true,$or: [{ user: user.email }, { user: user.email }]})
                }else{
                    res.json({status:false})
                    next()   
                }
            }
        })

    }else{
        res.json({status:false});
        next();
    }
}