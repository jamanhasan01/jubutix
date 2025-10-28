// @/app/components/SessionAuthWrapper.tsx
'use client'

import DashboardLoading from '@/app/dashboard/components/DashboardLoading';
import { useSession } from 'next-auth/react'
import React, { ReactNode } from 'react'


interface SessionAuthWrapperProps {
  children: ReactNode;
}

const SessionAuthWrapper = ({ children }: SessionAuthWrapperProps) => {
  const { status } = useSession();

  // 1. Show the fancy skeleton during the loading phase
  if (status === 'loading') {
    return <DashboardLoading />;
  }

  // 2. Once authenticated or unauthenticated, render the children (your full dashboard layout)
  return <>{children}</>;
}

export default SessionAuthWrapper;