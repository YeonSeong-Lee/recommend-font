'use client'

export function FontTextEditable({ font, style, value, onChange }) {
  return (
    <textarea
      value={value}
      onChange={onChange}
      className={`mt-5 ${font?.className} text-6xl md:text-6xl font-bold text-gray-900 dark:text-gray-100 transition-colors duration-200 bg-transparent border-none focus:outline-none focus:ring-0 text-center overflow-visible w-auto h-auto min-w-0 whitespace-pre-wrap resize-none`}
      style={{
        fontWeight: font?.weight,
        width: 'fit-content',
        overflowWrap: 'break-word',
        ...style
      }}
    />
  )
}
