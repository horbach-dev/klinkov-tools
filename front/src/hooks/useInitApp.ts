import { useEffect, useState } from 'react'
import ContentStore from '$stores/ContentStore'

let _isInitialized = false

export default function useInitApp () {
  const [isInitialized, setIsInitialized] = useState(_isInitialized)

  const appInitializer = async () => {
    setIsInitialized(true)
    _isInitialized = true
  }

  useEffect(() => {
    fetch('/config.json')
      .then(response => response.json())
      .then(response => {
        console.log(response)
        !isInitialized && appInitializer()
        ContentStore.mergeOntoState(response)
      })
      .catch(error => console.error('Error loading config.json file', error))
  }, [])

  return isInitialized
}
