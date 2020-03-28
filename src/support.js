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

export const utf8 = utf8String => {
  return utf8String
    .replace(
      /[\u00e0-\u00ef][\u0080-\u00bf][\u0080-\u00bf]/g, // 3-byte chars
      c => {
        // (note parentheses for precedence)
        var cc =
          ((c.charCodeAt(0) & 0x0f) << 12) |
          ((c.charCodeAt(1) & 0x3f) << 6) |
          (c.charCodeAt(2) & 0x3f)
        return String.fromCharCode(cc)
      }
    )
    .replace(
      /[\u00c0-\u00df][\u0080-\u00bf]/g, // 2-byte chars
      c => {
        // (note parentheses for precedence)
        var cc = ((c.charCodeAt(0) & 0x1f) << 6) | (c.charCodeAt(1) & 0x3f)
        return String.fromCharCode(cc)
      }
    )
    .replace("Ã‘", "Ñ")
}
