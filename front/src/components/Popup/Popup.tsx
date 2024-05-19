import React, { Suspense, useEffect, useState } from 'react'
import { Avatar, Flex, Modal } from 'antd'
import classnames from 'classnames'
import { client } from '$api/index'
import CoinChart from '$components/Chart/CoinChart'
import Loader from '$components/Loader'
import { CloseIcon } from '$components/Popup/CloseIcon'
import useStore from '$hooks/useStore'
import useWindowSizeListener from '$hooks/useWindowSize'
import UserStore from '$stores/UserStore'

import './Popup.scss'


const defaultValue = '1M'

const Popup = () => {
  const [popup, setUserState] = useStore(UserStore, (store) => store.popup as any)

  const [data, setData] = useState([])
  const [isLoading, setLoading] = useState(false)
  const [currentValue, setCurrentValue] = useState(defaultValue)
  const [verticalOffset, setVerticalOffset] = useState(0)
  const [startY, setStartY] = useState(0)
  const { innerWidth } = useWindowSizeListener()
  const [diff, setDiff] = useState(0)
  const isMobile = innerWidth <= 768
  const [diffColor, setDiffColor] = useState('white')

  const getDominance = async (range) => {
    try {
      setLoading(true)
      console.log(popup)

      const res = await client.get(`/get-coin?range=${range}&id=${popup.item['0'].id}`)

      //setCurrentValue(range)
      setData(res.data)
    } catch (ex) {
      // error
      console.log(ex)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (popup.item === undefined) return
    getDominance(defaultValue)
  }, [])

  useEffect(() => {
    if (!popup.isOpen) {
      setVerticalOffset(0)
    }

    if (popup.item === undefined) return
    getDominance(currentValue)

  }, [currentValue, popup])

  useEffect(() => {
    if (popup.item === undefined) return

    const diffValue = data.data && (+popup.item[1].price.slice(0, -1) - Object.values(data.data)[0].v[0]).toFixed(6)

    setDiff(diffValue)

    if (diffValue === 0) {
      setDiffColor('white')
    }

    if (diffValue > 0) {
      setDiffColor('rgba(117, 217, 182, 1)')
    }

    if (diffValue < 0) {
      setDiffColor('rgb(236, 132, 119)')
    }

  }, [data, popup])

  const handleCancel = () => {
    setUserState((prevState) => ({ ...prevState, popup: { isOpen: false } }))

    const event = new KeyboardEvent('keydown', {
      key: 'Escape',
      keyCode: 27,
    })

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    window.onCryptoBubblesBack()
    document.dispatchEvent(event)
  }

  // Обработчик события свайпа вниз
  const handleTouchMove = (e) => {
    if (e.touches.length === 1) {
      const touch = e.touches[0]

      setVerticalOffset(touch.clientY - startY) // Обновляем вертикальное смещение
    }
  }

  const handleTouchStart = (e) => {
    if (e.touches && e.touches.length) {
      setStartY(e.touches[0].clientY)
    }
  }

  // Обработчик события отпускания пальца
  const handleTouchEnd = () => {
    if (verticalOffset >= 50) {
      handleCancel() // Закрываем попап, если достигнуто нужное смещение
    } else {
      setVerticalOffset(0) // Возвращаем попап на место
    }
  }

  useEffect(() => {
    console.log(currentValue)
  }, [currentValue])

  if (isMobile && popup.isOpen) {
    return (
      <div
        style={{
          position: 'fixed',
          top: `${verticalOffset}px`, // Используем вертикальное смещение для позиционирования попапа
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: '#151514',
          zIndex: 999,
        }}
      >
        <div style={{ height: '100vh', overflowY: 'auto' }} className='popup-content'>
          {!data || !popup.item ? (
            <Loader/>
          ) : (
            <Suspense fallback={<Loader/>}>
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start'
                }}>
                <div
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                  style={
                    {
                      width: '100%',
                      display: 'flex',
                      position: 'relative',
                      justifyContent: 'center',
                      padding: 10
                    }
                  }
                >
                  <button
                    style={
                      {
                        position: 'absolute',
                        right: 10,
                        top: 16,
                      }
                    }
                    onClick={() => handleCancel()}
                  >
                    <CloseIcon/>
                  </button>
                  <div
                    id='cancel-popup'
                    style={{
                      cursor: 'pointer',
                      height: '3px',
                      width: '32%',
                      backgroundColor: '#ccc',
                      borderRadius: '1.5px',
                      margin: '16px 0 24px'
                    }}>
                  </div>
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    padding: '0 16px',
                  }}>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                    }}>
                    <div
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'flex-start',
                          // backgroundColor: '#060604',
                          padding: '12px 16px 10px 12px',
                          borderRadius: 8
                        }}
                    >
                      <Avatar size={40} alt={popup.item[0].name} src={popup.item[0].logo}/>
                      <div style={{ marginLeft: '10px' }}>
                        <div
                            style={{
                              display: 'flex',
                              textAlign: 'center'
                            }}
                        >
                          <div
                              style={{
                                display: 'flex',
                                alignItems: 'center'
                              }}
                          >
                            <p className='popup__info-title'>
                              {popup.item[0].name}
                              <span
                                  style={{
                                    fontWeight: 100,
                                    color: 'rgba(227, 230, 233, .5)',
                                    fontSize: 20
                                  }}
                              >
                                {' | '}
                              </span>
                              {popup.item[1].price}
                              {' '}
                              <span
                                  style={{
                                    color: diffColor
                                  }}
                              >
                                {diff > 0 ? '+' + diff?.toString() + '$' : diff?.toString() + '$'}
                              </span>
                            </p>
                          </div>
                          <div className='img-center'>
                            <a
                                target='_blank'
                                href={`https://coinmarketcap.com/currencies/${popup.item[0].slug}`}
                                rel='noreferrer'
                            >
                              <div className='img-center img-padding'>
                                <img src='/icons/coinmarketcap.svg' width={46} alt='coinmarketcap'/>
                              </div>
                            </a>
                          </div>
                        </div>
                        <p className='popup__info-description'>
                          {popup.item[0].description}
                        </p>
                      </div>
                    </div>
                  </div>
                  {/*<div*/}
                  {/*  style={{*/}
                  {/*    display: 'flex',*/}
                  {/*    flexDirection: 'column',*/}
                  {/*    alignItems: 'flex-end',*/}
                  {/*    justifyContent: 'flex-start'*/}
                  {/*  }}>*/}
                  {/*  <p className='popup__info-title'>*/}
                  {/*    {popup.item[1].price}*/}
                  {/*  </p>*/}
                  {/*  <p className='popup__info-description'>*/}
                  {/*    {popup.item[0].name}*/}
                  {/*  </p>*/}
                  {/*</div>*/}
                </div>
                <Flex
                    style={{ width: '100%', padding: '0 16px' }}
                    gap={8}
                    justify='space-between'
                >
                  <p
                      className='popup__info-rating'
                      style={{ display: 'flex', flexDirection: 'column', margin: '10px 0' }}>
                    {'Рейтинг '}
                    <div>
                      <span className='popup__info-value'>
                        {popup.item[0].rank}
                      </span>
                      {/*<span className='popup__info-green'>*/}
                      {/*  {'+128'}*/}
                      {/*</span>*/}
                    </div>
                  </p>
                  <p className='popup__info-rating' style={{ display: 'flex', flexDirection: 'column' }}>
                    {'Объем рынка'}
                    <span className='popup__info-value'>
                      {popup.item[2].volume}
                    </span>
                  </p>
                  <p className='popup__info-rating' style={{ display: 'flex', flexDirection: 'column' }}>
                    {'24ч. Объем'}
                    <span className='popup__info-value'>
                      {popup.item[3].volume}
                    </span>
                  </p>
                </Flex>
                <Flex style={{ paddingLeft: 16, paddingRight: 16, justifyContent: 'space-around', width: '100%' }}>
                  <div>
                    {/*<div*/}
                    {/*  style={{*/}
                    {/*    borderRadius: '50%',*/}
                    {/*    backgroundColor: '#ffffff1f',*/}
                    {/*    // transition: background-color .4s;*/}
                    {/*    margin: 0,*/}
                    {/*    padding: '8px 8px 6px',*/}
                    {/*    display: 'inline-flex',*/}
                    {/*    // alignItems: 'center',*/}
                    {/*    // gap: 5,*/}
                    {/*    whiteSpace: 'nowrap',*/}
                    {/*    marginRight: 10*/}
                    {/*  }}*/}
                    {/*>*/}
                    {/*  <a*/}
                    {/*    target='_blank'*/}
                    {/*    href={`https://coinmarketcap.com/currencies/${popup.item[0].slug}`}*/}
                    {/*    rel='noreferrer'*/}
                    {/*  >*/}
                    {/*    <img src='/icons/coinmarketcap.svg' width={20} alt='coinmarketcap'/>*/}
                    {/*  </a>*/}
                    {/*</div>*/}
                    <p
                      className='popup__info-traiding'
                      style={{
                        borderRadius: 12,
                        backgroundColor: '#ffffff1f',
                        // transition: background-color .4s;
                        margin: 0,
                        padding: '10px 15px 7px 10px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        // gap: 5,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      <div
                          style={{
                            display: 'flex',
                            alignItems: 'center'
                          }}
                      >
                        <p className='popup__info-rating'>
                          {'Торгуй'}
                        </p>
                        <div className='img-center'>
                          {/*<a*/}
                          {/*    target='_blank'*/}
                          {/*    href={`https://coinmarketcap.com/currencies/${popup.item[0].slug}`}*/}
                          {/*    rel='noreferrer'*/}
                          {/*>*/}
                          {/*  <div className='img-center img-padding'>*/}
                          {/*    <img src='/icons/coinmarketcap.svg' width={32} alt='coinmarketcap'/>*/}
                          {/*  </div>*/}
                          {/*</a>*/}
                          <a
                              target='_blank'
                              href='https://partner.bybit.com/b/Klinkov'
                              rel='noreferrer'
                          >
                            <div className='img-center img-padding'>
                              <img src='/icons/bybit-popup.svg' width={32} alt='bybit'/>
                            </div>
                          </a>
                          <a
                              target='_blank'
                              href='https://bingx.com/partner/professorklinkov'
                              rel='noreferrer'
                          >
                            <div className='img-center img-padding'>
                              <img src='/icons/bingx-popup.svg' width={32} alt='bingx'/>
                            </div>
                          </a>
                        </div>
                      </div>
                      {/*<div*/}
                      {/*  // style={{padding: '3px'}}*/}
                      {/*>*/}
                      {/*  <a target='_blank' href='https://www.okx.com/join/2325727K' rel='noreferrer'>*/}
                      {/*    <span*/}
                      {/*  className='popup__info-value'*/}
                      {/*  style={{ margin: '0 4px' }}*/}
                      {/*  // style={{ padding: '3px' }}*/}
                      {/*>*/}
                      {/*      <img src='/icons/bingx-seeklogo.svg' height={16} alt='bingx'/>*/}
                      {/*    </span>*/}
                      {/*  </a>*/}
                      {/*  <a target='_blank' href='https://partner.bybit.com/b/Klinkov' rel='noreferrer'>*/}
                      {/*    <span className='popup__info-value' style={{ margin: '0 4px' }}>*/}
                      {/*      <img src='/icons/bybit-seeklogo.svg' height={19} alt='bybit'/>*/}
                      {/*    </span>*/}
                      {/*  </a>*/}
                      {/*</div>*/}

                    </p>
                  </div>
                </Flex>
                <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: '100%',
                      overflowX: 'auto'
                    }}>
                  <div style={{ minWidth: window.innerWidth - 20, height: '100%' }}>
                    <CoinChart isMobile={isMobile} timeUnit={currentValue} label={popup.item[0].name} data={data.data}/>
                  </div>
                </div>
                <div className='popup__timeline-mobile'>
                  <Flex
                    className={classnames('popup-time-item', currentValue === '1H' && 'popup-time-item_active')}
                    onClick={() => setCurrentValue('1H')}
                    align='center'
                    gap={12}
                    vertical
                  >
                    <div
                      className={classnames(
                        'popup__percentBlock',
                        popup.item[4].percent > 0 ? 'popup__percentBlock_green' : 'popup__percentBlock_red'
                      )}
                    >
                      {Math.abs(popup.item[4].percent)}
                      {' '}
                      {'%'}
                    </div>
                    <div className='popup__percent-text'>
                      {'Час'}
                    </div>
                  </Flex>
                  <Flex
                    onClick={() => setCurrentValue('1D')}
                    className={classnames('popup-time-item', currentValue === '1D' && 'popup-time-item_active')}
                    align='center'
                    gap={12}
                    vertical
                  >
                    <div
                      className={classnames(
                        'popup__percentBlock',
                        popup.item[5].percent > 0 ? 'popup__percentBlock_green' : 'popup__percentBlock_red'
                      )}
                    >
                      {Math.abs(popup.item[5].percent)}
                      {' '}
                      {'%'}
                    </div>
                    <div className='popup__percent-text'>
                      {'День'}
                    </div>
                  </Flex>
                  <Flex
                    onClick={() => setCurrentValue('7D')}
                    className={classnames('popup-time-item', currentValue === '7D' && 'popup-time-item_active')}
                    align='center'
                    gap={12}
                    vertical
                  >
                    <div
                      className={classnames(
                        'popup__percentBlock',
                        popup.item[6].percent > 0 ? 'popup__percentBlock_green' : 'popup__percentBlock_red'
                      )}
                    >
                      {Math.abs(popup.item[6].percent)}
                      {' '}
                      {'%'}
                    </div>
                    <div className='popup__percent-text'>
                      {'Неделя'}
                    </div>
                  </Flex>
                  <Flex
                    onClick={() => setCurrentValue('1M')}
                    className={classnames('popup-time-item', currentValue === '1M' && 'popup-time-item_active')}
                    align='center'
                    gap={12}
                    vertical
                  >
                    <div
                      className={classnames(
                        'popup__percentBlock',
                        popup.item[7].percent > 0 ? 'popup__percentBlock_green' : 'popup__percentBlock_red'
                      )}
                    >
                      {Math.abs(popup.item[7].percent)}
                      {' '}
                      {'%'}
                    </div>
                    <div className='popup__percent-text'>
                      {'Месяц'}
                    </div>
                  </Flex>
                  <Flex
                    className={classnames('popup-time-item', currentValue === '1Y' && 'popup-time-item_active')}
                    onClick={() => setCurrentValue('1Y')}
                    align='center'
                    gap={12}
                    vertical
                  >
                    <div
                      className={classnames(
                        'popup__percentBlock',
                        popup.item[8].percent > 0 ? 'popup__percentBlock_green' : 'popup__percentBlock_red'
                      )}
                    >
                      {Math.abs(popup.item[8].percent)}
                      {' '}
                      {'%'}
                    </div>
                    <div className='popup__percent-text'>
                      {'Год'}
                    </div>
                  </Flex>
                </div>
              </div>
            </Suspense>
          )}
        </div>
      </div>
    )
  }


  return (
    <Modal
      open={popup.isOpen}
      onCancel={handleCancel}
      width='759px'
      centered
      footer=''
      closeIcon={<CloseIcon/>}
      styles={{ content: { background: '#151514' } }}
    >
      {!data || isLoading || !popup.item ? (
        <div style={{ height: '430px' }}>
          <Loader/>
        </div>
      ) : (
        <Suspense fallback={<Loader/>}>
          <Flex gap='middle' style={{ position: 'relative' }} vertical>
            <Flex style={{ paddingLeft: 16, paddingRight: 16 }}>
              <Flex flex={1} gap='small'>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    // backgroundColor: '#060604',
                    padding: '12px 16px 10px 12px',
                    borderRadius: 8
                  }}
                >
                  <Avatar size={40} alt={popup.item[0].name} src={popup.item[0].logo}/>
                  <Flex vertical style={{ paddingLeft: 20 }}>
                    <div
                        style={{
                          display: 'flex',
                          textAlign: 'center'
                        }}
                    >
                      <div
                          style={{
                            display: 'flex',
                            alignItems: 'center'
                          }}
                      >
                        <p className='popup__info-title'>
                          {popup.item[0].name}
                          <span
                              style={{
                                fontWeight: 100,
                                color: 'rgba(227, 230, 233, .5)',
                                fontSize: 20
                              }}
                          >
                            {' | '}
                          </span>
                          {popup.item[1].price}
                          {' '}
                          <span
                              style={{
                                color: diffColor
                              }}
                          >
                            {diff > 0 ? '+' + diff?.toString() + '$' : diff?.toString() + '$'}
                          </span>
                        </p>
                      </div>
                      <div className='img-center'>
                        <a
                            target='_blank'
                            href={`https://coinmarketcap.com/currencies/${popup.item[0].slug}`}
                            rel='noreferrer'
                        >
                          <div className='img-center img-padding'>
                            <img src='/icons/coinmarketcap.svg' width={46} alt='coinmarketcap'/>
                          </div>
                        </a>
                      </div>
                    </div>
                    <p className='popup__info-description'>
                      {popup.item[0].description}
                    </p>
                  </Flex>
                  {/*<Flex flex={1} vertical justify='start' align='stretch'>*/}
                  {/*<p className='popup__info-title'>*/}
                  {/*  {popup.item[1].price}*/}
                  {/*</p>*/}
                  {/*<p className='popup__info-description'>*/}
                  {/*  {popup.item[0].name}*/}
                  {/*</p>*/}
                  {/*</Flex>*/}
                </div>
              </Flex>
            </Flex>
            <Flex gap={32} style={{ paddingLeft: 16, paddingRight: 16, justifyContent: 'space-around', alignItems: 'center' }}>
              <p className='popup__info-rating'>
                {'Рейтинг '}
                <span className='popup__info-value'>
                  {popup.item[0].rank}
                </span>
                {/*<span className='popup__info-green'>*/}
                {/*  {'+128'}*/}
                {/*</span>*/}
              </p>
              <p className='popup__info-rating'>
                {'Объем рынка '}
                <span className='popup__info-value'>
                  {popup.item[2].volume}
                </span>
              </p>
              <p className='popup__info-rating'>
                {'24ч. Объем '}
                <span className='popup__info-value'>
                  {popup.item[3].volume}
                </span>
              </p>
              <p>
                <div 
                  style={{
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <p className='popup__info-rating'>
                    {'Торгуй'}
                  </p>
                  <div className='img-center'>
                    <a
                        target='_blank'
                        href='https://partner.bybit.com/b/Klinkov'
                        rel='noreferrer'
                    >
                      <div className='img-center img-padding'>
                        <img src='/icons/bybit-popup.svg' width={32} alt='bybit'/>
                      </div>
                    </a>
                    <a
                        target='_blank'
                        href='https://bingx.com/partner/professorklinkov'
                        rel='noreferrer'
                    >
                      <div className='img-center img-padding'>
                        <img src='/icons/bingx-popup.svg' width={32} alt='bingx'/>
                      </div>
                    </a>
                  </div>
                </div>
                {/*<a target='_blank' href='https://partner.bybit.com/b/Klinkov' rel='noreferrer'>*/}
                {/*  <img src='/icons/coinmarketcap.svg' width={20} alt='coinmarketcap'/>*/}
                {/*  /!*{'Bybit'}*!/*/}
                {/*</a>*/}
                {/*{' | '}*/}
                {/*<a target='_blank' href='https://bingx.com/partner/professorklinkov' rel='noreferrer'>*/}
                {/*  {'Bingx'}*/}
                {/*</a>*/}
              </p>
            </Flex>
            {/*<Flex style={{ paddingLeft: 16, paddingRight: 16, justifyContent: 'space-around' }}>*/}
            {/*  <div>*/}
            {/*    <div*/}
            {/*        style={{*/}
            {/*          borderRadius: '50%',*/}
            {/*          backgroundColor: '#ffffff1f',*/}
            {/*          // transition: background-color .4s;*/}
            {/*          margin: 0,*/}
            {/*          padding: '8px 8px 6px',*/}
            {/*          display: 'inline-flex',*/}
            {/*        // alignItems: 'center',*/}
            {/*        // gap: 5,*/}
            {/*        whiteSpace: 'nowrap',*/}
            {/*        marginRight: 10*/}
            {/*      }}*/}
            {/*    >*/}
            {/*      <a*/}
            {/*        target='_blank'*/}
            {/*        href={`https://coinmarketcap.com/currencies/${popup.item[0].slug}`}*/}
            {/*        rel='noreferrer'*/}
            {/*      >*/}
            {/*        <img src='/icons/coinmarketcap.svg' width={20} alt='coinmarketcap'/>*/}
            {/*      </a>*/}
            {/*    </div>*/}
            {/*    <p*/}
            {/*      className='popup__info-traiding'*/}
            {/*      style={{*/}
            {/*        borderRadius: 12,*/}
            {/*        backgroundColor: '#ffffff1f',*/}
            {/*        // transition: background-color .4s;*/}
            {/*        margin: 0,*/}
            {/*        padding: '10px 15px 9px 10px',*/}
            {/*        display: 'inline-flex',*/}
            {/*        alignItems: 'center',*/}
            {/*        // gap: 5,*/}
            {/*        whiteSpace: 'nowrap',*/}
            {/*      }}*/}
            {/*    >*/}
            {/*      <span className='popup__info-value'>*/}
            {/*        {'Торгуй: '}*/}
            {/*        <a target='_blank' href='https://partner.bybit.com/b/Klinkov' rel='noreferrer'>*/}
            {/*          {'Bybit'}*/}
            {/*        </a>*/}
            {/*        {' | '}*/}
            {/*        <a target='_blank' href='https://bingx.com/partner/professorklinkov' rel='noreferrer'>*/}
            {/*          {'Bingx'}*/}
            {/*        </a>*/}
            {/*      </span>*/}
            {/*      /!*<div*!/*/}
            {/*      /!*  // style={{padding: '3px'}}*!/*/}
            {/*      /!*>*!/*/}
            {/*      /!*  <a target='_blank' href='https://www.okx.com/join/2325727K' rel='noreferrer'>*!/*/}
            {/*      /!*    <span*!/*/}
            {/*      /!*      className='popup__info-value'*!/*/}
            {/*      /!*      // style={{ padding: '3px' }}*!/*/}
            {/*      /!*    >*!/*/}
            {/*      /!*      <img src='/icons/bingx-seeklogo.svg' height={16} alt='bingx'/>*!/*/}
            {/*      /!*    </span>*!/*/}
            {/*      /!*  </a>*!/*/}
            {/*      /!*  <a target='_blank' href='https://partner.bybit.com/b/Klinkov' rel='noreferrer'>*!/*/}
            {/*      /!*    <span className='popup__info-value'>*!/*/}
            {/*      /!*      <img src='/icons/bybit-seeklogo.svg' height={19} alt='bybit'/>*!/*/}
            {/*      /!*    </span>*!/*/}
            {/*      /!*  </a>*!/*/}
            {/*      /!*</div>*!/*/}

            {/*    </p>*/}
            {/*  </div>*/}
            {/*</Flex>*/}
            <Flex>
              <CoinChart isMobile={false} timeUnit={currentValue} label={popup.item[0].name} data={data.data}/>
              {/*<DominanceChart bitcoinDominanceData={data} range={currentValue} onlyChart />*/}
            </Flex>
            <Flex style={{ bottom: 0, width: '100%' }} gap={32} justify='center'>
              <Flex
                className={classnames('popup-time-item', currentValue === '1H' && 'popup-time-item_active')}
                key='perc1' onClick={() => setCurrentValue('1H')} align='center' gap={8}
                vertical>
                <div
                  className={classnames(
                    'popup__percentBlock',
                    popup.item[4].percent > 0 ? 'popup__percentBlock_green' : 'popup__percentBlock_red'
                  )}
                >
                  {Math.abs(popup.item[4].percent)}
                  {' '}
                  {'%'}
                </div>
                <div className='popup__percent-text'>
                  {'Час'}
                </div>
              </Flex>
              <Flex
                className={classnames('popup-time-item', currentValue === '1D' && 'popup-time-item_active')}
                key='perc2' onClick={() => setCurrentValue('1D')} align='center' gap={8}
                vertical>
                <div
                  className={classnames(
                    'popup__percentBlock',
                    popup.item[5].percent > 0 ? 'popup__percentBlock_green' : 'popup__percentBlock_red'
                  )}
                >
                  {Math.abs(popup.item[5].percent)}
                  {' '}
                  {'%'}
                </div>
                <div className='popup__percent-text'>
                  {'День'}
                </div>
              </Flex>
              <Flex
                className={classnames('popup-time-item', currentValue === '7D' && 'popup-time-item_active')}
                key='perc1w' onClick={() => setCurrentValue('7D')} align='center' gap={8}
                vertical>
                <div
                  className={classnames(
                    'popup__percentBlock',
                    popup.item[6].percent > 0 ? 'popup__percentBlock_green' : 'popup__percentBlock_red'
                  )}
                >
                  {Math.abs(popup.item[6].percent)}
                  {' '}
                  {'%'}
                </div>
                <div className='popup__percent-text'>
                  {'Неделя'}
                </div>
              </Flex>
              <Flex
                className={classnames('popup-time-item', currentValue === '1M' && 'popup-time-item_active')}
                key='perc30D' onClick={() => setCurrentValue('1M')} align='center' gap={8}
                vertical>
                <div
                  className={classnames(
                    'popup__percentBlock',
                    popup.item[7].percent > 0 ? 'popup__percentBlock_green' : 'popup__percentBlock_red'
                  )}
                >
                  {Math.abs(popup.item[7].percent)}
                  {' '}
                  {'%'}
                </div>
                <div className='popup__percent-text'>
                  {'Месяц'}
                </div>
              </Flex>
              <Flex
                className={classnames('popup-time-item', currentValue === '1Y' && 'popup-time-item_active')}
                key='perc1Y' onClick={() => setCurrentValue('1Y')} align='center' gap={8}
                vertical>
                <div
                  className={classnames(
                    'popup__percentBlock',
                    popup.item[8].percent > 0 ? 'popup__percentBlock_green' : 'popup__percentBlock_red'
                  )}
                >
                  {Math.abs(popup.item[8].percent)}
                  {' '}
                  {'%'}
                </div>
                <div className='popup__percent-text'>
                  {'Год'}
                </div>
              </Flex>
            </Flex>
          </Flex>
        </Suspense>
      )}
    </Modal>
  )
}

export default Popup
