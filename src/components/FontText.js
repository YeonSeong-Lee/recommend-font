export function FontText({ font, style, children }) {
  return (
    <span
      className={`mt-5 ${font.className} text-6xl md:text-6xl font-bold`}
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
      className="text-xs text-gray-500 mt-1"
      style={style}
    >
      {fontName}
    </span>
  )
} 