'use client'

import { FontText } from './FontText'
import fontSimilarities from '@/data/font_similarities.json'

export function FontSimilar({ searchQuery, fontMap }) {
  if (!searchQuery) return null
  const sampleText = '폰트 테스트 문장입니다'
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
      <h2 className="text-xl font-bold mb-4">비슷한 폰트</h2>
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
              {sampleText}
            </FontText>
            <div className="mt-2">
              <p className="text-sm text-gray-500">{name}</p>
              <p className="text-xs text-gray-400">
                유사도: {(similarity * 100).toFixed(4)}%
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 