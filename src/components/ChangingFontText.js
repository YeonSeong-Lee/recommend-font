'use client'

import { useState, useEffect } from 'react'
import {
  notoSansKr,
  blackHanSans,
  jua,
  doHyeon,
  stylish,
  poorStory,
  nanumPenScript,
  gaegu,
  pretendard
} from '@/lib/fonts'


const fonts = [
  { name: 'Pretendard', weight: 700, className: pretendard.className },
  { name: 'Noto Sans KR', weight: 900, className: notoSansKr.className },
  { name: 'Black Han Sans', weight: 400, className: blackHanSans.className },
  { name: 'Jua', weight: 400, className: jua.className },
  { name: 'Do Hyeon', weight: 400, className: doHyeon.className },
  { name: 'Stylish', weight: 400, className: stylish.className },
  { name: 'Poor Story', weight: 400, className: poorStory.className },
  { name: 'Nanum Pen Script', weight: 400, className: nanumPenScript.className },
  { name: 'Gaegu', weight: 700, className: gaegu.className }
]

const colors = [
  '#2563eb', // blue-600
  '#db2777', // pink-600
  '#7c3aed', // violet-600
  '#059669', // emerald-600
  '#d97706', // amber-600
  '#dc2626', // red-600
  '#4f46e5', // indigo-600
  '#0891b2', // cyan-600
  '#ea580c'  // orange-600
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
    <div className="flex flex-col items-center">
      <span
        className={`mt-5 ${fonts[currentFontIndex].className}`}
        style={{
          fontWeight: fonts[currentFontIndex].weight,
          color: colors[currentFontIndex],
          display: 'inline-block',
          transition: 'all 0.3s ease',
          transform: isChanging ? 'scale(1.5)' : 'scale(1)',
          opacity: isChanging ? 0.7 : 1,
          letterSpacing: '-0.02em'
        }}
      >
        완벽한 폰트
      </span>
      <span 
        className="text-xs text-gray-500 mt-1"
        style={{
          transition: 'all 0.3s ease',
          opacity: isChanging ? 0 : 1
        }}
      >
        {fonts[currentFontIndex].name}
      </span>
    </div>
  )
} 