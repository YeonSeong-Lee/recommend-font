export function FontSelector({ fonts, selectedFonts, onToggle, onSelectAll, onDeselectAll }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <label className="block text-sm font-medium text-gray-700">
          폰트 선택
        </label>
        <div className="space-x-2">
          <button
            onClick={onSelectAll}
            className="text-sm text-blue-600 hover:text-blue-700"
          >
            전체 선택
          </button>
          <span className="text-gray-300">|</span>
          <button
            onClick={onDeselectAll}
            className="text-sm text-blue-600 hover:text-blue-700"
          >
            전체 해제
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {fonts.map((font) => (
          <button
            key={font.name}
            onClick={() => onToggle(font.name)}
            className={`px-4 py-2 rounded-lg border transition-colors text-left ${
              selectedFonts.includes(font.name)
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-300 hover:border-blue-400'
            }`}
          >
            {font.name}
          </button>
        ))}
      </div>
    </div>
  )
} 