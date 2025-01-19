'use client'

import { useState } from 'react'
import { FontText } from './FontText'
import fontSimilarities from '@/data/font_similarities.json'

export function FontSimilar({ searchQuery, fontMap, sampleText = '폰트 테스트 문장입니다' }) {
  const [text, setText] = useState(sampleText)
  
  if (!searchQuery) return null
  console.info(fontSimilarities)
  
  // Get similar fonts for the searched font
  const similarFonts = fontSimilarities[searchQuery]
    ?.map(({ font_name, similarity }) => ({
      name: font_name,
      similarity: similarity,
      font: fontMap[font_name]
    }))
    .filter(font => font.font) // Only show fonts that exist in fontMap
    .sort((a, b) => b.similarity - a.similarity) // Sort by similarity
    || []

  if (similarFonts.length === 0) return null
  
  return (
    <div className="w-full mt-8">
      <div className="mb-6 p-6 bg-white rounded-xl border">
        <h2 className="mb-2 text-lg font-medium">원본 폰트</h2>
        <div className="space-y-4">
          <FontText
            font={fontMap[searchQuery]}
            style={{
              fontSize: '24px',
              lineHeight: 1.5
            }}
          >
            {text}
          </FontText>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="텍스트를 입력하세요"
          />
        </div>
        <p className="mt-2 text-sm text-gray-500">{searchQuery}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {similarFonts.map(({ name, font, similarity }) => (
          <div 
            key={name}
            className="p-6 bg-white rounded-xl border hover:border-blue-500 transition-colors"
          >
            <FontText
              font={font}
              style={{
                fontSize: '24px',
                lineHeight: 1.5
              }}
            >
              {text}
            </FontText>
            <div className="mt-2">
              <p className="text-sm text-gray-500">{name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 