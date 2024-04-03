import React, { useEffect, useRef, useState } from 'react'
import classnames from 'classnames'
import { client } from '$api/index'
import Header from '$components/Bubbles/components/Header'
import { performList } from '$components/Bubbles/utils'
import useStore from '$hooks/useStore'
import useWindowSizeListener from '$hooks/useWindowSize'
import ContentStore from '$stores/ContentStore'
import UserStore from '$stores/UserStore'
import CryptoList from './components/CryptoList'
import useInitBubbles from './hooks/useInitBubbles'

import './Bubbles.scss'

const Bubbles = () => {
  const [top, setTop] = useState(0)
  const [mode, setMode] = useState(0)
  const [listing, setListing] = useState<any[]>([])
  const [isActiveBubbles, setActiveBubbles] = useState(true)
  const bubblesWrapRef = useRef<any>(null)
  const [inputValue, setInputValue] = useState('')
  const [timeValue, setTimeValue] = useState(0)
  const { innerWidth, innerHeight } = useWindowSizeListener()
  const [_,setUserState] = useStore(UserStore, store => store.popup)
  const [links] = useStore(ContentStore, store => store.links || {})
  const [q, setq] = useState(true)
  const list = []

  const getItems = (index: number) => {
    console.log(listing)

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

  const [loading] = useInitBubbles(innerWidth, innerHeight, bubblesWrapRef)

  const onFindModal = (id:number) => {
    console.log(listing)

    const searched = getItems(top)[id-1]

    if(searched){
      if(id === 100) {
        // document.location = 'https://www.google.com/search?q=salam+alaikum'
        // window.open('https://www.google.com/search?q=salam+alaikum', '_blank')
        window.open(links.lesson, '_blank')
        console.log('lesson')
      } else {
        setUserState(prev => ({ ...prev, popup: { item:searched,isOpen: true } }))
      }
    }
  }

  const initModalObserver = () => {
    const asd = false

    console.log('mutationObserver')

    const mutationObserver = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          mutation.addedNodes.forEach(addedNode => {
          // const addedNode = mutation.addedNodes[0]
            if (addedNode instanceof Element) {
              const elementsWithClass = addedNode.querySelectorAll('.window-content')

              if (elementsWithClass.length > 0) {
                const rank = elementsWithClass[0].querySelectorAll('.currency-rank')

                if(rank.length){
                  const number = rank[0].querySelectorAll('.number')

                  console.log(Number(number[0].innerHTML))
                  onFindModal(Number(number[0].innerHTML))
                }
              }
            }
          })
        }
      }
    })

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true
    })
  }


  const handleChangeTop = (val) => {
    if (top === val) return

    // eslint-disable-next-line no-magic-numbers
    const ev = new CustomEvent('updateData',{ detail:(val + 1) * 100 })

    document.dispatchEvent(ev)
    setTop(val)
  }

  const handleChangeMode = (val) => {
    if (mode === val) return

    if (val === 1 && (timeValue === 0 || timeValue === 4)) {
      setTimeValue(1)

      const ev = new CustomEvent('toggle-period',{ detail: { value: 1, mode: val } })

      document.dispatchEvent(ev)
      setMode(val)
    } else {
      const ev = new CustomEvent('toggle-period',{ detail: { value: timeValue, mode: val } })

      document.dispatchEvent(ev)
      setMode(val)
    }
  }

  const handleChangeTime = val => {
    if (timeValue === val) return

    setTimeValue(val)
    document.dispatchEvent(new CustomEvent('toggle-period', { detail: { value: val, mode } }))
  }

  const getListing = async () => {
    try {
      const res = await client.get('/get-listing')
      const items = performList(res.data.data.cryptoCurrencyList)

      setListing([...items])
    } catch(ex) {
      console.log(ex)
    }
  }

  useEffect(() => {
    getListing()
  }, [])

  useEffect(() => {
    if (listing.length) {
      initModalObserver()
    }
  }, [listing])

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
        mode={mode}
        handleChangeMode={handleChangeMode}
      />
      <main></main>
      <div
        style={{
          visibility: isActiveBubbles ? 'visible' : 'hidden'
        }}
        id='bubbles-app'
        className={
          classnames(
            'web',
            'bubbles-container-hi',
            'bubbles-container-hi_show'
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
