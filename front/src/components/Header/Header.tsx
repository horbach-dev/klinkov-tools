import React, { useState } from 'react'
import { CloseOutlined } from '@ant-design/icons'
import { Drawer } from 'antd'
import useStore from '$hooks/useStore'
import ContentStore from '$stores/ContentStore'
import Logo from '../../images/logo.svg'

import './Header.scss'
import {Link} from "react-router-dom";

const Header = () => {
  const [drawerVisible, setDrawerVisible] = useState(false)
  const [links] = useStore(ContentStore, store => store.links || [])

  const toggleDrawer = () => {
    setDrawerVisible(!drawerVisible)
  }

  return (
    <header className='header'>
      <div className='header__content'>
        <Link
          to='/'
          className='logo'
        >
          <img
            src={Logo}
            alt='Klinkov tools logo'
          />
        </Link>
        <div className='header-links'>
          <Link
            style={{ marginRight: 20, marginBottom: 0, marginTop: 0, padding: 0 }}
            to='/'
            className='header__menu-item'
          >
            {'Главная'}
          </Link>
          <Link
            style={{ marginRight: 20, marginBottom: 0, marginTop: 0, padding: 0 }}
            to='/liquidation-map'
            className='header__menu-item'
          >
            {'Карта ликвидаций'}
          </Link>
          <a
            style={{ marginRight: 20, marginBottom: 0, marginTop: 0, padding: 0 }}
            href={links.klinkov_capital}
            target='_blank'
            rel='noreferrer'
            className='header__menu-item'
          >
            {'Закрытый клуб'}
          </a>
          <a
            href={links.lesson}
            rel='noreferrer'
            target='_blank'
            className='header__menu-item'
            style={{ marginRight: 20, marginBottom: 0, marginTop: 0, padding: 0 }}
          >
            {'Обучение для новичков'}
          </a>
          <a
            style={{ marginRight: 10, marginBottom: 0, marginTop: 0, padding: 0 }}
            href={links.youtube}
            rel='noreferrer'
            target='_blank'
          >
            <span className='header__menu-item-icon header__menu-item-icon_youtube'/>
          </a>
          <a
            href={links.telegram}
            rel='noreferrer'
            target='_blank'
          >
            <span className='header__menu-item-icon header__menu-item-icon_telegram'/>
          </a>
          <div className='header__menu'>
            <div className='header__burger' onClick={toggleDrawer}>
              <div className='header__burger-line'/>
              <div className='header__burger-line'/>
              <div className='header__burger-line'/>
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
          backgroundColor: '#060604',
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
        <Link
          style={{ marginRight: 20, marginBottom: 0, marginTop: 0, padding: 0 }}
          to='/'
          className='header__drawer-item'
        >
          {'Главная'}
        </Link>
        <Link
          style={{ marginRight: 20, marginBottom: 0, marginTop: 0, padding: 0 }}
          to='/liquidation-map'
          className='header__drawer-item'
        >
          {'Карта ликвидаций'}
        </Link>
        <a href={links.klinkov_capital} target='_blank' rel='noreferrer' className='header__drawer-item'>
          {'Закрытый клуб'}
        </a>
        <a href={links.lesson} target='_blank' rel='noreferrer' className='header__drawer-item'>
          {'Обучение для новичков'}
        </a>
      </Drawer>
    </header>
  )
}

export default Header
