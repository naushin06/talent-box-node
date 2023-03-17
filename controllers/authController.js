const UserModel = require("../models/UserModel");
const jwt = require("jsonwebtoken");

const maxAge = 3 * 24 * 60 * 0;

const createToken = (id) => {
  return jwt.sign({ id }, "talent-box_secret-key", {
    expiresIn: "1h",
  });
};

const handleError = (err) => {
  let errors = { name: "", email: "", password: "" };

  if (err.message === "incorrect email") {
    return (errors.email = "That email is not registered");
  }

  if (err.message === "incorrect password") {
    return (errors.password = "That password is incorrect");
  }
  if (err.code === 11000) {
    let name = err.keyValue.hasOwnProperty("name");
    let email = err.keyValue.hasOwnProperty("email");

    if (name == true) {
      return (errors.name = "The user-name is already taken . Try another one");
    }
    if (email == true) {
      return (errors.email =
        "The e-mail is already registered please use alternate one .");
    }
  }
  if (err.message.includes("Users validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      return (errors[properties.path] = properties.message);
    });
  }
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
    console.log(err);
    let errors = handleError(err);
    res.json({ errors, created: false });
  }
};
module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.login(email, password);
    const token = await createToken(user._id);
    res.cookie('jwtToken', token, { httpOnly: true });
    res.status(200).json({ message: "Logged in successfully" });
  } catch (err) {
    const errors = handleError(err);
    res.status(401).json({ errors, status: false });
  }
};

module.exports.logout = (req, res) => {
  // Remove the JWT token from the client-side storage
  res.cookie('jwtToken', '');
  res.status(200).json({ message: "Logged out successfully" });
};

module.exports.welcomeMessage = async (req, res) => {
  try {
    res.status(200).json({ message: "welcome TalentBox !!!! " });
  } catch (error) {
    res.status(500).json({ message: "error occured" });
  }
};
