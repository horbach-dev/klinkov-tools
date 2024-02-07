import { useCallback, useEffect, useRef, useState } from 'react'

export const useDebounceValue = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(handler)
  }, [delay, value])

  return debouncedValue as T
}

export const useDebounce = (callback, delay) => {
  const timer = useRef<any>()

  const debouncedCallback = useCallback((...args) => {
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => {
      callback(...args)
    }, delay)
  }, [callback, delay])

  return debouncedCallback
}
