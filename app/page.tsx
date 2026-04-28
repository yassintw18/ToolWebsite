"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function RootPage() {
  const router = useRouter()

  useEffect(() => {
    router.replace('/en')
  }, [router])

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Redirecting...</h1>
      <p>Taking you to the English version...</p>
    </div>
  )
}

