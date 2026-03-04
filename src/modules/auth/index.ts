/**
 * Auth Module – public API.
 *
 * Provides authentication state management helpers, selectors, a route-guard
 * component, and a guest-user badge for the KaraokeEternal client.
 *
 * Hook
 * ----
 *   import { useAuth } from 'modules/auth'
 *   const { isAuthenticated, isGuest, name } = useAuth()
 *
 * Selectors
 * ---------
 *   import { selectIsAuthenticated, selectIsGuest, selectIsAdmin } from 'modules/auth'
 *
 * AuthGuard component
 * -------------------
 *   import { AuthGuard } from 'modules/auth'
 *   <AuthGuard path='/library' redirectTo='/account'>
 *     <LibraryView />
 *   </AuthGuard>
 *
 * GuestBadge component
 * --------------------
 *   import { GuestBadge } from 'modules/auth'
 *   <GuestBadge />   // renders nothing when the user is not a guest
 *
 * Types
 * -----
 *   import type { AuthInfo } from 'modules/auth'
 */

export { useAuth } from './hooks/useAuth'
export type { AuthInfo } from './hooks/useAuth'

export {
  selectUser,
  selectUserId,
  selectUsername,
  selectName,
  selectRoomId,
  selectIsAuthenticated,
  selectIsGuest,
  selectIsAdmin,
  selectAuthInfo,
} from './selectors/authSelectors'

export { default as AuthGuard } from './components/AuthGuard/AuthGuard'
export { default as GuestBadge } from './components/GuestBadge/GuestBadge'
