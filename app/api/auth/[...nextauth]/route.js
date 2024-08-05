import NextAuth from 'next-auth'
import AppleProvider from 'next-auth/providers/apple'
import FacebookProvider from 'next-auth/providers/facebook'
import GoogleProvider from 'next-auth/providers/google'
import EmailProvider from 'next-auth/providers/email'
import GithubProvider from "next-auth/providers/github"
import mongoose from 'mongoose'
import User from '@/models/User'
import Payment from '@/models/Payment'
import connectDb from '@/database/connectDb'

const handler = NextAuth({
  providers: [
    // OAuth authentication providers...
    AppleProvider({
      clientId: process.env.APPLE_ID,
      clientSecret: process.env.APPLE_SECRET
    }),
    AppleProvider({
      clientId: process.env.APPLE_ID,
      clientSecret: process.env.APPLE_SECRET
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),
    // Passwordless / email sign in
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],

  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if(account.provider == 'github'){
        //connect to the database

        await connectDb();
        //check if the user already exists in the database

        const currentUser = await User.findOne({email:email})
        if(!currentUser){
          const newUser= await User.create({
            email:user.email,
            username:user.email.split('@')[0],
          })
      }
      return true
      }
    },
    async session({ session, user, token }) {
      const dbUser = await User.findOne({email:session.user.email})
      session.user.name=dbUser.username
      return session
    }
    
  }
})

export {handler as GET, handler as POST}