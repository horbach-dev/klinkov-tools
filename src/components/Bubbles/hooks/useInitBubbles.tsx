import { useEffect } from 'react'


const defaultHeight = 350
const paddingVertical = 32
const headerHeight = 28

const getBubbleChart = async () => {
  return new Promise(resolve => {
    const intervalId = setInterval(() => {
      const bubbleChart= document.querySelector('.bubble-chart')

      if (bubbleChart) {
        resolve(bubbleChart)
        clearInterval(intervalId)
      }
    }, 1000)
  })
}

const useInitBubbles = (innerWidth, innerHeight, bubblesWrapRef) => {

  useEffect(() => {
      const scriptTag = document.createElement('script')

      scriptTag.src = 'assets/bubbleCode.js'
      document.head.appendChild(scriptTag)

      const cssLink1 = document.createElement('link')

      cssLink1.rel = 'stylesheet'
      cssLink1.href = 'assets/bubbleStyles.css'
      document.head.appendChild(cssLink1)

      const cssLink2 = document.createElement('link')

      cssLink2.rel = 'stylesheet'
      cssLink2.href = 'assets/reset.css'
      document.head.appendChild(cssLink2)

  }, [])

  useEffect(() => {
    (async () => {
        const height = bubblesWrapRef?.current?.getBoundingClientRect?.()?.height || defaultHeight

        console.log('height', height)

        const currentBubbleHeight = height - (paddingVertical + headerHeight)

      console.log('currentBubbleHeight', currentBubbleHeight)
        // console.log('bubbleCart', bubbleCart)

      const bubbleChart = await getBubbleChart()

      if (bubbleChart) {
        console.log('bubbleCart', bubbleChart)

        const bubbles= document.querySelector('.bubble-chart')

        if (bubbles && bubbles.style) {
          bubbles.style.height = `${currentBubbleHeight}px`
        }
      }


          // bubbleCart?.style?.height = `${currentBubbleHeight}px`
    })()
  }, [innerWidth, innerHeight, bubblesWrapRef])
}

export default useInitBubbles
