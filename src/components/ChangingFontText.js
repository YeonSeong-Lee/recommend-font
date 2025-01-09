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
  const [isChanging, setIsChanging] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsChanging(true)
      // 애니메이션이 끝난 후 다음 폰트로 변경
      setTimeout(() => {
        setCurrentFontIndex((prevIndex) => (prevIndex + 1) % fonts.length)
        setIsChanging(false)
      }, 150) // 애니메이션 중간 지점에서 폰트 변경
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <span
      style={{
        fontFamily: fonts[currentFontIndex],
        display: 'inline-block',
        transition: 'all 0.3s ease',
        transform: isChanging ? 'scale(1.1)' : 'scale(1)',
        opacity: isChanging ? 0.7 : 1,
      }}
    >
      완벽한 폰트
    </span>
  )
} 