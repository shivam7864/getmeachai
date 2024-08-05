
import PaymentPage from '@/components/PaymentPage'
import connectDb from '@/database/connectDb'
import User from '@/models/User'
import Image from 'next/image'
import { notFound } from 'next/navigation'

import React from 'react';

const Username = async({params}) => {
  

    const chechUser = async()=>{
      await connectDb();
      let user= await User.findOne({username:params.username});
      if(!user){
        return notFound();
      }
    }
    await chechUser();
    return (
      <>
        <PaymentPage username={params.username} />
      </>
    );
  }
// };

export default Username

export async function generateMetadata({params}){
  return{
    title: `Support ${params.username} - Get Me A Chai`
  }
}
