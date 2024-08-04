import React, {Suspense} from "react"
import Bubbles from '$components/Bubbles'
import Dominance from '$components/Dominance'
import FearIndicator from '$components/FearIndicator'
import GridItemWrap from '$components/GridItemWrap'
import Telegram from '$components/Telegram'
import TopSellers from '$components/TopSellers'
import Youtube from '$components/Youtube'
import Loader from "$components/Loader";

const MainPage = ({ isInitialized }) => {
  return (
    <>
      {/*<div>{'Main page'}</div>*/}
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
        id='top-sellers'
        title='ТОП Криптобирж'
        isAnimate={isInitialized}
    >
      <TopSellers />
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
        title='Канал YouTube'
        isAnimate={isInitialized}
    >
      <Suspense fallback={<Loader />}>
        <Youtube />
      </Suspense>
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
    </>
  )
}

export default MainPage
