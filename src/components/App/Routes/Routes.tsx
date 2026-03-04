import React from 'react'
import { Routes, Route, Navigate } from 'react-router'
import { AuthGuard } from 'modules/auth'

import AccountView from 'routes/Account/views/AccountView'
import LibraryView from 'routes/Library/views/LibraryView'
import QueueView from 'routes/Queue/views/QueueView'

const PlayerView = React.lazy(() => import('routes/Player/views/PlayerView'))

const AppRoutes = () => (
  <Routes>
    <Route path='/account' element={<AccountView />} />
    <Route
      path='/library'
      element={(
        <AuthGuard path='/library' redirectTo='/account'>
          <LibraryView />
        </AuthGuard>
      )}
    />
    <Route
      path='/queue'
      element={(
        <AuthGuard path='/queue' redirectTo='/account'>
          <QueueView />
        </AuthGuard>
      )}
    />
    <Route
      path='/player'
      element={(
        <AuthGuard path='/player' redirectTo='/account'>
          <PlayerView />
        </AuthGuard>
      )}
    />
    <Route
      path='/'
      element={(
        <Navigate
          to={{
            pathname: '/library',
            search: window.location.search, // pass through search params (e.g. roomId)
          }}
          replace
        />
      )}
    />
  </Routes>
)

export default AppRoutes
