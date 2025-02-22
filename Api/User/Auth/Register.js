import User from "../../Model/UserModels.js";
import bycrpt from 'bcryptjs'
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config()
 
const Registration = async (req, res) => {
    try {
        console.log('Registration Request Body:', req.body)
        const { name, email, password } = req.body;

    
        if (!name || !email || !password) {
            console.log('Validation Failed: Missing Fields')
            return res.status(400).json({ 
                msg: "Please enter all fields", 
                error: "Incomplete registration details" 
            })
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            console.log('Invalid Email Format')
            return res.status(400).json({ 
                msg: "Invalid email format", 
                error: "Please provide a valid email address" 
            })
        }

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            console.log('User Already Exists')
            return res.status(400).json({ 
                msg: "User already exists", 
                error: "Email is already registered" 
            })
        }

        if (password.length < 6) {
      
            return res.status(400).json({ 
                msg: "Password too weak", 
                error: "Password must be at least 6 characters long" 
            })
        }

  
        const salt = await bycrpt.genSalt(10)
        const hashedPassword = await bycrpt.hash(password, salt)

        const newUser = new User({
            name,
            email,
            password: hashedPassword
        })

       
        await newUser.save()

     
        const token = jwt.sign(
            { userID: newUser._id, email: newUser.email },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '1h' }
        )

        console.log('User Registered Successfully')

 
        return res.status(201).json({
            msg: "User created successfully",
            token,
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email
            }
        });

    } catch (error) {
        console.error('Registration Error:', error);
        return res.status(500).json({ 
            msg: 'Server error', 
            error: error.message 
        })
    }
}

export default Registration;