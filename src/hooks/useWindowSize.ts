import { useEffect, useState } from 'react'
import { useDebounce } from '$hooks/useDebounce'



export const useWindowSizeListener = () => {
  const [state, setState] = useState({
    innerWidth: window.innerWidth,
    innerHeight: window.innerHeight,
    clientWidth: document.documentElement.clientWidth,
  })

  useEffect(() => {
    handleResize()

    window.addEventListener('resize', debouncedHandleResize)

    return () => {
      window.removeEventListener('resize', debouncedHandleResize)
    }
  }, [])

  const handleResize = () => {
    setState({
      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight,
      clientWidth: document.documentElement.clientWidth,
    })
  }

  const debouncedHandleResize = useDebounce(handleResize, 300)

  return state
}

export default useWindowSizeListener
