'use client'

import { redirect } from 'next/navigation'
import { PropsWithChildren } from 'react'

import { useWebSocket } from '@/src/hooks/useWebSocket'

export default function LoggedInLayout({ children }: PropsWithChildren) {
  const { login } = useWebSocket()

  if (!login) {
    return redirect('/login')
  }

  return children
}
