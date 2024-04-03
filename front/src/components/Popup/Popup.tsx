import React, { Suspense, useEffect, useState } from 'react'
import { Avatar, Flex, Modal } from 'antd'
import classnames from 'classnames'
import { client } from '$api/index'
import CoinChart from '$components/Chart/CoinChart'
import Loader from '$components/Loader'
import { CloseIcon } from '$components/Popup/CloseIcon'
import useStore from '$hooks/useStore'
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
  const isMobile = window.innerWidth <= 768

  const getDominance = async (range) => {
    try {
      setLoading(true)

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
                    <Avatar size={40} alt={popup.item[0].name} src={popup.item[0].logo}/>
                    <div style={{ marginLeft: '10px' }}>
                      <p className='popup__info-title'>
                        {popup.item[0].name}
                      </p>
                      <p className='popup__info-description'>
                        {popup.item[0].description}
                      </p>
                    </div>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-end',
                      justifyContent: 'flex-start'
                    }}>
                    <p className='popup__info-title'>
                      {popup.item[1].price}
                    </p>
                    <p className='popup__info-description'>
                      {popup.item[0].name}
                    </p>
                  </div>
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
                  <p className='popup__info-traiding'>
                    <span className='popup__info-value' style={{ padding: '5px' }}>
                      {'Торговля'}
                    </span>
                    <div
                        style={{ padding: '3px' }}
                    >
                      <a target='_blank' href='https://www.okx.com/join/2325727K' rel='noreferrer'>
                        <span
                        className='popup__info-value'
                        // style={{ padding: '3px' }}
                      >
                          <svg viewBox='0 0 24 24'>
                            <rect
                            x='1' y='1' width='22' height='22'
                            fill='#000'>
                            </rect>
                            <rect
                            x='6'
                            y='6'
                            width='4'
                            height='4'
                            fill='#fff'>
                            </rect>
                            <rect
                            x='14' y='6' width='4' height='4'
                            fill='#fff'>
                            </rect>
                            <rect
                            x='10' y='10' width='4' height='4'
                            fill='#fff'>
                            </rect>
                            <rect
                            x='6' y='14'
                            width='4'
                            height='4'
                            fill='#fff'>
                            </rect>
                            <rect
                            x='14' y='14' width='4' height='4'
                            fill='#fff'>
                            </rect>
                          </svg>
                        </span>
                      </a>
                      <a target='_blank' href='https://partner.bybit.com/b/Klinkov' rel='noreferrer'>
                        <span className='popup__info-value' style={{ padding: '3px' }}>
                          <svg viewBox='8 8 84 84'>
                            <path
                            fill='#F7A600'
                            d='m69.17248,54.28325l0,-22.3572l4.4939,0l0,22.3572l-4.4939,0z'>
                            </path>
                            <path
                            fill='white'
                            d='m16.79825,60.92435l-9.63407,0l0,-22.35719l9.24666,0c4.49394,0 7.11244,2.44919 7.11244,6.28029c0,2.4799 -1.6817,4.0825 -2.8457,4.6161c1.3894,0.6277 3.1679,2.0404 3.1679,5.0249c0,4.1749 -2.9407,6.4359 -7.04723,6.4359zm-0.74311,-18.4628l-4.39706,0l0,5.1497l4.39706,0c1.90714,0 2.97424,-1.0364 2.97424,-2.5757c0,-1.5376 -1.0671,-2.574 -2.97424,-2.574zm0.29055,9.0749l-4.68761,0l0,5.4952l4.68761,0c2.03739,0 3.00589,-1.2553 3.00589,-2.7638c0,-1.5068 -0.9703,-2.7314 -3.00589,-2.7314z'>
                            </path>
                            <path
                            fill='white'
                            d='m37.55238,51.75535l0,9.169l-4.4622,0l0,-9.169l-6.9187,-13.18819l4.8813,0l4.3002,9.01159l4.2351,-9.01159l4.8813,0l-6.917,13.18819z'>
                            </path>
                            <path
                            fill='white'
                            d='m57.20988,60.92435l-9.6341,0l0,-22.35719l9.2467,0c4.4939,0 7.1124,2.44919 7.1124,6.28029c0,2.4799 -1.6817,4.0825 -2.8457,4.6161c1.3894,0.6277 3.168,2.0404 3.168,5.0249c0,4.1749 -2.9408,6.4359 -7.0473,6.4359zm-0.7431,-18.4628l-4.3971,0l0,5.1497l4.3971,0c1.9071,0 2.9742,-1.0364 2.9742,-2.5757c0,-1.5376 -1.0671,-2.574 -2.9742,-2.574zm0.2905,9.0749l-4.6876,0l0,5.4952l4.6876,0c2.0374,0 3.0059,-1.2553 3.0059,-2.7638c0,-1.5068 -0.9685,-2.7314 -3.0059,-2.7314z'>
                            </path>
                            <path
                            fill='white'
                            d='m88.15018,42.46155l0,18.4645l-4.4939,0l0,-18.4645l-6.0136,0l0,-3.89439l16.5211,0l0,3.89439l-6.0136,0z'>
                            </path>
                          </svg>
                        </span>
                      </a>
                    </div>

                  </p>
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
                <Avatar size={40} alt={popup.item[0].name} src={popup.item[0].logo}/>
                <Flex vertical>
                  <p className='popup__info-title'>
                    {popup.item[0].name}
                  </p>
                  <p className='popup__info-description'>
                    {popup.item[0].description}
                  </p>
                </Flex>
              </Flex>
              <Flex flex={1} vertical>
                <p className='popup__info-title'>
                  {popup.item[1].price}
                </p>
                <p className='popup__info-description'>
                  {popup.item[0].name}
                </p>
              </Flex>
            </Flex>
            <Flex gap={32} style={{ paddingLeft: 16, paddingRight: 16, justifyContent: 'space-around' }}>
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
              <p className='popup__info-traiding'>
                <span className='popup__info-value' style={{ padding: '5px' }}>
                  {'Торговля'}
                </span>
                <div style={{ padding: '3px' }}>
                  <a target='_blank' href='https://www.okx.com/join/2325727K' rel='noreferrer'>
                    <span
                          className='popup__info-value'
                          style={{ padding: '3px' }}
                        >
                      <svg viewBox='0 0 24 24'>
                        <rect
                              x='1' y='1' width='22' height='22'
                              fill='#000'>
                        </rect>
                        <rect
                              x='6'
                              y='6'
                              width='4'
                              height='4'
                              fill='#fff'>
                        </rect>
                        <rect
                              x='14' y='6' width='4' height='4'
                              fill='#fff'>
                        </rect>
                        <rect
                              x='10' y='10' width='4' height='4'
                              fill='#fff'>
                        </rect>
                        <rect
                              x='6' y='14'
                              width='4'
                              height='4'
                              fill='#fff'>
                        </rect>
                        <rect
                              x='14' y='14' width='4' height='4'
                              fill='#fff'>
                        </rect>
                      </svg>
                    </span>
                  </a>
                  <a target='_blank' href='https://partner.bybit.com/b/Klinkov' rel='noreferrer'>
                    <span className='popup__info-value' style={{ padding: '3px' }}>
                      <svg viewBox='8 8 84 84'>
                        <path
                              fill='#F7A600'
                              d='m69.17248,54.28325l0,-22.3572l4.4939,0l0,22.3572l-4.4939,0z'>
                        </path>
                        <path
                              fill='white'
                              d='m16.79825,60.92435l-9.63407,0l0,-22.35719l9.24666,0c4.49394,0 7.11244,2.44919 7.11244,6.28029c0,2.4799 -1.6817,4.0825 -2.8457,4.6161c1.3894,0.6277 3.1679,2.0404 3.1679,5.0249c0,4.1749 -2.9407,6.4359 -7.04723,6.4359zm-0.74311,-18.4628l-4.39706,0l0,5.1497l4.39706,0c1.90714,0 2.97424,-1.0364 2.97424,-2.5757c0,-1.5376 -1.0671,-2.574 -2.97424,-2.574zm0.29055,9.0749l-4.68761,0l0,5.4952l4.68761,0c2.03739,0 3.00589,-1.2553 3.00589,-2.7638c0,-1.5068 -0.9703,-2.7314 -3.00589,-2.7314z'>
                        </path>
                        <path
                              fill='white'
                              d='m37.55238,51.75535l0,9.169l-4.4622,0l0,-9.169l-6.9187,-13.18819l4.8813,0l4.3002,9.01159l4.2351,-9.01159l4.8813,0l-6.917,13.18819z'>
                        </path>
                        <path
                              fill='white'
                              d='m57.20988,60.92435l-9.6341,0l0,-22.35719l9.2467,0c4.4939,0 7.1124,2.44919 7.1124,6.28029c0,2.4799 -1.6817,4.0825 -2.8457,4.6161c1.3894,0.6277 3.168,2.0404 3.168,5.0249c0,4.1749 -2.9408,6.4359 -7.0473,6.4359zm-0.7431,-18.4628l-4.3971,0l0,5.1497l4.3971,0c1.9071,0 2.9742,-1.0364 2.9742,-2.5757c0,-1.5376 -1.0671,-2.574 -2.9742,-2.574zm0.2905,9.0749l-4.6876,0l0,5.4952l4.6876,0c2.0374,0 3.0059,-1.2553 3.0059,-2.7638c0,-1.5068 -0.9685,-2.7314 -3.0059,-2.7314z'>
                        </path>
                        <path
                              fill='white'
                              d='m88.15018,42.46155l0,18.4645l-4.4939,0l0,-18.4645l-6.0136,0l0,-3.89439l16.5211,0l0,3.89439l-6.0136,0z'>
                        </path>
                      </svg>
                    </span>
                  </a>
                </div>

              </p>
            </Flex>
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
