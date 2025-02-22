import User from "../../Model/UserModels.js";
import bcrypt from 'bcryptjs';




export  const UserList = async (req,res)=>{
        try {
            const users = await User.find()
        return res.status(200).json(users)
        } catch (error) {
            console.log(error)
        }
}


  export const AddUser = async (req,res) =>{

    try{
    const {name,email,password} = req.body;
    if(!name || !email || !password){
        return res.status(400).json({message:'all filed are required'})
    }
    console.log(req.body)
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
        name:name, 
        email:email,
        password:hashedPassword
    })
    console.log('ivide vare ethi',newUser)
    await newUser.save()
    res.status(201).json({message:"User created successfully",newUser})
    }catch(error){
        console.log(error,'something error')
        return res.status(500).json({message:"error in the server"})
    }
}


export const EditUser = async (req, res) => {
 
    try {
        const { id } = req.params;
        const { name, email, password } = req.body;
console.log(req.body)
        const updateUserData = {};
        if (name) updateUserData.name = name;
        if (email) updateUserData.email = email;
        if (password) {
            updateUserData.password = await bcrypt.hash(password, 10);
        }
        const updateUser = await User.findByIdAndUpdate(id, updateUserData, { new: true });
        console.log(updateUser)

        if (!updateUser) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({ message: "User edited successfully", user: updateUser });
    } catch (error) {
        console.error(error, 'Error in EditUser');
        return res.status(500).json({ message: "Something went wrong on the server" });
    }
};


 export   const DeleteUser = async(req,res)=>{
    console.log('monewwwwwwwww',)
        try {
            const {id} = req.params;
            console.log('the id is', id)
            const deleteUser = await User.findByIdAndDelete(id)
            console.log('deleteUser',deleteUser)
            if(!deleteUser){
                return res.status(404).json({message:"user not found"})
            }
            return res.status(200).json({message:"user deleted succesfully"})

        } catch (error) {
            return res.status(500).json({message:"sever error"})
        }
    }
