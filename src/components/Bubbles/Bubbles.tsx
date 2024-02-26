import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import classnames from 'classnames'
import Header from '$components/Bubbles/components/Header'
import { performList } from '$components/Bubbles/utils'
import useWindowSizeListener from '$hooks/useWindowSize'
import CryptoList from './components/CryptoList'
import useInitBubbles from './hooks/useInitBubbles'

import './Bubbles.scss'

const Bubbles = () => {
  const [top, setTop] = useState(0)
  const [listing, setListing] = useState<any[]>([])
  const [isActiveBubbles, setActiveBubbles] = useState(true)
  const bubblesWrapRef = useRef<any>(null)
  const [inputValue, setInputValue] = useState('')
  const [timeValue, setTimeValue] = useState(0)
  const { innerWidth, innerHeight } = useWindowSizeListener()

  const getItems = (index: number) => {
    switch (index) {
      case 0:
        return listing.slice(0, 100)
      case 1:
        return listing.slice(100, 200)
      case 2:
        return listing.slice(200, 300)
      default:
        return listing
    }
  }

  useInitBubbles(innerWidth, innerHeight, bubblesWrapRef)

  const handleChangeTop = (val) => {
    if (top === val) return

    setTop(val)
  }

  const handleChangeTime = val => {
    if (timeValue === val) return

    setTimeValue(val)
    document.dispatchEvent(new CustomEvent('toggle-period', { detail: val }))
  }

  useEffect(() => {
    getListing()
  }, [])

  const getListing = async () => {
    try {
      const res = await axios.get('http://localhost:8083/get-listing')
      const items = performList(res.data.data.cryptoCurrencyList)

      setListing(items)
    } catch(ex) {
      console.log(ex)
    }
  }

  function searchByName (nameToSearch) {
    const lowercaseNameToSearch = nameToSearch.toLowerCase()

    return listing.filter(i => i['0'].name.toLowerCase().includes(lowercaseNameToSearch))
  }

  return (
    <div
      className='bubbles'
      ref={bubblesWrapRef}
    >
      <Header
        top={top}
        isActiveBubbles={isActiveBubbles}
        setActiveBubbles={setActiveBubbles}
        setInputValue={setInputValue}
        inputValue={inputValue}
        handleChangeTime={handleChangeTime}
        handleChangeTop={handleChangeTop}
        timeValue={timeValue}
      />
      <div
        style={{
          height: isActiveBubbles ? '100%' : 0,
        }}
        id='bubbles-app'
        className={
          classnames(
            'web',
            'bubbles-container-hi',
            isActiveBubbles && 'bubbles-container-hi_show'
          )
        }
      />
      {!isActiveBubbles && (
        <CryptoList items={inputValue ? searchByName(inputValue) : getItems(top)} />
      )}
    </div>
  )
}

export default Bubbles
