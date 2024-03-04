import React, { Suspense, useEffect, useState } from 'react'
import { Avatar, Flex, Modal } from 'antd'
import axios from 'axios'
import classnames from 'classnames'
import Loader from '$components/Loader'
import { CloseIcon } from '$components/Popup/CloseIcon'
import useStore from '$hooks/useStore'
import UserStore from '$stores/UserStore'

import './Popup.scss'
import CoinChart from '$components/Chart/CoinChart'

const defaultValue = '1M'

const Popup = () => {
  const [popup, setUserState] = useStore(UserStore, (store) => store.popup)

  const [data, setData] = useState([])
  const [isLoading, setLoading] = useState(false)
  const [currentValue, setCurrentValue] = useState(defaultValue)

  const getDominance = async (range) => {
    try {
      console.log(popup)
      setLoading(true)
      const res = await axios.get(`http://localhost:8083/get-coin?range=${range}&id=${popup.item["0"].id}`)

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
    if(popup.item === undefined) return
    getDominance(defaultValue)
  }, [])

  useEffect(()=>{
    if(popup.item === undefined) return
    getDominance(currentValue)
  },[currentValue,popup])

  const handleCancel = () => {
    setUserState((prevState) => ({ ...prevState, popup: { isOpen: false } }))
    const event = new KeyboardEvent('keydown', {
      key: 'Escape',
      keyCode: 27,
    });
    // @ts-ignore
    window.onCryptoBubblesBack();
    document.dispatchEvent(event);
  }

  return (
    <Modal
      open={popup.isOpen}
      onCancel={handleCancel}
      width='759px'
      centered
      footer=''
      closeIcon={<CloseIcon />}
      styles={{ content: { background: '#060604' } }}
    >
      {!data|| isLoading || !popup.item ? (
          <div style={{height:'430px'}}>
            <Loader />
          </div>
      ) : (
        <Suspense fallback={<Loader />}>
          <Flex gap='middle' style={{ position: 'relative' }} vertical>
            <Flex>
              <Flex flex={1} gap='small'>
                <Avatar size={40} alt={popup.item[0].name} src={popup.item[0].logo} />
                <Flex vertical>
                  <p className='popup__info-title'>{popup.item[0].name}</p>
                  <p className='popup__info-description'>{popup.item[0].description}</p>
                </Flex>
              </Flex>
              <Flex flex={1} vertical>
                <p className='popup__info-title'>{popup.item[1].price}</p>
                <p className='popup__info-description'>1 {popup.item[0].name}</p>
              </Flex>
            </Flex>
            <Flex gap={32}>
              <p className='popup__info-rating'>
                Рейтинг <span className='popup__info-value'>31</span>
                <span className='popup__info-green'>+128</span>
              </p>
              <p className='popup__info-rating'>
                Объем рынка <span className='popup__info-value'>{popup.item[2].volume}</span>
              </p>
              <p className={'popup__info-rating'}>
                24ч. Объем <span className='popup__info-value'>{popup.item[3].volume}</span>
              </p>
            </Flex>
            <Flex>
              <CoinChart timeUnit={currentValue} label={popup.item[0].name} data={data.data}/>
              {/*<DominanceChart bitcoinDominanceData={data} range={currentValue} onlyChart />*/}
            </Flex>
            <Flex style={{  bottom: 0, width: '100%' }} gap={32} justify={'center'}>
              <Flex onClick={()=>setCurrentValue(`1H`)} align={'center'} gap={8} vertical>
                <div
                  className={classnames(
                    'popup__percentBlock',
                    popup.item[4].percent > 0 ? 'popup__percentBlock_green' : 'popup__percentBlock_red'
                  )}
                >
                  {Math.abs(popup.item[4].percent)} %
                </div>
                <div style={{ fontWeight:currentValue === '1H'?'bold !important':'normal !important' }} className={'popup__percent-text'}>Час</div>
              </Flex>
              <Flex onClick={()=>setCurrentValue(`24H`)} align={'center'} gap={8} vertical>
                <div
                  className={classnames(
                    'popup__percentBlock',
                    popup.item[5].percent > 0 ? 'popup__percentBlock_green' : 'popup__percentBlock_red'
                  )}
                >
                  {Math.abs(popup.item[5].percent)} %
                </div>
                <div style={{ fontWeight:currentValue === '24H'?'bold':'normal' }} className={'popup__percent-text'}>День</div>
              </Flex>
              <Flex onClick={()=>setCurrentValue(`7D`)} align={'center'} gap={8} vertical>
                <div
                  className={classnames(
                    'popup__percentBlock',
                    popup.item[6].percent > 0 ? 'popup__percentBlock_green' : 'popup__percentBlock_red'
                  )}
                >
                  {Math.abs(popup.item[6].percent)} %
                </div>
                <div style={{ fontWeight:currentValue === '7D'?'bold':'normal' }} className={'popup__percent-text'}>Неделя</div>
              </Flex>
              <Flex onClick={()=>setCurrentValue(`30D`)} align={'center'} gap={8} vertical>
                <div
                  className={classnames(
                    'popup__percentBlock',
                    popup.item[7].percent > 0 ? 'popup__percentBlock_green' : 'popup__percentBlock_red'
                  )}
                >
                  {Math.abs(popup.item[7].percent)} %
                </div>
                <div style={{ fontWeight:currentValue === '30D'?'bold':'normal' }} className={'popup__percent-text'}>Месяц</div>
              </Flex>
              <Flex onClick={()=>setCurrentValue(`1Y`)} align={'center'} gap={8} vertical>
                <div
                  className={classnames(
                    'popup__percentBlock',
                    popup.item[8].percent > 0 ? 'popup__percentBlock_green' : 'popup__percentBlock_red'
                  )}
                >
                  {Math.abs(popup.item[8].percent)} %
                </div>
                <div style={{ fontWeight:currentValue === '1Y'?'bold':'normal' }} className={'popup__percent-text'}>Год</div>
              </Flex>
            </Flex>
          </Flex>
        </Suspense>
      )}
    </Modal>
  )
}

export default Popup
