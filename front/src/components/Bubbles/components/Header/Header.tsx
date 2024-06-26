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
  mode: number
  handleChangeMode: (v: number) => void
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
  mode,
  handleChangeMode
  }: IProps) => {
  const [isFull, setFull] = useState(false)
  const isMobile = window.innerWidth <= 490


  const handleFull = () => {
    setFull(prev => {
      const bubbles = document.getElementById('bubbles-section')
      const bubbleApp = document.getElementById('bubbles-app')
      const chart = document.querySelector('.bubble-chart')

      if (bubbles && chart && bubbleApp) {
        if (!prev) {
          bubbles.classList.add('full-screen')
          bubbleApp.classList.add('full-screen-bubbles-app')
          document.body.style.overflow = 'hidden'
          chart.classList.add('full-screen-chart')
          // bubbleApp.style.height = '100%'
        } else {
          bubbles.classList.remove('full-screen')
          bubbleApp.classList.remove('full-screen-bubbles-app')
          chart.classList.remove('full-screen-chart')
          document.body.style.overflow = 'auto'
          // bubbleApp.style.height = '100%'
        }
      }

      return !prev
    })
  }


  return (
    <div
      id='bubbles-header'
      className={classnames('bubbles-header', !isActiveBubbles && 'bubbles-header_is-bubbles')}
    >
      <Title>
        {'cryptocurrency'}
      </Title>
      <div className='bubbles-header__right'>
        <Select
          value={mode}
          className='bubbles-header__select'
          suffixIcon={<ArrowDropdown />}
          onChange={handleChangeMode}
          options={[
            { value: 0, label: 'Цена' },
            { value: 1, label: 'Объем' },
          ]}
        />
        <Select
          value={top}
          className='bubbles-header__select'
          suffixIcon={<ArrowDropdown />}
          onChange={handleChangeTop}
          options={[
            { value: 0, label: 'ТОП 100' },
            { value: 1, label: '101-200' },
            { value: 2, label: '201-300' },
          ]}
        />
        <div
          className={
            classnames(
              'bubbles-header__select-input',
              !isActiveBubbles && 'bubbles-header__select-input_without-bubbles',
            )
          }
        >
          {isActiveBubbles ? (
            <Select
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-expect-error
              value={timeValue}
              className='bubbles-header__select'
              suffixIcon={<ArrowDropdown />}
              onChange={handleChangeTime}
              options={mode === 0?
                [
                  { value: 0, label: 'Час' },
                  { value: 1, label: 'День' },
                  { value: 2, label: 'Неделя' },
                  { value: 3, label: 'Месяц' },
                  { value: 4, label: 'Год' },
                ] :
                [
                  { value: 1, label: 'День' },
                  { value: 2, label: 'Неделя' },
                  { value: 3, label: 'Месяц' },
                ]
              }
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
            <div style={{ display:'flex' }}>
              <button
                name='Set active button'
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
          </div>
          <button
            name='Full screen button'
            onClick={handleFull}
            className={
              classnames(
                'bubbles-header__toggle-btn',
                'bubbles-header__toggle-btn_full',
                isFull && 'bubbles-header__toggle-btn_active',
              )
            }
          >
            <span
              className={
                classnames(
                  'bubbles-header__toggle-icon',
                      isFull ? 'bubbles-header__toggle-icon_full-active' : 'bubbles-header__toggle-icon_full',
                )
              }
            />

          </button>
        </div>
      </div>
    </div>
  )
}

export default Header
