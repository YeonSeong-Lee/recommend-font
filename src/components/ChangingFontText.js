'use client'

import { useState, useEffect } from 'react'
import { FontText, FontLabel } from './FontText'

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

export function ChangingFontText({ fontMap }) {
  const [currentFontIndex, setCurrentFontIndex] = useState(0)
  const [isChanging, setIsChanging] = useState(false)

  const fonts = Object.keys(fontMap).map(fontName => ({
    name: fontName,
    ...fontMap[fontName]
  }))

  useEffect(() => {
    const interval = setInterval(() => {
      setIsChanging(true)
      setTimeout(() => {
        setCurrentFontIndex((prevIndex) => (prevIndex + 1) % fonts.length)
        setIsChanging(false)
      }, 150)
    }, 2000)

    return () => clearInterval(interval)
  }, [fonts.length])

  const animationStyle = {
    transition: 'all 0.3s ease',
    transform: isChanging ? 'scale(1.5)' : 'scale(1)',
    opacity: isChanging ? 0.7 : 1,
    color: colors[currentFontIndex]
  }

  const labelStyle = {
    transition: 'all 0.3s ease',
    opacity: isChanging ? 0 : 1
  }

  return (
    <div className="flex flex-col items-center">
      <FontText
        font={fonts[currentFontIndex]}
        style={animationStyle}
      >
        가장 비슷한 폰트
      </FontText>
      <FontLabel
        fontName={fonts[currentFontIndex].name}
        style={labelStyle}
      />
    </div>
  )
} 