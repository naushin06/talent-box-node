





const UserModel = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const { response } = require("express");

const maxAge = 3 * 24 * 60 * 0;
const id=0;
const createToken = (id) => {
  return jwt.sign({ id }, "talent-box_secret-key", {
    expiresIn: "1h",
  });
};

const handleError = (err) => {
  let errors = { name: "", email: "", password: "" };
  if (err.message === "incorrect email") {
  errors.email = "That email is not registered ,Please log-in";
  }

  if (err.message === "incorrect password") {
    errors.password = "That password is incorrect";
  }
  if (err.code === 11000) {
    let name = err.keyValue.hasOwnProperty("name");
    let email = err.keyValue.hasOwnProperty("email");

    if (name == true) {
      errors.name = "The user-name is already taken . Try another one";
    }
    if (email == true) {
    errors.email =
        "The e-mail is already registered please use alternate one .";
    }
  }
  if (err.message.includes("Users validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
    errors[properties.path] = properties.message;
    });
  }
  return errors
};

module.exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const user = await UserModel.create({ name, email, password });
    console.log("Req object ::::",user);
    res.status(201).json({
      message: "User Created successfully !",
      user: user._id,
      created: true,
    });
  } catch (err) {
    let errors =handleError(err);
    res.json({errors,created:false})
  }
};
module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.login(email, password);
    const token = await createToken(user._id);
    
    let id=user._id
    res.cookie('jwtToken', token,);
    res.status(200).json({ message: "Logged in successfully" ,token});
  } catch (err) {
    const errors = handleError(err);
    console.log(err.message);
    res.json({ errors, status: false });
  }
};

module.exports.logout = (req, res) => {
  // Remove the JWT token from the client-side storage
  res.cookie('jwtToken', '');
  res.status(200).json({ message: "Logged out successfully" });
};

module.exports.LogOut=async(req,res,next)=>{
  const token=req.cookies;
const cookieValue = req.cookies['myCookieName'];


try{
  const token = jwt.sign({ userId: id }, 'talent-box_secret-key', { expiresIn: '1h' });

  res.json({cleared:"true",name:{token:token,name:"jwtToken"}})
 
 

  
}catch(err){
  res.json(err.message)
}

}

module.exports.welcomeMessage = async (req, res,next) => {
  const token=req.cookies.jwtToken;
  try{
    if(token){
      jwt.verify(token,"talent-box_secret-key",async(err,decodedToken)=>{
          if(err){
              res.json({token,status:false})
                  next()
          }else{
              const user=await UserModel.findById(decodedToken.id);
              if(user){
                  res.json({token,status:true,email: user.email, name:user.name})
              }else{
                  res.json({token,status:false})
                  next()   
              }
          }
      })

  }else{
      res.json({status:false});
      next();
  }
  }catch(err){
    res.json({err:err.message})
  }
};
