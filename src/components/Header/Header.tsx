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

      </div>
    </header>
  )
}

export default Header
