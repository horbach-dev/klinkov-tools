declare module '*.scss'

type TBreakpoints = 'sm' | 'xsm' | 'md' | 'xmd' | 'no' | 'xno' | 'lg' | 'xlg'

declare const breakpoints: {
  [key in TBreakpoints]: number
}

declare const __CONFIG__ : any

declare const __TRANSLATIONS_DEFAULT__: any
