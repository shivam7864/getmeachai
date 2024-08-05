'use client'
import { fetchUserDetails, fetchpayments, initiate } from '@/actions/userActions'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { notFound, useRouter, useSearchParams } from 'next/navigation'
import Script from 'next/script'
import React, { useState,useEffect } from 'react'
import { Bounce, ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import InfiniteScroll from 'react-infinite-scroll-component';

const PaymentPage = ({username}) => {
  
    // const { data: session } = useSession()
    
    const [paymentform, setpaymentform] = useState({name:"",message:""});
    const [currentUser, setcurrentUser] = useState({})
    const [payments, setPayments] = useState([])
    const searchParams= useSearchParams();
    const router=useRouter();
    
    useEffect(() => {
      getSuccessfulPayment();
    }, [])

    


    useEffect(() => {
      if(searchParams.get("paymentdone")=="true"){
        toast('Payment has been made', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
          });
      }
      router.push(`/${username}`)
    
      
    }, [])

    
    
    
    const handleChange = (e)=>{
        setpaymentform({
            ...paymentform,
            [e.target.name]:e.target.value
        })
    }

    const getSuccessfulPayment = async()=>{
      let user = await fetchUserDetails(username);
      setcurrentUser(user)
      let dbpayments = await fetchpayments(username)
      setPayments(dbpayments);
      // console.log(dbpayments);
    }


    const pay = async(amount)=>{

        //Get the  order id
        console.log(amount,username,paymentform);
        let a = await initiate(amount,username,paymentform);
        
        let order_id=a.id
        var options = {
            "key": currentUser.razorpayid, // Enter the Key ID generated from the Dashboard
            "amount": amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": "Get Me a Chai", //your business name
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
            "order_id": order_id, //This is a sample Order ID. Pass the obtained in the response of Step 1
            "callback_url": "http://localhost:3000/api/razorpay",
            "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
                "name" : "Gaurav Kumar", //your customer's name
                "email": "gaurav.kumar@example.com",
                "contact": "9000090000" //Provide the customer's phone number for better conversion rates 
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        };
        
        var rzp1 = new Razorpay(options);
        rzp1.open();  
    }
  return (
    <>
    <ToastContainer position='top-right' autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme='light' />


      {/* <button id="rzp-button1">Pay</button> */}
    <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>

    <div className="cover w-full bg-red-50 relative">
        <img className='object-cover w-full h-48 md:h-[350px]' src={currentUser.coverpic?currentUser.coverpic:'/patreon_banner.gif'}/>
        <div className='absolute -bottom-20 right-[39%] md:right-[45%] overflow-hidden border-white border-2 rounded-full size-32'>
          <img className='rounded-full object-cover size-32'   src={currentUser.profilepic?currentUser.profilepic:'/cat.jpg'} alt='profile pic'></img>
        </div>
      </div>
      <div className='info flex flex-col justify-center items-center my-24  gap-2'>
          <div className='font-bold text-lg'>
            @{username}
          </div>
          <div className='text-slate-400'>
            Lets help {username} get a chai!
          </div>
          <div>
          {payments.length} Payments. ₹{payments.reduce((a,b)=>a+b.amount,0)} raised
          </div>

          <div className="payment flex flex-col md:flex-row mt-11  gap-3 w-[80%]">
            <div className="supporters w-full md:w-1/2 bg-slate-900 rounded-lg text-white p-10">
              <h2 className='text-2xl text-center font-bold my-5'>Supporters</h2>
                <ul className='mx-5 text-lg'>
                  {payments.length==0 && <li>No payments yet</li>}
                  {
                    payments.map((payment,i)=>{
                        return <li className='my-4 flex gap-2 items-center'>
                        <img width={33} src='user.png' alt='user avatar'/>
                        <span>
                          
                          {payment.name} donated <span className='font-bold'>₹{payment.amount}</span> with a message {payment.message}.
                        </span>
                      </li>
                    })
                  }
                  
                </ul>
            </div>
            
            <div className="makePayment w-full md:w-1/2  bg-slate-900 rounded-lg text-white p-10">
              <h2 className="text-2xl font-bold my-5">Make a Payment</h2>
              <div className="flex gap-2 flex-col">
                <div>
                  <input onChange={handleChange} name='name' value={paymentform.name} type="text" className='w-full p-3 mb-3 rounded-lg bg-slate-800' placeholder='Enter name' />

                  <input onChange={handleChange}  type="text" name='message' value={paymentform.message} className='w-full p-3 rounded-lg mb-3 bg-slate-800' placeholder='Enter message' />

                  <input onChange={handleChange}  type="text" name='amount' value={paymentform.amount} className='w-full p-3 rounded-lg mb-3 bg-slate-800' placeholder='Enter amount' />

                  <button type="button" className="text-white  bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-full disabled:bg-slate-600 disabled:from-purple-100" disabled={paymentform.name?.length<3 || paymentform.message?.length<4 || paymentform.amount?.length<1 } onClick={()=>pay(Number.parseInt(paymentform.amount)*100)}>Pay</button>
                </div>

                {/* or choose from these amounts */}

                <div className="flex md:flex-row flex-col gap-5 mt-5">
                  <button className="bg-slate-800 p-3 rounded-lg" onClick={()=>{pay(1000)}}>Pay ₹10</button>
                  <button className="bg-slate-800 p-3 rounded-lg"  onClick={()=>{pay(2000)}}>Pay ₹20</button>
                  <button className="bg-slate-800 p-3 rounded-lg"  onClick={()=>{pay(3000)}}>Pay ₹30</button>
                </div>
              </div>
            </div>
          </div>
        </div>
    </>
  )
}

export default PaymentPage

