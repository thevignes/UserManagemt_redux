import User from "../../Model/UserModels.js";
import express from "express";
import bycrpt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const Login = async (req, res) => {

  try {
    const { email, password } = req.body;
  ;
    const exisitingUser = await User.findOne({ email });
    if (!exisitingUser) {
      return res.status(404).json({ message: "User not found" });
    }
    const passwordCompare = await bycrpt.compare(
      password,
      exisitingUser.password
    );
    if (!passwordCompare) {
      return res.status(404).json({ message: "Invalid password" });
    }
  
    const token = jwt.sign(
      { id: exisitingUser._id, email: exisitingUser.email },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );


    return res.status(200).json({ message: "logged in  successfully", token,user: {
      id: exisitingUser._id,
      name: exisitingUser.name,
      email: exisitingUser.email,
      
    } });
  } catch (error) {
    return res.status(500).json({ message: "something error" });
  }
};

export default Login;
