export function FontText({ font, style, children }) {
  return (
    <span
      className={`mt-5 ${font?.className} text-6xl md:text-6xl font-bold text-gray-900 dark:text-gray-100 transition-colors duration-200`}
      style={{
        fontWeight: font.weight,
        display: 'inline-block',
        letterSpacing: '-0.02em',
        ...style
      }}
    >
      {children}
    </span>
  )
}

export function FontLabel({ fontName, style }) {
  return (
    <span 
      className="text-xs text-gray-500 dark:text-gray-400 mt-1 transition-colors duration-200"
      style={style}
    >
      {fontName}
    </span>
  )
} 