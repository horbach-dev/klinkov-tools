import React, {Suspense, useEffect} from 'react'
import Header from "$components/Header"
import Popup from "$components/Popup"
import Loader from "$components/Loader"
import {Outlet} from "react-router-dom"
import useStore from "$hooks/useStore";
import UserStore from "$stores/UserStore"

const AppLayout = () => {
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
      <Header/>
      <Popup/>
      <Suspense
        fallback={(
          <div className='loader-glob'>
            <Loader/>
          </div>
        )}
      >
        <Outlet/>
      </Suspense>
    </>
  )
}

export default AppLayout
