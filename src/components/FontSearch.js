'use client'

import { useState } from 'react'

export function FontSearch({ onSearch, fontList }) {
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  const filteredFonts = fontList.filter(font =>
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
        className="w-full h-11 px-4 text-sm bg-white dark:bg-gray-800 
          text-gray-900 dark:text-gray-100 
          border border-gray-200 dark:border-gray-700 
          rounded-xl focus:outline-none 
          focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
          placeholder-gray-500 dark:placeholder-gray-400
          transition-colors duration-200"
        value={query}
        onChange={handleInputChange}
        onFocus={() => setIsOpen(true)}
      />
      
      {isOpen && filteredFonts.length > 0 && (
        <ul className="absolute z-50 w-full mt-1 
          bg-white dark:bg-gray-800 
          border border-gray-200 dark:border-gray-700 
          rounded-xl shadow-md dark:shadow-gray-900/50 
          max-h-[300px] overflow-y-auto">
          {filteredFonts.map(font => (
            <li
              key={font}
              onClick={() => handleSelect(font)}
              className="px-4 py-2 
                text-gray-900 dark:text-gray-100
                hover:bg-gray-100 dark:hover:bg-gray-700 
                cursor-pointer transition-colors duration-200"
            >
              {font}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
