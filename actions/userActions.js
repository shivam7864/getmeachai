'use server'
import Razorpay from 'razorpay'
import Payment from '@/models/Payment'
import connectDb from '@/database/connectDb'
import User from '@/models/User'


export const initiate = async(amount,to_username,paymentform)=>{
    await connectDb()
    
    //fetch the razorpay secret of thee user who is getting the payment
    const user = await User.findOne({username:to_username});
    
    const razorpaysecret = user.razorpaysecret;
    const razorpayid = user.razorpayid;
    var instance = new Razorpay({ key_id: razorpayid, key_secret: razorpaysecret})

    let options = {
        amount: Number.parseInt(amount),
        currency:"INR"
    }

    let x = await instance.orders.create(options)

    //create a payment object which shows a pending payment in database

    await Payment.create({
        oid:x.id,
        amount:amount/100,
        to_user:to_username,
        name:paymentform.name,
        message:paymentform.message
    })
    return x;
}

export const fetchUserDetails = async(username)=>{
    await connectDb()
    let userDetails = await User.findOne({username:username});
    // if (!userDetails) {
    //     // Handle case where user is not found
    //     return null; // or throw an error or handle it as needed
    // }
    userDetails = userDetails.toObject({flattenObjectIds:true}) 
    // console.log(userDetails);
    return userDetails
}

export const fetchpayments = async(username)=>{
    await connectDb()
    let p= await Payment.find({to_user:username,done:true}).sort({amount:-1}).limit(10).lean()
    for(let i=0;i<p.length;i++){
        p[i]._id=p[i]._id.toString();
    }
    // console.log(p);
    return p
}

export const updateProfile = async(data,oldUsername)=>{
    await connectDb()
    let newData=Object.fromEntries(data);

    if(oldUsername!== newData.username){
        let u = await User.findOne({username:newData.username});
        if(u){
            return {error:"Username already exists"}
        }
        await User.updateOne({email:newData.email},newData)

        //Now update the username in the payments table

        await  Payment.updateMany({to_user:oldUsername},{to_user:newData.username})
    }

    await User.updateOne({email:newData.email},newData)
    
}