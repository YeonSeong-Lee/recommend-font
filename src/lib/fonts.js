import { 
  Noto_Sans_KR,
  Black_Han_Sans,
  Jua,
  Do_Hyeon,
  Stylish,
  Poor_Story,
  Nanum_Pen_Script,
  Gaegu,
  Pacifico,
} from 'next/font/google'
import localFont from 'next/font/local'

export const pretendard = localFont({
  src: [
    {
      path: '../../public/fonts/Pretendard-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Pretendard-Bold.woff2',
      weight: '700',
      style: 'normal',
    }
  ],
  variable: '--font-pretendard',
  display: 'swap',
})

export const notoSansKr = Noto_Sans_KR({
  weight: ['900'],
  subsets: ['latin'],
  display: 'swap',
})

export const blackHanSans = Black_Han_Sans({
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
})

export const jua = Jua({
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
})

export const doHyeon = Do_Hyeon({
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
})

export const stylish = Stylish({
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
})

export const poorStory = Poor_Story({
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
})

export const nanumPenScript = Nanum_Pen_Script({
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
})

export const gaegu = Gaegu({
  weight: ['700'],
  subsets: ['latin'],
  display: 'swap',
}) 