import { useState, useEffect } from "react"

// don't show scrollbar in large height screens
export default function useResize(main) {
  const [height, setHeight] = useState(null)

  useEffect(() => {
    function resize() {
      let el = main.current,
        height
      el.offsetHeight < 800
        ? (height = el.scrollHeight)
        : (height = el.offsetHeight)

      setHeight(height)
    }
    window.addEventListener("resize", resize)
    return () => {
      window.removeEventListener("resize", resize)
    }
  }, [main])

  return height
}
