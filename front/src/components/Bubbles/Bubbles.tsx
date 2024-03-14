import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import classnames from 'classnames'
import Header from '$components/Bubbles/components/Header'
import { performList } from '$components/Bubbles/utils'
import useWindowSizeListener from '$hooks/useWindowSize'
import CryptoList from './components/CryptoList'
import useInitBubbles from './hooks/useInitBubbles'

import './Bubbles.scss'
import useStore from '$hooks/useStore';
import UserStore from "$stores/UserStore";
import { client } from "$api/index";

const Bubbles = () => {
  const [top, setTop] = useState(0)
  const [listing, setListing] = useState<any[]>([])
  const [isActiveBubbles, setActiveBubbles] = useState(true)
  const bubblesWrapRef = useRef<any>(null)
  const [inputValue, setInputValue] = useState('')
  const [timeValue, setTimeValue] = useState(0)
  const { innerWidth, innerHeight } = useWindowSizeListener()
  const [popup,setUserState] = useStore(UserStore, store => store.popup)

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

  const onFindModal = (id:number) => {
    const searched = getItems(top)[id-1]
    if(searched){
      if(id === 100){
        document.location = 'https://www.google.com/search?q=salam+alaikum'
      } else {
        setUserState(prev => ({ ...prev, popup: { item:searched,isOpen: true } }))
      }
    }
  }

  const initModalObserver = () => {
    const mutationObserver = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          mutation.addedNodes.forEach(addedNode => {
            if (addedNode instanceof Element) {
              const elementsWithClass = addedNode.querySelectorAll('.window-content');
              if (elementsWithClass.length > 0) {
                const rank = elementsWithClass[0].querySelectorAll('.currency-rank');
                if(rank.length){
                  const number = rank[0].querySelectorAll(`.number`)
                  onFindModal(Number(number[0].innerHTML))
                }
              }
            }
          });
        }
      }
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true
    });
  };

  initModalObserver();

  const handleChangeTop = (val) => {
    if (top === val) return

    // eslint-disable-next-line no-magic-numbers
    const ev = new CustomEvent('updateData',{ detail:(val + 1) * 100 })
    document.dispatchEvent(ev)
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
      const res = await client.get('/get-listing')
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
      <main></main>
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
