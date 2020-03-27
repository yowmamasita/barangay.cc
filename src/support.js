import { curry, apply } from "ramda"

export const debounce = curry((fn, timeMs) => {
  let timeout

  return (...args) => {
    const later = () => {
      clearTimeout(timeout)
      apply(fn, args)
    }

    clearTimeout(timeout)
    timeout = setTimeout(later, timeMs)

    return timeout
  }
})
