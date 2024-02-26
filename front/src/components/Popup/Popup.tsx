import React, { useEffect } from 'react'
import classnames from 'classnames'
import useStore from '$hooks/useStore'
import UserStore from '$stores/UserStore'

const Popup = () => {
  const [popup] = useStore(UserStore, store => store.popup)

  useEffect(() => {}, [popup])


  return (
    <div className={classnames('coin-popup', popup && 'coin-popup_show')}>

    </div>
  )
}

export default Popup
