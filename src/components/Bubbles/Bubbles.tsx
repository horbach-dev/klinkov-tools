import React, {useEffect, useRef, useState} from 'react'
import { Select } from 'antd'
import cookies from 'js-cookie'
import Title from '$components/Title'
import useWindowSizeListener from '$hooks/useWindowSize'
import ArrowDropdown from './components/ArrowDropdown'
import useInitBubbles from './hooks/useInitBubbles'

import './Bubbles.scss'

const Bubbles = () => {
  const bubblesWrapRef = useRef<any>(null)
  const [value, setValue] = useState(0)
  const { innerWidth, innerHeight } = useWindowSizeListener()

  useInitBubbles(innerWidth, innerHeight, bubblesWrapRef)

  const handleChangeTime = val => {
    if (value === val) return

    setValue(val)
    document.dispatchEvent(new CustomEvent('toggle-period', { detail: val }))
  }

  // useEffect(() => {
  //   const bubbleSetting = JSON.parse(localStorage.getItem('settings') || '{}')
  //
  //   const activeSelect = bubbleSetting?.configurations2?.find(i => i.id === bubbleSetting?.configurationId2)
  //
  //   const dd = {
  //     hour: 0,
  //     day: 1,
  //     week: 2,
  //     month: 3,
  //     year: 4,
  //   }
  //
  //   const active = activeSelect?.period ? dd[activeSelect?.period] : dd.day
  //
  //   setValue(active)
  //
  //   if (activeSelect.period === 'day' && activeSelect.size === 'marketcap') {
  //     setValue(5)
  //   }
  //
  // }, [])

  return (
    <div
      className='bubbles'
      ref={bubblesWrapRef}
    >
      <div className='bubbles__header'>
        <Title>
          {'cryptocurrency'}
        </Title>
        <Select
          defaultValue={0}
          value={value}
          className='bubbles__select'
          suffixIcon={<ArrowDropdown />}
          onChange={handleChangeTime}
          options={[
            { value: 0, label: 'Час' },
            { value: 1, label: 'День' },
            { value: 2, label: 'Неделя' },
            { value: 3, label: 'Месяц' },
            { value: 4, label: 'Год' },
            { value: 5, label: 'Обьем' },
          ]}
        />
      </div>
      <div
        style={{ height: '100%', width: '100%' }}
        id='bubbles-app'
        className='web'
      >
      </div>
    </div>
  )
}

export default Bubbles
