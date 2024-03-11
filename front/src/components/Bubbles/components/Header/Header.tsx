import React, { useState } from 'react'
import { Select } from 'antd'
import classnames from 'classnames'
import ArrowDropdown from '$components/Bubbles/components/ArrowDropdown'
import Input from '$components/Bubbles/components/Input'
import Title from '$components/Title'

import './Header.scss'

interface IProps {
  handleChangeTime: (v: string) => void
  isActiveBubbles: boolean
  setActiveBubbles: (v: boolean) => void
  timeValue: number
  handleChangeTop: (v: number) => void
  setInputValue: (v: any) => void
  inputValue: string
  top: number
}

const Header = ({
  isActiveBubbles,
  setActiveBubbles,
  setInputValue,
  inputValue,
  handleChangeTime,
  timeValue,
  handleChangeTop,
  top,
  }: IProps) => {
  const [isFull, setFull] = useState(false)
  const isMobile = window.innerWidth <= 490

  const handleFull = () => {
    // setWasToggle(true)
    setFull(prev => {
      const bubbles = document.getElementById('bubbles-section')
      const bubbleApp = document.getElementById('bubbles-app')
      const chart = document.querySelector('.bubble-chart')

      if (bubbles && chart && bubbleApp) {
        if (!prev) {
          bubbles.classList.add('full-screen')
          document.body.style.overflow = 'hidden'
          chart.style.height = 'calc(100% - 56px)'
          bubbleApp.style.height = '100%'
        } else {
          bubbles.classList.remove('full-screen')
          document.body.style.overflow = 'auto'
          bubbleApp.style.height = '100%'
        }
      }

      return !prev
    })
  }

  return (
    <div
      className={classnames('bubbles-header', !isActiveBubbles && 'bubbles-header_is-bubbles')}
    >
      <Title>
        {'cryptocurrency'}
      </Title>
      <div style={{display:'flex',flexDirection:isMobile?'column':'row',width:'100%'}} className='bubbles-header__right'>
        <Select
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            value={top}
            style={{width:isMobile?'100%':'unset'}}
            className='bubbles-header__select'
            suffixIcon={<ArrowDropdown />}
            onChange={handleChangeTop}
            options={[
              { value: 0, label: 'топ 100' },
              { value: 1, label: 'топ 200' },
              { value: 2, label: 'топ 300' },
            ]}
        />
        <div style={{display:'flex',justifyContent:isMobile?'space-between':'flex-start',width:'100%'}}>
          {isActiveBubbles ? (
              <Select
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-expect-error
                  value={timeValue}
                  className='bubbles-header__select'
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
          ) : (
              <Input
                  setValue={setInputValue}
                  value={inputValue}
                  placeholder='Искать криповалюту'
              />
          )}



          <div className='bubbles-header__toggle'>
            <button
                onClick={() => setActiveBubbles(true)}
                className={
                  classnames(
                      'bubbles-header__toggle-btn',
                      isActiveBubbles && 'bubbles-header__toggle-btn_active',
                  )
                }
            >
            <span
                className={
                  classnames(
                      'bubbles-header__toggle-icon',
                      'bubbles-header__toggle-icon_bubble',
                      isActiveBubbles && 'bubbles-header__toggle-icon_bubble-active',
                  )
                }
            />
            </button>
            <div style={{display:'flex'}}>


            <button
                onClick={() => setActiveBubbles(false)}
                className={
                  classnames(
                      'bubbles-header__toggle-btn',
                      !isActiveBubbles && 'bubbles-header__toggle-btn_active',
                  )
                }
            >
            <span
                className={
                  classnames(
                      'bubbles-header__toggle-icon',
                      'bubbles-header__toggle-icon_burger',
                      !isActiveBubbles && 'bubbles-header__toggle-icon_burger-active',
                  )
                }
            />
            </button>
          </div>
          <button
              onClick={handleFull}
              className={
                classnames(
                    'bubbles-header__toggle-btn',
                    'bubbles-header__toggle-btn_full',
                    'bubbles-header__toggle-btn_active',
                )
              }
          >
          <span
              className={
                classnames(
                    'bubbles-header__toggle-icon',
                    'bubbles-header__toggle-icon_full',
                    'bubbles-header__toggle-icon_full-active',
                )
              }
          />

          </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
