import { FontText } from '@/components/FontText'

export function FontPreview({ font, text, fontSize }) {
  return (
    <div className="p-6 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-gray-900">
          {font.name}
        </h2>
        <span className="text-sm text-gray-500">
          Weight: {font.weight}
        </span>
      </div>
      <FontText
        font={font}
        style={{
          fontSize: `${fontSize}px`,
          lineHeight: 1.5,
          marginTop: 0
        }}
      >
        {text}
      </FontText>
    </div>
  )
} 