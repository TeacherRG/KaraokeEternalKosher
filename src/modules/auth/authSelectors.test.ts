/**
 * Unit tests for the auth module selectors.
 */

import { describe, it, expect } from 'vitest'
import type { UserState } from 'store/modules/user'
import {
  selectUserId,
  selectUsername,
  selectName,
  selectRoomId,
  selectIsAuthenticated,
  selectIsGuest,
  selectIsAdmin,
  selectAuthInfo,
} from './selectors/authSelectors'

// ---------------------------------------------------------------------------
// Fixtures
// ---------------------------------------------------------------------------

const guestUser: UserState = {
  userId: 42,
  username: 'guest-abc12',
  name: 'GuestUser',
  roomId: 1,
  isAdmin: false,
  isGuest: true,
  dateCreated: 1700000000,
  dateUpdated: 1700000001,
}

const adminUser: UserState = {
  userId: 1,
  username: 'admin@example.com',
  name: 'Admin',
  roomId: null,
  isAdmin: true,
  isGuest: false,
  dateCreated: 1600000000,
  dateUpdated: 1600000001,
}

const unauthenticatedUser: UserState = {
  userId: null,
  username: null,
  name: null,
  roomId: null,
  isAdmin: false,
  isGuest: false,
  dateCreated: 0,
  dateUpdated: 0,
}

// Build a minimal RootState-compatible object for the selectors under test.
// The `as any` cast is intentional: we only need the `user` slice here.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const makeState = (user: UserState) => ({ user }) as any

// ---------------------------------------------------------------------------
// selectUserId
// ---------------------------------------------------------------------------

describe('selectUserId', () => {
  it('returns userId when signed in', () => {
    expect(selectUserId(makeState(guestUser))).toBe(42)
  })

  it('returns null when not signed in', () => {
    expect(selectUserId(makeState(unauthenticatedUser))).toBeNull()
  })
})

// ---------------------------------------------------------------------------
// selectUsername / selectName / selectRoomId
// ---------------------------------------------------------------------------

describe('selectUsername', () => {
  it('returns the username string', () => {
    expect(selectUsername(makeState(guestUser))).toBe('guest-abc12')
  })

  it('returns null when not signed in', () => {
    expect(selectUsername(makeState(unauthenticatedUser))).toBeNull()
  })
})

describe('selectName', () => {
  it('returns the display name', () => {
    expect(selectName(makeState(guestUser))).toBe('GuestUser')
  })
})

describe('selectRoomId', () => {
  it('returns roomId when set', () => {
    expect(selectRoomId(makeState(guestUser))).toBe(1)
  })

  it('returns null when no room', () => {
    expect(selectRoomId(makeState(adminUser))).toBeNull()
  })
})

// ---------------------------------------------------------------------------
// selectIsAuthenticated
// ---------------------------------------------------------------------------

describe('selectIsAuthenticated', () => {
  it('returns true when userId is set', () => {
    expect(selectIsAuthenticated(makeState(guestUser))).toBe(true)
    expect(selectIsAuthenticated(makeState(adminUser))).toBe(true)
  })

  it('returns false when userId is null', () => {
    expect(selectIsAuthenticated(makeState(unauthenticatedUser))).toBe(false)
  })
})

// ---------------------------------------------------------------------------
// selectIsGuest
// ---------------------------------------------------------------------------

describe('selectIsGuest', () => {
  it('returns true for guest users', () => {
    expect(selectIsGuest(makeState(guestUser))).toBe(true)
  })

  it('returns false for non-guest users', () => {
    expect(selectIsGuest(makeState(adminUser))).toBe(false)
    expect(selectIsGuest(makeState(unauthenticatedUser))).toBe(false)
  })
})

// ---------------------------------------------------------------------------
// selectIsAdmin
// ---------------------------------------------------------------------------

describe('selectIsAdmin', () => {
  it('returns true for admin users', () => {
    expect(selectIsAdmin(makeState(adminUser))).toBe(true)
  })

  it('returns false for non-admin users', () => {
    expect(selectIsAdmin(makeState(guestUser))).toBe(false)
    expect(selectIsAdmin(makeState(unauthenticatedUser))).toBe(false)
  })
})

// ---------------------------------------------------------------------------
// selectAuthInfo (memoised combined selector)
// ---------------------------------------------------------------------------

describe('selectAuthInfo', () => {
  it('adds isAuthenticated=true for a signed-in user', () => {
    const info = selectAuthInfo(makeState(guestUser))
    expect(info.isAuthenticated).toBe(true)
    expect(info.isGuest).toBe(true)
    expect(info.userId).toBe(42)
  })

  it('adds isAuthenticated=false for an unauthenticated user', () => {
    const info = selectAuthInfo(makeState(unauthenticatedUser))
    expect(info.isAuthenticated).toBe(false)
    expect(info.userId).toBeNull()
  })

  it('is memoised – returns the same object reference when input has not changed', () => {
    const state = makeState(adminUser)
    const first = selectAuthInfo(state)
    const second = selectAuthInfo(state)
    expect(first).toBe(second)
  })
})
