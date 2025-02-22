import mongoose from 'mongoose';

const Admindata = mongoose.Schema({
    name: String,
    email: String,
    password: String
})


const Admin = mongoose.model('Admin',Admindata)

export default Admin