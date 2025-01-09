import Link from 'next/link'
import { ChangingFontText } from '@/components/ChangingFontText'

export default function Home() {
  return (
    <main className="min-h-screen max-w-4xl mx-auto px-4">
      <section className="flex flex-col items-center justify-center min-h-[80vh] text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          당신의 프로젝트에 어울리는<br />
          <ChangingFontText />
        </h1>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl">
          수천 개의 폰트 중에서 프로젝트에 딱 맞는 폰트를 찾아드립니다
        </p>
        <div className="flex gap-4">
          <Link 
            href="/recommend" 
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            url로 추천받기
          </Link>
          <Link 
            href="/question" 
            className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            질문으로 추천받기
          </Link>
        </div>
      </section>
    </main>
  )
}
