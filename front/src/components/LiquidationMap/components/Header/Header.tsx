import React, { useCallback } from 'react'
import InputChecker from "../inputCheker"
import Title from "$components/Title"

import './Header.scss'
import ArrowDropdown from "$components/Bubbles/components/ArrowDropdown";
import {Select} from "antd";

const Header = ({ loadData, checkboxActions, setPeriod, period, platform, setPlatform }) => {

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

  const handleSetPlatform = useCallback((v) => {
    setPlatform(v)
    loadData()
  }, [setPlatform, loadData])

  const handleSetPeriod = useCallback((v) => {
    setPeriod(v)
    loadData()
  }, [setPeriod, loadData])

  return (
    <div className='liquidation-map-header'>
      <div className="liquidation-map-header__top">
        <Title>
          {'Карта ликвидаций'}
        </Title>
        <div className="liquidation-map-header__top-actions">
          <Select
            // disabled={!data.length || isLoading}
            defaultValue={'binance'}
            value={platform}
            className='bubbles__select'
            suffixIcon={<ArrowDropdown/>}
            onChange={handleSetPlatform}
            options={[
              { value: 'binance', label: 'Binance BTC/USDT Perpetual' },
              { value: 'bybit', label: 'Bybit BTC/USDT Perpetual' },
            ]}
          />
          <Select
            // disabled={isLoading}
            defaultValue={'1d'}
            value={period}
            className='bubbles__select'
            suffixIcon={<ArrowDropdown/>}
            onChange={handleSetPeriod}
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

export default Header
