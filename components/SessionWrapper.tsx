// mark as client component
"use client";
import { SessionProvider } from "next-auth/react"

import React from 'react'
/**
 * to use this seesion wrapper, we need some env config 
NEXTAUTH_SECRET=98E3B2CC28F61492C6934531C828C //random string for generating token
NEXTAUTH_URL=http://localhost:3000/
 */

const SessionWrapper = ({children}: {children: React.ReactNode}) => {
  return (
    <SessionProvider>{children}</SessionProvider>
  )
}

export default SessionWrapper;