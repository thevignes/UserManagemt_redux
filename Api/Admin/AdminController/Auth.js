    import Jwt from 'jsonwebtoken';
    import express from 'express';
    import Admin from '../../Model/Admin.js';
    import dotenv from "dotenv";
    import bcrypt from 'bcryptjs';
    dotenv.config();


    const AdminLogin = async (req,res) =>{
    
    try {
        const{email,password} = req.body;
    console.log(req.body)
        if(!email || !password){
            return res.status(400).json({message:"all field are required"})
        }
            const admin = await Admin.findOne({email})

            if(!admin){
                return res.status(400).json({message:"Invalid email or password"})
            }

            const validpassword = await bcrypt.compare(password,admin.password )
    console.log('passworddddddddddddddd',validpassword)
            if(!validpassword){
                return res.status(401).json({message:"Invalid password an "})
            }
    console.log('90')
            const token = Jwt.sign({id: admin._id,email:admin.email},
                process.env.JWT_SECRET_KEY  ,
                {expiresIn:"1h"}
            );
    console.log('token kitti',token)
            return res.status(200).json({message:"admin logged in successfully", token})
            
            } catch (error) {
                console.log(error,'while logging')
        return res.status(500).json({message:"Internal server error"})
        }
    }




    export default AdminLogin