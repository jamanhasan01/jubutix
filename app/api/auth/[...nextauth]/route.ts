// app/api/auth/[...nextauth]/route.ts

import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

// Your example users array
const users = [
  {
    id: '1',
    name: 'John Doe',
    email: 'test@example.com',
    password: 'password123',
  },
]

// The NextAuth configuration
const handler = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }
        const user = users.find((u) => u.email === credentials.email)
        if (!user) {
          return null
        }
        const isPasswordMatch = credentials.password === user.password
        if (isPasswordMatch) {
          const { password, ...userWithoutPassword } = user
          return userWithoutPassword
        }
        return null
      },
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      return baseUrl
    },
    async session({ session, user, token }) {
      return session
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      return token
    },
  },
})

// This is the crucial part that fixes the 405 error
export { handler as GET, handler as POST }
