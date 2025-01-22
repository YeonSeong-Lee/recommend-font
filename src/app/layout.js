import './globals.css'
import { Inter } from 'next/font/google'
import Footer from '../components/Footer'
import { ThemeProvider } from 'next-themes'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: '폰트 추천 서비스',
  description: '가장 비슷한 폰트를 찾아드립니다.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <meta name="google-adsense-account" content="ca-pub-7275281216554032" />
        <script async custom-element="amp-auto-ads"
          src="https://cdn.ampproject.org/v0/amp-auto-ads-0.1.js">
        </script>
      </head>
      <body className={`${inter.className} flex flex-col min-h-screen bg-white text-gray-900 transition-colors duration-200
        dark:bg-gray-950 dark:text-gray-100`}>
        <amp-auto-ads type="adsense"
         data-ad-client="ca-pub-7275281216554032">
        </amp-auto-ads>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
