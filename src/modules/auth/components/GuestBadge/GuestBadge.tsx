import React from 'react'
import { useAppSelector } from 'store/hooks'
import { selectIsGuest, selectName } from '../../selectors/authSelectors'
import styles from './GuestBadge.css'

/**
 * A small pill badge shown in the UI when the current user is signed in as a
 * guest.  Renders nothing for regular (non-guest) users.
 */
const GuestBadge = () => {
  const isGuest = useAppSelector(selectIsGuest)
  const name = useAppSelector(selectName)

  if (!isGuest) return null

  return (
    <div className={styles.badge} title={`Signed in as guest: ${name ?? ''}`}>
      Guest
    </div>
  )
}

export default GuestBadge
