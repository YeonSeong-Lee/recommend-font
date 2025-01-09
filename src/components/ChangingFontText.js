'use client'

import { useState, useEffect } from 'react'

const fonts = [
  { name: 'Pretendard', weight: 700 },
  { name: 'Apple SD Gothic Neo', weight: 700 },
  { name: 'Noto Sans KR', weight: 900 },
  { name: 'Spoqa Han Sans Neo', weight: 500 },
  { name: 'IBM Plex Sans KR', weight: 600 },
  { name: 'GmarketSans', weight: 700 },
  { name: 'SUIT', weight: 800 },
  { name: 'Wanted Sans', weight: 700 },
  { name: 'TheJamsil', weight: 600 }
]

export function ChangingFontText() {
  const [currentFontIndex, setCurrentFontIndex] = useState(0)
  const [isChanging, setIsChanging] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsChanging(true)
      setTimeout(() => {
        setCurrentFontIndex((prevIndex) => (prevIndex + 1) % fonts.length)
        setIsChanging(false)
      }, 150)
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <span
      style={{
        fontFamily: fonts[currentFontIndex].name,
        fontWeight: fonts[currentFontIndex].weight,
        display: 'inline-block',
        transition: 'all 0.3s ease',
        transform: isChanging ? 'scale(1.1)' : 'scale(1)',
        opacity: isChanging ? 0.7 : 1,
        letterSpacing: '-0.02em'
      }}
    >
      완벽한 폰트
    </span>
  )
} 