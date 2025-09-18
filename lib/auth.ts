// lib/auth.ts
import bcrypt from 'bcrypt'
import connectDB from './dbConnect'
import UserModel from '@/models/User.model'
import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          await connectDB()

          if (!credentials?.email || !credentials?.password) {
            throw new Error('Please provide email and password.')
          }

          const user = await UserModel.findOne({ email: credentials.email })

          if (!user) {
            throw new Error('No user found with this email.')
          }

          const isPasswordMatch = await bcrypt.compare(
            credentials.password as string,
            user.password
          )
          if (!isPasswordMatch) {
            throw new Error('Incorrect password.')
          }
          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            image: user.profileImage ?? null,
            role: user.role ?? null,
            emailVerified: user.emailVerified ?? null,
          }
        } catch (error: unknown) {
          if (error instanceof Error) {
            throw new Error(error.message)
          }
          throw new Error('An internal error occurred.')
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.name = user.name
        token.email = user.email
        token.picture = user.image ?? null
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      session.user = {
        id: token.id as string,
        name: token.name as string,
        email: token.email as string,
        image: token.picture as string | null, // pull from picture
        emailVerified: null,
      }
      return session
    },
  },

  secret: process.env.AUTH_SECRET,
})
