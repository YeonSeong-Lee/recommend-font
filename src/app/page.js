'use client'

import { useState } from 'react'
import { ChangingFontText } from '@/components/ChangingFontText'
import { FontSearch } from '@/components/FontSearch'
import { FontSimilar } from '@/components/FontSimilar'
import { fontMap } from '@/lib/fontMap'
import ThemeToggle from '@/components/ThemeToggle'

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const fontList = Object.keys(fontMap)

  return (
    <div className="relative min-h-screen">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <main className="min-h-screen max-w-4xl mx-auto px-4 py-8">
        <section className="flex flex-col items-center justify-center text-center">
          <h1 className="text-5xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-gray-100 transition-colors duration-200">
            <ChangingFontText fontMap={fontMap} />
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl transition-colors duration-200">
            수천 개의 폰트 중에서 가장 비슷한 폰트를 찾아드립니다
          </p>
          <FontSearch onSearch={setSearchQuery} fontList={fontList} />
          <FontSimilar searchQuery={searchQuery} fontMap={fontMap} />
        </section>
      </main>
    </div>
  )
}
