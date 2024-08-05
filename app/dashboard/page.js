// 'use client'
import React from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import Dashboard from "@/components/Dashboard";
const DashboardPage = () => {
    
  return (
    <Dashboard/>
  )
}

export default DashboardPage

export const metadata={
  title:"Dashboard - Get Me a Chai"
}