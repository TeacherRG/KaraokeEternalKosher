import { useAppSelector } from 'store/hooks'
import { selectAuthInfo } from '../selectors/authSelectors'

/**
 * Auth info returned by {@link useAuth}.
 */
export interface AuthInfo {
  userId: number | null
  username: string | null
  name: string | null
  roomId: number | null
  isAdmin: boolean
  isGuest: boolean
  /** `true` when the user is signed in (userId is not null). */
  isAuthenticated: boolean
  dateCreated: number
  dateUpdated: number
}

/**
 * Returns the current authentication state together with the derived
 * `isAuthenticated` flag.
 *
 * @example
 * const { isAuthenticated, isGuest, name } = useAuth()
 */
export const useAuth = (): AuthInfo => useAppSelector(selectAuthInfo)
