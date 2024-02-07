import { useEffect, useState } from 'react'

let _isInitialized = false

export default function useInitApp () {
  const [isInitialized, setIsInitialized] = useState(_isInitialized)

  const appInitializer = async () => {

    setIsInitialized(true)
    _isInitialized = true
  }

  useEffect(() => {
    setTimeout(() => {
      appInitializer()
    }, 5000)
  }, [])

  return isInitialized
}
