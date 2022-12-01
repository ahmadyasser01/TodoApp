import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,"username is required"],
        trim:true,
        minLength:3,
        unique: true
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        lowercase:true,
        unique:true,
        trim:true,
    },
    password:{
        type:String,
        trim:true,
    },
},{
    timestamps:true,
});

const User = mongoose.model('User',userSchema);
 export default User;