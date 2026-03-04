import React from 'react'
import { Navigate, useLocation } from 'react-router'
import { useAppSelector } from 'store/hooks'
import { selectIsAuthenticated, selectIsAdmin } from '../../selectors/authSelectors'

interface AuthGuardProps {
  /** The protected route path (used to build the redirect-back URL). */
  path: string
  /** Where to send unauthenticated users (e.g. '/account'). */
  redirectTo: string
  children: React.ReactNode
}

/**
 * Wraps a route element and redirects unauthenticated visitors to
 * `redirectTo`, preserving the original destination in the `redirect`
 * query parameter so the app can return there after sign-in.
 *
 * For the `/player` route an additional admin check is performed: non-admin
 * users are redirected to the root instead of the sign-in page.
 */
const AuthGuard = ({ path, redirectTo, children }: AuthGuardProps) => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const isAdmin = useAppSelector(selectIsAdmin)
  const location = useLocation()

  if (!isAuthenticated) {
    const params = new URLSearchParams(location.search)
    params.set('redirect', path)
    return <Navigate to={`${redirectTo}?${params.toString()}`} replace />
  }

  if (path === '/player' && !isAdmin) {
    return <Navigate to='/' replace />
  }

  return <>{children}</>
}

export default AuthGuard
