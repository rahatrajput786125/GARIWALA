import { useEffect, useRef, useState } from 'react'

/**
 * Animates a number from 0 to `target` using an ease-out cubic curve.
 * @param {number} target  - Final value
 * @param {number} duration - Animation duration in ms
 * @param {boolean} started - Whether to begin counting
 */
export const useCountUp = (target, duration = 2000, started = false) => {
  const [count, setCount] = useState(0)
  const rafRef = useRef(null)

  useEffect(() => {
    if (!started) return
    const startTime = performance.now()

    const tick = (now) => {
      const elapsed  = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased    = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) rafRef.current = requestAnimationFrame(tick)
      else setCount(target)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [target, duration, started])

  return count
}
