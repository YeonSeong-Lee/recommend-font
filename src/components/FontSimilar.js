'use client'

import { useState } from 'react'
import { FontTextEditable } from './FontTextEditable'
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
      <div className="mb-6 p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 transition-colors duration-200">
        <h2 className="mb-2 text-lg font-medium text-gray-900 dark:text-gray-100">원본 폰트</h2>
        <div className="space-y-4">
          <FontTextEditable
            font={fontMap[searchQuery]}
            style={{
              fontSize: '24px',
              lineHeight: 1.5
            }}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{searchQuery}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {similarFonts.map(({ name, font, similarity }) => (
          <div 
            key={name}
            className="p-6 
              bg-white dark:bg-gray-800 
              rounded-xl 
              border border-gray-200 dark:border-gray-700 
              hover:border-blue-500 dark:hover:border-blue-400 
              transition-colors duration-200"
          >
            <FontTextEditable
              font={font}
              style={{
                fontSize: '24px',
                lineHeight: 1.5
              }}
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <div className="mt-2">
              <p className="text-sm text-gray-500 dark:text-gray-400">{name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 