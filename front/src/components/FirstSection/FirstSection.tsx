import React from 'react'
import logoImg from './images/logo.svg'

import './FirstSection.scss'

const FirstSection = () => {
  return (
    <>
      <section className='first-section'>
        <header className='header'>
          <div className='container'>
            <div className="header__content">
              <img src={logoImg} />
              <span>
          {'#лёгкиеденьги'}
        </span>
            </div>
          </div>
        </header>
        <div className="container">
          <div className="first-section__content">
            <div className='first-section__offer'>
              <h1 className='first-section__offer-title'>
                {'Создайте купюру с вашим фото'}
              </h1>
              <p className='first-section__offer-desc'>
                {'Автоматическая замена лиц на купюрах с помощью искусственного интеллекта. Качественные результаты, не только для развлечений.'}
              </p>
            </div>
            <div className='first-section__decor'>
              <span />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default FirstSection
