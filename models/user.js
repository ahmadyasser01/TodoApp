import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'

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
        unique:true,
    },
    password:{
        type:String,
        select:false
    },
},{
    timestamps:true,
});


userSchema.pre('save',async function (next){
    //check if password is not modified
    if(!this.isModified('password')) return next();
    //hash password 
    this.password = await bcrypt.hash(this.password,12);
    next();
});


//  CHECK PASSWORD CORRECTNESS 
userSchema.methods.correctPassword = async function(candidatePassword,userPassword)
{
    return await bcrypt.compare(candidatePassword,userPassword)
}
const User = mongoose.model('User',userSchema);
 export default User;