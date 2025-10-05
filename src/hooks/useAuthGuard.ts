'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

type Role = 'user' | 'seller'

type UseAuthGuardOptions = {
  requiredRole: Role
  redirectTo?: string
}

export function useAuthGuard({ requiredRole, redirectTo }: UseAuthGuardOptions) {
  const router = useRouter()
  const [authorized, setAuthorized] = useState(false)
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    function evaluate() {
      const token = window.localStorage.getItem('authToken')
      const role = window.localStorage.getItem('authRole') as Role | null

      const ok = Boolean(token) && role === requiredRole
      setAuthorized(ok)
      setChecked(true)

      if (!ok) {
        const target = redirectTo ?? (requiredRole === 'user' ? '/users/login' : '/sellers/login')
        router.replace(target)
      }
    }

    evaluate()

    window.addEventListener('storage', evaluate)
    window.addEventListener('auth-change', evaluate)
    return () => {
      window.removeEventListener('storage', evaluate)
      window.removeEventListener('auth-change', evaluate)
    }
  }, [redirectTo, requiredRole, router])

  return { authorized, checked }
}
