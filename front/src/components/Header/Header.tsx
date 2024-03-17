import React, { useState } from 'react'
import { CloseOutlined } from '@ant-design/icons'
import { Drawer } from 'antd'
import Logo from '../../images/logo.svg'

import './Header.scss'

const Header = () => {
  const [drawerVisible, setDrawerVisible] = useState(false)

  const toggleDrawer = () => {
    setDrawerVisible(!drawerVisible)
  }

  return (
    <header className='header'>
      <div className='header__content'>
        <div className='logo'>
          <img src={Logo} alt='Klinkov tools logo' />
        </div>
        <div style={{ display:'flex',width:'100%',justifyContent:'flex-end' }}>
          <div className='header_links' style={{ display:'flex',alignItems:'center' }}>
            <a style={{ marginRight:20,marginBottom:0,marginTop:0,padding:0 }} href='/' rel='noreferrer' className='header__drawer-item'>
              {'KlinkovCapital'}
            </a>
          </div>
          <div className='header_links' style={{ marginRight:20,display:'flex',alignItems:'center' }}>
            <a href='/' rel='noreferrer' className='header__drawer-item'>
              {'Обучение'}
            </a>
          </div>
          <a
style={{ marginRight:10,marginBottom:0,marginTop:0,padding:0 }}
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
          <div className='header__menu'>
            <div className='header__burger' onClick={toggleDrawer}>
              <div className='header__burger-line' />
              <div className='header__burger-line' />
              <div className='header__burger-line' />
            </div>
          </div>
        </div>
      </div>
      <Drawer
            title='Меню'
            placement='right'
            closable={false}
            onClose={toggleDrawer}
            visible={drawerVisible}
            className='header__drawer'
            style={{
              color: '#fff',
              backgroundColor:'#060604',
              position: 'relative'
            }}
        >
        <CloseOutlined
            style={{
              position: 'absolute',
              right: 30,
              fontSize: 40,
              top: 30
            }}
            onClick={() => setDrawerVisible(false)}
          />
        <a href='/' rel='noreferrer' className='header__drawer-item'>
          {'KlinkovCapital'}
        </a>
        <a href='/' rel='noreferrer' className='header__drawer-item'>
          {'Обучение'}
        </a>
      </Drawer>
    </header>
  )
}

export default Header
