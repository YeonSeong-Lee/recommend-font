'use client'

import { useState } from 'react'
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

const sampleTexts = [
  '안녕하세요, 반갑습니다',
  '폰트 테스트 페이지입니다',
  'The quick brown fox jumps over the lazy dog',
  '1234567890'
]

export default function TestFontsPage() {
  const [customText, setCustomText] = useState('')
  const [fontSize, setFontSize] = useState(32)
  const [selectedSample, setSelectedSample] = useState(sampleTexts[0])
  const [selectedFonts, setSelectedFonts] = useState(fonts.map(f => f.name))

  const displayText = customText || selectedSample

  const handleFontToggle = (fontName) => {
    setSelectedFonts(prev => {
      if (prev.includes(fontName)) {
        return prev.filter(f => f !== fontName)
      }
      return [...prev, fontName]
    })
  }

  const handleSelectAll = () => {
    setSelectedFonts(fonts.map(f => f.name))
  }

  const handleDeselectAll = () => {
    setSelectedFonts([])
  }

  return (
    <div className="min-h-screen max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">
        폰트 테스트
      </h1>

      <div className="mb-8 space-y-4">
        <div>
          <label htmlFor="custom-text" className="block text-sm font-medium text-gray-700 mb-2">
            테스트할 텍스트를 입력하세요
          </label>
          <input
            id="custom-text"
            type="text"
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
            placeholder="텍스트를 입력하세요..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            샘플 텍스트
          </label>
          <div className="flex flex-wrap gap-2">
            {sampleTexts.map((text) => (
              <button
                key={text}
                onClick={() => {
                  setSelectedSample(text)
                  setCustomText('')
                }}
                className={`px-4 py-2 rounded-lg border transition-colors ${
                  text === selectedSample && !customText
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-300 hover:border-blue-400'
                }`}
              >
                {text}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="font-size" className="block text-sm font-medium text-gray-700 mb-2">
            폰트 크기: {fontSize}px
          </label>
          <input
            id="font-size"
            type="range"
            min="12"
            max="72"
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700">
              폰트 선택
            </label>
            <div className="space-x-2">
              <button
                onClick={handleSelectAll}
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                전체 선택
              </button>
              <span className="text-gray-300">|</span>
              <button
                onClick={handleDeselectAll}
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
                onClick={() => handleFontToggle(font.name)}
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
      </div>

      <div className="space-y-8">
        {fonts
          .filter(font => selectedFonts.includes(font.name))
          .map((font) => (
            <div
              key={font.name}
              className="p-6 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium text-gray-900">
                  {font.name}
                </h2>
                <span className="text-sm text-gray-500">
                  Weight: {font.weight}
                </span>
              </div>
              <div
                className={font.className}
                style={{
                  fontWeight: font.weight,
                  fontSize: `${fontSize}px`,
                  lineHeight: 1.5
                }}
              >
                {displayText}
              </div>
            </div>
          ))}
      </div>
    </div>
  )
} 