"use client"
import React,{useEffect, useState} from 'react'
import { useSession, signIn, signOut } from "next-auth/react"

import { useRouter } from 'next/navigation'
import { fetchUserDetails, updateProfile } from '@/actions/userActions'
import { Bounce, ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const Dashboard = () => {
    const {data:session,update}=useSession();
    const router=useRouter()
    const [form, setform]=useState({})

    useEffect(() => {
        getData()
      if(!session){
        router.push('/login');
        console.log(session);
      }
    }, [router,session])

    const getData = async()=>{
        let u = await fetchUserDetails(session?.user.name);
        setform(u);
    }
    const handleChange = (e)=>{
        setform({
            ...form,
            [e.target.name]:e.target.value
        })
    }

    const handleSubmit = async(e)=>{
        let a = await updateProfile(e,session.user.name);
        toast('Profile Updated Successfully', {
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
    
  return (
    <>
    <ToastContainer position='top-right' autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme='light' />
    <div className='container mx-auto py-5 px-6'>
        <h1 className='text-center my-5 text-3xl font-bold'>Welcome to your Dashboard</h1>
        
        <form className='max-w-2xl mx-auto' action={handleSubmit}>
            <div className="my-2">
                <label htmlFor='name' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Name</label>
                <input value={form.name?form.name: ""} onChange={handleChange} type='text' name='name' id='name' className='block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'/>
            </div>

            <div className="my-2">
                <label htmlFor='email' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Email</label>
                <input value={form.email?form.email: ""} onChange={handleChange} type='email' name='email' id='email' className='block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'/>
            </div>

            <div className="my-2">
                <label htmlFor='username' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Username</label>
                <input value={form.username?form.username: ""} onChange={handleChange} type='text' name='username' id='username' className='block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'/>
            </div>

            <div className="my-2">
                <label htmlFor='profilepic' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Profile Picture</label>
                <input value={form.profilepic?form.profilepic: ""} onChange={handleChange} type='text' name='profilepic' id='profilepic' className='block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'/>
            </div>

            <div className="my-2">
                <label htmlFor='coverpic' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Cover Picture</label>
                <input value={form.coverpic?form.coverpic: ""} onChange={handleChange} type='text' name='coverpic' id='coverpic' className='block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'/>
            </div>

            <div className="my-2">
                <label htmlFor='razorpayid' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Razorpay Id</label>
                <input value={form.razorpayid?form.razorpayid: ""} onChange={handleChange} type='text' name='razorpayid' id='razorpayid' className='block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'/>
            </div>

            <div className="my-2">
                <label htmlFor='razorpaysecret' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Rajorpay Secret</label>
                <input value={form.razorpaysecret?form.razorpaysecret: ""} onChange={handleChange} type='text' name='razorpaysecret' id='razorpaysecret' className='block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'/>
            </div>

            <div className="my-6">
            <button type="submit" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 block w-full">Save</button>
            </div>

        </form>
    </div>
    </>
  )
}

export default Dashboard
