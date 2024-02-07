import React, { Suspense } from 'react'
import classnames from 'classnames'
import Bubbles from '$components/Bubbles'
import Dominance from '$components/Dominance'
import FearIndicator from '$components/FearIndicator'
import GridItemWrap from '$components/GridItemWrap'
import Header from '$components/Header'
import Loader from '$components/Loader'
import Youtube from '$components/Youtube'
import useInitApp from '$hooks/useInitApp'

import './styles/default.scss'

const App = () => {
  const isInitialized = useInitApp()

  return (
    <>
      {/*{!isInitialized && <Loader isGlobal />}*/}
      <div className={classnames('app', isInitialized && 'app_inited')}>
        <div className='decor decor_left' />
        <Header />
        <div className='app__top'>
          <GridItemWrap>
            <Dominance />
          </GridItemWrap>

          <GridItemWrap title='Fear & Greed Index'>
            <Suspense fallback={<Loader />}>
              <FearIndicator />
            </Suspense>
          </GridItemWrap>

          <GridItemWrap title='Канал YouTube'>
            <Suspense fallback={<Loader />}>
              <Youtube />
            </Suspense>
          </GridItemWrap>

          <GridItemWrap>
            <Suspense fallback={<Loader />}>
              <Bubbles />
            </Suspense>
          </GridItemWrap>

          <GridItemWrap title='Telegram'>
            <div/>
          </GridItemWrap>

          <GridItemWrap title='ТОП Криптобирж'>
            <div/>
          </GridItemWrap>

          <GridItemWrap shadow={false}>
            <div/>
          </GridItemWrap>
        </div>
      </div>
    </>
  )
}

export default App
