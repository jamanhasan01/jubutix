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
    // Called whenever a JWT is created or updated
    async jwt({ token, user }) {
      if (user) {
        // On first login, attach user info to token

        token.name = user.name
        token.email = user.email
      }
      return token
    },

    // Called whenever a session is checked (client-side)
    async session({ session, token }) {
      if (token) {
        session.user = {
          name: token.name,
          email: token.email,
        }
      }
      return session
    },
    
  },
})

// This is the crucial part that fixes the 405 error
export { handler as GET, handler as POST }
