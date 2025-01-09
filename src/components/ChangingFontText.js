'use client'

import { useState, useEffect } from 'react'

const fonts = [
  'Pretendard',
  'Apple SD Gothic Neo',
  'Noto Sans KR',
  'Spoqa Han Sans Neo',
  'IBM Plex Sans KR'
]

export function ChangingFontText() {
  const [currentFontIndex, setCurrentFontIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFontIndex((prevIndex) => (prevIndex + 1) % fonts.length)
    }, 2000) // 2초마다 폰트 변경

    return () => clearInterval(interval)
  }, [])

  return (
    <span
      style={{
        fontFamily: fonts[currentFontIndex],
        transition: 'font-family 0.3s ease',
      }}
    >
      완벽한 폰트
    </span>
  )
} 