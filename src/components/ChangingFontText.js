'use client'

import { useState, useEffect } from 'react'
import { FontText, FontLabel } from './FontText'

const colors = {
  light: [
    '#2563eb', // blue-600
    '#db2777', // pink-600
    '#7c3aed', // violet-600
    '#059669', // emerald-600
    '#d97706', // amber-600
    '#dc2626', // red-600
    '#4f46e5', // indigo-600
    '#0891b2', // cyan-600
    '#ea580c'  // orange-600
  ],
  dark: [
    '#3b82f6', // blue-500
    '#ec4899', // pink-500
    '#8b5cf6', // violet-500
    '#10b981', // emerald-500
    '#f59e0b', // amber-500
    '#ef4444', // red-500
    '#6366f1', // indigo-500
    '#06b6d4', // cyan-500
    '#f97316'  // orange-500
  ]
}

export function ChangingFontText({ fontMap }) {
  const [currentFontIndex, setCurrentFontIndex] = useState(0)
  const [isChanging, setIsChanging] = useState(false)
  const [isDark, setIsDark] = useState(false)

  const fonts = Object.keys(fontMap).map(fontName => ({
    name: fontName,
    ...fontMap[fontName]
  }))

  useEffect(() => {
    // Check if dark mode is enabled
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    setIsDark(darkModeMediaQuery.matches)

    const handleChange = (e) => setIsDark(e.matches)
    darkModeMediaQuery.addEventListener('change', handleChange)

    return () => darkModeMediaQuery.removeEventListener('change', handleChange)
  }, [])

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

  const currentColors = isDark ? colors.dark : colors.light
  const animationStyle = {
    transition: 'all 0.3s ease',
    transform: isChanging ? 'scale(1.5)' : 'scale(1)',
    opacity: isChanging ? 0.7 : 1,
    color: currentColors[currentFontIndex % currentColors.length]
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