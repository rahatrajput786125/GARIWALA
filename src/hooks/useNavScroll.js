import { useState, useEffect, useRef } from 'react'

/**
 * Returns:
 *  'top'     — at the very top (scrollY < threshold)
 *  'visible' — scrolling up
 *  'hidden'  — scrolling down
 */
export const useNavScroll = (threshold = 80) => {
  const [state, setState] = useState('top')
  const lastY = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      if (y < threshold) {
        setState('top')
      } else if (y < lastY.current - 4) {
        setState('visible')   // scrolling up
      } else if (y > lastY.current + 4) {
        setState('hidden')    // scrolling down
      }
      lastY.current = y
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])

  return state
}
