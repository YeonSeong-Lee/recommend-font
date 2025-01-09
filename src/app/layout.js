import './globals.css'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import Footer from './component/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: '폰트 추천 서비스',
  description: '당신에게 딱 맞는 폰트를 찾아보세요',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body className={`${inter.className} flex flex-col min-h-screen bg-white dark:bg-gray-900`}>
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
