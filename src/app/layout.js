import './globals.css'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import Footer from '../components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: '폰트 추천 서비스',
  description: '당신에게 딱 맞는 폰트를 찾아보세요',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <head>
        <link href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700;900&display=swap" rel="stylesheet" />
        <link href="https://cdn.jsdelivr.net/gh/spoqa/spoqa-han-sans@latest/css/SpoqaHanSansNeo.css" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+KR:wght@400;600;700&display=swap" rel="stylesheet" />
        <link href="https://cdn.jsdelivr.net/gh/webfontworld/gmarket/GmarketSans.css" rel="stylesheet" />
        <link href="https://cdn.jsdelivr.net/gh/sunn-us/SUIT/fonts/static/woff2/SUIT.css" rel="stylesheet" />
        <link href="https://cdn.jsdelivr.net/gh/wanteddev/wanted-sans@v1.0.1/packages/wanted-sans/fonts/webfonts/variable/complete/WantedSans-Variable.css" rel="stylesheet" />
        <link href="https://webfontworld.github.io/TheJamsil/TheJamsil.css" rel="stylesheet" />
      </head>
      <body className={`${inter.className} flex flex-col min-h-screen bg-white dark:bg-gray-900`}>
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
