import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AppLayout from "$components/AppLayout"
import LiquidationMap from '$components/LiquidationMap'

import './styles/default.scss'
import MainPage from "$components/MainPage"
import classnames from "classnames"
import useInitApp from "$hooks/useInitApp"

const App = () => {
  const isInitialized = useInitApp()

  return (
    <div
      id='app-wrapper'
      className={classnames('app', isInitialized && 'app_inited')}
    >
    <Routes>
      <Route element={<AppLayout />}>
        <Route
          index
          element={<MainPage isInitialized={isInitialized} />}
        />
        <Route
          path='liquidation-map'
          element={<LiquidationMap />}
        />
      </Route>
    </Routes>
    </div>
  )
}

export default App
