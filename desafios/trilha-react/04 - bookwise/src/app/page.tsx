'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Page() {
  const session = useSession()
  const route = useRouter()

  useEffect(() => {
    if (session.data) {
      route.push('/app')
    }
    route.push('/auth')
  }, [route, session.data])
}
