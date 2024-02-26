import React from 'react'
import Logo from '../../images/logo.svg'

import './Header.scss'

const Header = () => {
  return (
    <header className='header'>
      <div className='header__content'>
        <div className='logo'>
          <img
            src={Logo}
            alt='Klinkov tools logo'
          />
        </div>
        <div className='header__menu'>
          <a
            href='/'
            rel='noreferrer'
            className='header__menu-item'
          >
            {'KlinkovCapital'}
          </a>
          <a
            href='/'
            rel='noreferrer'
            className='header__menu-item'
          >
            {'Обучение'}
          </a>
          <a
            href='/'
            rel='noreferrer'
            className='header__menu-item'
          >
            <span className='header__menu-item-icon header__menu-item-icon_youtube' />
          </a>
          <a
            href='/'
            rel='noreferrer'
            className='header__menu-item'
          >
            <span className='header__menu-item-icon header__menu-item-icon_telegram' />
          </a>
        </div>
      </div>
    </header>
  )
}

export default Header
