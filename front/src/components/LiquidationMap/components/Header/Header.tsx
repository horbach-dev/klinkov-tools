import React, {memo, useState} from 'react'
import InputChecker from "../inputCheker"
import Title from "$components/Title"

import ArrowDropdown from "$components/Bubbles/components/ArrowDropdown"
import {Select} from "antd"

import './Header.scss'

const Header = ({ loadData, checkboxActions, setPeriod, period, platform, setPlatform }) => {
  const [localPeriod, setLocalPeriod] = useState(period)
  const [localPlatform, setLocalPlatform] = useState(platform)

  const {
    lineSellActive,
    setLineSellActive,
    lineBuyActive,
    setLineBuyActive,
    hundredActive,
    setHundredActive,
    fiftyActive,
    setFiftyActive,
    twentyFiveActive,
    setTwentyFiveActive,
    tenActive,
    setTenActive,
  } = checkboxActions

  const handleChangePlatform = (v) => {
    setLocalPlatform(v)

    setTimeout(() => {
      setPlatform(v)
    }, 400)
  }

  const handleChangePeriod = (v) => {
    setLocalPeriod(v)

    setTimeout(() => {
      setPeriod(v)
    }, 400)
  }

  return (
    <div className='liquidation-map-header'>
      <div className="liquidation-map-header__top">
        <Title>
          {'Карта ликвидаций'}
        </Title>
        <div className="liquidation-map-header__top-actions">
          <Select
            defaultValue={'binance'}
            value={localPlatform}
            className='bubbles__select'
            suffixIcon={<ArrowDropdown/>}
            onChange={handleChangePlatform}
            on
            options={[
              { value: 'binance', label: 'Binance BTC/USDT Perpetual' },
              { value: 'bybit', label: 'Bybit BTC/USDT Perpetual' },
            ]}
          />
          <Select
            defaultValue={'1d'}
            value={localPeriod}
            className='bubbles__select'
            suffixIcon={<ArrowDropdown/>}
            onChange={handleChangePeriod}
            options={[
              { value: 'day', label: '24 ч.' },
              { value: 'week', label: '7 д.' },
              { value: 'month', label: '1 м.' },
            ]}
          />
          <button
            className='liquidation-map-header__reload'
            onClick={loadData}
          />
        </div>
      </div>
      <div className='liquidation-map-header__checkboxies'>
        <div className="liquidation-map-header__checkboxies-wrap">
        <InputChecker
          className='liquidation-map-header__checkbox'
          label={'Cumulative Short Liquidation Leverage'}
          bgColor={'#80FFD4'}
          isChecked={lineSellActive}
          setIsChecked={setLineSellActive}
        />
        <InputChecker
          className='liquidation-map-header__checkbox'
          label={'Cumulative Long Liquidation Leverage'}
          bgColor={'#FF6756'}
          isChecked={lineBuyActive}
          setIsChecked={setLineBuyActive}
        />
        <InputChecker
          className='liquidation-map-header__checkbox'
          label={'100x Leverage'}
          bgColor={'#DB7E29'}
          isChecked={hundredActive}
          setIsChecked={setHundredActive}
        />
        <InputChecker
          className='liquidation-map-header__checkbox'
          label={'50x Leverage'}
          bgColor={'#DBB466'}
          isChecked={fiftyActive}
          setIsChecked={setFiftyActive}
        />
        <InputChecker
          className='liquidation-map-header__checkbox'
          label={'25x Leverage'}
          bgColor={'#66A3DB'}
          isChecked={twentyFiveActive}
          setIsChecked={setTwentyFiveActive}
        />
        <InputChecker
          className='liquidation-map-header__checkbox'
          label={'10x Leverage'}
          bgColor={'#C466DB'}
          isChecked={tenActive}
          setIsChecked={setTenActive}
        />
        </div>
      </div>
    </div>
  )
}

export default memo(Header)
