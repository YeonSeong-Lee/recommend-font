'use client'

import { useState } from 'react'
import { TextInput } from '@/components/font-test/TextInput'
import { SampleTextSelector } from '@/components/font-test/SampleTextSelector'
import { FontSizeSlider } from '@/components/font-test/FontSizeSlider'
import { FontSelector } from '@/components/font-test/FontSelector'
import { FontPreview } from '@/components/font-test/FontPreview'
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

export default function TestFontsPage() {
  const [customText, setCustomText] = useState('')
  const [fontSize, setFontSize] = useState(32)
  const [selectedSample, setSelectedSample] = useState('안녕하세요, 반갑습니다')
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

  const handleSampleSelect = (text) => {
    setSelectedSample(text)
    setCustomText('')
  }

  return (
    <div className="min-h-screen max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">
        폰트 테스트
      </h1>

      <div className="mb-8 space-y-4">
        <TextInput
          value={customText}
          onChange={(e) => setCustomText(e.target.value)}
        />

        <SampleTextSelector
          selectedSample={selectedSample}
          onSelect={handleSampleSelect}
        />

        <FontSizeSlider
          value={fontSize}
          onChange={setFontSize}
        />

        <FontSelector
          fonts={fonts}
          selectedFonts={selectedFonts}
          onToggle={handleFontToggle}
          onSelectAll={handleSelectAll}
          onDeselectAll={handleDeselectAll}
        />
      </div>

      <div className="space-y-8">
        {fonts
          .filter(font => selectedFonts.includes(font.name))
          .map((font) => (
            <FontPreview
              key={font.name}
              font={font}
              text={displayText}
              fontSize={fontSize}
            />
          ))}
      </div>
    </div>
  )
} 