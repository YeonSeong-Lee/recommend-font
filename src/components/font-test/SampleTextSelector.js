const sampleTexts = [
  '안녕하세요, 반갑습니다',
  '폰트 테스트 페이지입니다',
  'The quick brown fox jumps over the lazy dog',
  '1234567890'
]

export function SampleTextSelector({ selectedSample, onSelect }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        샘플 텍스트
      </label>
      <div className="flex flex-wrap gap-2">
        {sampleTexts.map((text) => (
          <button
            key={text}
            onClick={() => onSelect(text)}
            className={`px-4 py-2 rounded-lg border transition-colors ${
              text === selectedSample
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-300 hover:border-blue-400'
            }`}
          >
            {text}
          </button>
        ))}
      </div>
    </div>
  )
} 