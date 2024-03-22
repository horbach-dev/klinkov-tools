import React, { Suspense, useEffect } from 'react'
import classnames from 'classnames'
import Bubbles from '$components/Bubbles'
import Dominance from '$components/Dominance'
import FearIndicator from '$components/FearIndicator'
import GridItemWrap from '$components/GridItemWrap'
import Header from '$components/Header'
import Loader from '$components/Loader'
import Popup from '$components/Popup/Popup'
import Telegram from '$components/Telegram'
import TopSellers from '$components/TopSellers'
import Youtube from '$components/Youtube'
import useInitApp from '$hooks/useInitApp'
import useStore from '$hooks/useStore'
import UserStore from '$stores/UserStore'

import './styles/default.scss'

const App = () => {
  const isInitialized = useInitApp()
  const [popup] = useStore(UserStore, (store) => store.popup as any)

  useEffect(() => {
    if (popup.isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [popup?.isOpen])

  return (
    <>
      {!isInitialized && <Loader isGlobal />}
      <div
        id='app-wrapper'
        className={classnames('app', isInitialized && 'app_inited')}
      >
        <Header />
        <div className='app__top'>
          <GridItemWrap
            id='btc-dominance'
            isAnimate={isInitialized}
          >
            <Dominance />
          </GridItemWrap>

          <GridItemWrap
            id='fear-and-greed'
            title='Fear & Greed Index'
            isAnimate={isInitialized}
          >
            <Suspense fallback={<Loader />}>
              <FearIndicator />
            </Suspense>
          </GridItemWrap>

          <GridItemWrap
            title='Канал YouTube'
            isAnimate={isInitialized}
          >
            <Suspense fallback={<Loader />}>
              <Youtube />
            </Suspense>
          </GridItemWrap>

          <GridItemWrap
            id='bubbles-section'
            isAnimate={isInitialized}
            withPadding={false}
          >
            <Suspense fallback={<Loader />}>
              <Bubbles />
            </Suspense>
          </GridItemWrap>

          <GridItemWrap
            id='telegram'
            title='Telegram'
            withPadding={false}
            isAnimate={isInitialized}
          >
            <Telegram />
          </GridItemWrap>

          <GridItemWrap
            id='top-sellers'
            title='ТОП Криптобирж'
            isAnimate={isInitialized}
          >
            <TopSellers />
          </GridItemWrap>

          <GridItemWrap
            isAnimate={isInitialized}
            shadow={false}
          >
            <footer className='footer'>
              <p className='footer__copyright'>
                {'© 2024'}
              </p>
              <p className='footer__developer'>
                {'made with 🤍 by easy agency'}
              </p>
            </footer>
          </GridItemWrap>
        </div>
      </div>
      <Popup />
    </>
  )
}

export default App
