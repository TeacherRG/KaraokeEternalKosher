import { createSelector } from '@reduxjs/toolkit'
import type { RootState } from 'store/store'

export const selectUser = (state: RootState) => state.user

export const selectUserId = (state: RootState) => state.user.userId

export const selectUsername = (state: RootState) => state.user.username

export const selectName = (state: RootState) => state.user.name

export const selectRoomId = (state: RootState) => state.user.roomId

export const selectIsAuthenticated = (state: RootState) => state.user.userId !== null

export const selectIsGuest = (state: RootState) => state.user.isGuest

export const selectIsAdmin = (state: RootState) => state.user.isAdmin

/**
 * Combines all user fields into a single memoised object that also exposes
 * the derived `isAuthenticated` flag.  Prefer the individual selectors above
 * when only a single field is needed to keep re-render scope minimal.
 */
export const selectAuthInfo = createSelector(
  [selectUser],
  user => ({
    ...user,
    isAuthenticated: user.userId !== null,
  }),
)
