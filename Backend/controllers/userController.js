const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

const registerUser = async (req, res) => {
  try {
    const existsUser = await User.findOne({ email: req.body.email });
    if (existsUser) {
      return res.status(200).send({ message: "User already exists", success: false });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;

    const newUser = new User(req.body);
    await newUser.save();

    return res.status(201).send({ message: "Register Success", success: true });
  } catch (error) {
    console.error("Error in registering user:", error);
    return res.status(500).send({ success: false, message: "Internal server error" });
  }
};

const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(200).send({ message: "User not found", success: false });
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
       console.log("Invalid email or password");  // Debugging line
       return res.status(200).send({ message: "Invalid email or password", success: false });
    }
    
    const secretKey = process.env.JWT_KEY;
    if (!secretKey) {
      throw new Error('JWT secret key is not defined');
    }

    const token = jwt.sign({ id: user._id }, secretKey, { expiresIn: "1d" });
    user.password = undefined;

    return res.status(200).send({
      message: "Login successful",
      success: true,
      token,
      userData: user,
    });
  } catch (error) {
    console.error("Error in login:", error);
    return res.status(500).send({ success: false, message: "Internal server error" });
  }
};
module.exports = {
  registerUser,
  loginUser}