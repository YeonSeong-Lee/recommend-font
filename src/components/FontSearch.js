'use client'

import { useState } from 'react'

const fontSuggestions = [
  'Pretendard',
  'Noto Sans KR',
  'Black Han Sans',
  'Jua',
  'Do Hyeon',
  'Stylish',
  'Poor Story',
  'Nanum Pen Script',
  'Gaegu',
]

export function FontSearch({ onSearch }) {
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  const filteredFonts = fontSuggestions.filter(font =>
    font.toLowerCase().includes(query.toLowerCase())
  )

  const handleSelect = (font) => {
    setQuery(font)
    setIsOpen(false)
    onSearch(font)
  }

  const handleInputChange = (e) => {
    const value = e.target.value
    setQuery(value)
    onSearch(value)
  }

  return (
    <div className="relative w-full max-w-lg">
      <input
        type="text"
        placeholder="폰트 이름을 검색하세요..."
        className="w-full h-11 px-4 text-sm bg-white border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={query}
        onChange={handleInputChange}
        onFocus={() => setIsOpen(true)}
      />
      
      {isOpen && filteredFonts.length > 0 && (
        <ul className="absolute z-50 w-full mt-1 bg-white border rounded-xl shadow-md max-h-[300px] overflow-y-auto">
          {filteredFonts.map(font => (
            <li
              key={font}
              onClick={() => handleSelect(font)}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {font}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
