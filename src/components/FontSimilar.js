'use client'

import { FontText } from './FontText'
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

export function FontSimilar({ searchQuery }) {
  if (!searchQuery) return null

  const sampleText = '폰트 테스트 문장입니다'
  
  return (
    <div className="w-full mt-8">
      <h2 className="text-xl font-bold mb-4">비슷한 폰트</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(fontMap).map(([name, font]) => (
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
            <p className="text-sm text-gray-500 mt-2">{name}</p>
          </div>
        ))}
      </div>
    </div>
  )
} 