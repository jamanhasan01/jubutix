// app/providers.tsx
"use client" // This is the most important line

import { SessionProvider } from "next-auth/react"
import type { ReactNode } from "react"

export default function NextAuthProvider({ children }: { children: ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>
}