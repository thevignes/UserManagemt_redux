import mongoose from 'mongoose';


const Userdata = new mongoose.Schema({
name:{
    type:String,
    required:false
},
email:{
    type:String,
    required: false,
    unique: true
},
password:{
    type:String,
    required:false

},
CreatedAt:{
    type:Date,
    default:Date.now
}

})

const User = mongoose.model('User' , Userdata)
export default User