'use client'

import { useRef, useEffect } from 'react'

export function FontTextEditable({ font, style, value, onChange }) {
  const textareaRef = useRef(null)

  useEffect(() => {
    const textarea = textareaRef.current
    if (!textarea) return

    textarea.style.height = 'auto'
    textarea.style.height = `${textarea.scrollHeight}px`
  }, [value])

  return (
    <textarea
      ref={textareaRef}
      value={value}
      onChange={onChange}
      rows={1}
      className={`mt-5 ${font?.className} text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 transition-colors duration-200 bg-transparent border-none focus:outline-none focus:ring-0 text-center overflow-visible h-auto min-w-0 whitespace-pre-wrap resize-none w-full`}
      style={{
        fontWeight: font?.weight,
        overflowWrap: 'break-word',
        maxWidth: '100%',
        ...style
      }}
    />
  )
}
