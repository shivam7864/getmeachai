import mongoose from "mongoose";
const {Schema, model} = mongoose;

const UserSchema = new Schema({
    email:{
        type:String,
        required:true
    },
    name:{
        type:String,
        // required:true
    },
    username:{
        type:String,
        required:true
    },
    profilepic:{
        type:String,
        // required:true
    },
    coverpic:{
        type:String,
        // required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    updatedAt:{
        type:Date,
        default:Date.now
    },
    razorpayid:{
        type:String
    },
    razorpaysecret:{
        type:String
    }


});

// const User = model("User", UserSchema)
export default mongoose.models.User || model("User", UserSchema);
   
