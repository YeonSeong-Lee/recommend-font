'use client'

import { useState } from 'react'
import { ChangingFontText } from '@/components/ChangingFontText'
import { FontSearch } from '@/components/FontSearch'
import { FontSimilar } from '@/components/FontSimilar'
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

const fontMap = {
  'Pretendard': pretendard,
  'Noto Sans KR': notoSansKr,
  'Black Han Sans': blackHanSans,
  'Jua': jua,
  'Do Hyeon': doHyeon,
  'Stylish': stylish,
  'Poor Story': poorStory,
  'Nanum Pen Script': nanumPenScript,
  'Gaegu': gaegu,
}

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const fontList = Object.keys(fontMap)

  return (
    <main className="min-h-screen max-w-4xl mx-auto px-4 py-8">
      <section className="flex flex-col items-center justify-center text-center">
        <h1 className="text-5xl md:text-5xl font-bold mb-6">
          <ChangingFontText />
        </h1>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl">
          수천 개의 폰트 중에서 가장 비슷한 폰트를 찾아드립니다
        </p>
        <FontSearch onSearch={setSearchQuery} fontList={fontList} />
        <FontSimilar searchQuery={searchQuery} fontMap={fontMap} />
      </section>
    </main>
  )
}
