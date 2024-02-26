import 'jest-localstorage-mock'
import '@testing-library/jest-dom'

import React from 'react'

window._stores = []
window.__INITIAL_STATE__ = {}
window.scrollTo = jest.fn()
window.HTMLElement.prototype.scrollTo = jest.fn()

jest.mock('$utils/i18n/translations', () => ({
  translations: {
    en: {},
  },
}))

jest.mock('$utils/i18n/translate', () => jest.fn(t => [t]))

jest.mock('$config', () => ({
  default_locale: 'en',
  available_locales: ['en', 'ru', 'de'],
}))
