'use client'

import { useState } from 'react'
import { ChangingFontText } from '@/components/ChangingFontText'
import { FontSearch } from '@/components/FontSearch'
import { FontSimilar } from '@/components/FontSimilar'
import { 
  pretendard,
  notoSansKr,
  blackHanSans,
  jua,
  doHyeon,
  stylish,
  poorStory,
  nanumPenScript,
  gaegu,
  watermelon,
  bagelfatone,
  banggraeMelon,
  bmdohyeon,
  bmeuljiro10yearslater,
  bmeuljirooraeorae,
  bmhannaair,
  cafe24ClassicType,
  cafe24Ohsquare,
  cafe24OneprettyNight,
  cafe24SsurroundAir,
  chab,
  changwonDangamRound,
  chosunGu,
  climateCrisisKR2010,
  d2Coding,
  ddag,
  dnfforgedblade,
  dosGothic,
  dungGeunMo,
  efCucumbersalad,
  efJejudoldam,
  efMacho,
  elandNice,
  elandChoice,
  eliceDigitalCoding,
  esamanru,
  establishRetrosans,
  galmuri11,
  giant,
  gmarketSansTTF,
  goormSansRegular,
  gumiIndustry,
  hahmlet,
  hakgyoansimAllimjang,
  hakgyoansimDunggeunmiso,
  hakgyoansimPuzzle,
  hancomMalangMalang,
  heirOfLight,
  hssBomBaram,
  hssSantokki,
  hssSantokki2,
  intelOneMono,
  jalnan2,
  koPubBatang,
  lineSeedKR,
  moveSans,
  mungyeongGamhong,
  nexonLv1Gothic,
  nanumGothic,
  nanumSquare,
  nanumSquareRound,
  noonnuBasicGothic,
  notoSansKR,
  okGung,
  okmanFont,
  oneMobileTitle,
  orbit,
  paperlogy,
  puradakGentleGothic,
  pyeongChangPeace,
  roehoeChan,
  rokafSlabSerif,
  riaSans,
  sdSamliphopangche,
  sdSamliphopangcheOutline,
  sebangGothic,
  sfSsaraknun,
  smuSnowflake,
  sogangUniversity,
  sam3KRFont,
  tdtdTadakTadak,
  tenada,
  theJamsil,
  tmoneyRoundWind,
  vitroCore,
  vitroInspire,
  vitroPride,
  wantedSans,
  yOnepick,
  yUniverse,
  ycomputer,
  yeongdo,
  twaySky,
  binpol2020,
  miwon,
  ongleafConcon,
  gangwonEduAll,
  gangwonEduPower,
  gyeonggiCheonnyeonBatang,
  mabinogiClassic,
  mangoDdobak,
  maplestory,
  moneygraphy,
} from '@/lib/fonts'

const fontMap = {
  '116watermelon': watermelon,
  'BMDOHYEON_ttf': bmdohyeon,
  'BMEuljiro10yearslater': bmeuljiro10yearslater,
  'BMEuljirooraeorae': bmeuljirooraeorae,
  'BMHANNAAir_ttf': bmhannaair,
  'BagelFatOne-Regular': bagelfatone,
  'BinggraeMelona': banggraeMelon,
  'BlackHanSans-Regular': blackHanSans,
  'Cafe24Classictype-v1.1': cafe24ClassicType,
  'Cafe24Ohsquare-v2.0': cafe24Ohsquare,
  'Cafe24Oneprettynight-v2.0': cafe24OneprettyNight,
  'Cafe24SsurroundAir-v1.1': cafe24SsurroundAir,
  'ChangwonDangamRound': changwonDangamRound,
  'ChosunGu': chosunGu,
  'ClimateCrisisKR-2010': climateCrisisKR2010,
  'D2Coding-Ver1.3.2-20180524': d2Coding,
  'DNFForgedBlade-Medium': dnfforgedblade,
  'DOSGothic': dosGothic,
  'DungGeunMo': dungGeunMo,
  'EF_MACHO(ttf)': efMacho,
  'EF_cucumbersalad(ttf)': efCucumbersalad,
  'EF_jejudoldam(TTF)': efJejudoldam,
  'ELAND_나이스_M': elandNice,
  'ELAND_초이스_M': elandChoice,
  'EliceDigitalCodingverH_Regular': eliceDigitalCoding,
  'Galmuri11': galmuri11,
  'Giants-Regular': giant,
  'GmarketSansTTFMedium': gmarketSansTTF,
  'Gumi-Industry': gumiIndustry,
  'HSSanTokki2.0(2024)': hssSantokki2,
  'HSSantokki-Regular': hssSantokki,
  'HS봄바람체2.0': hssBomBaram,
  'Hahmlet-Medium': hahmlet,
  'Hakgyoansim-Allimjang-TTF-R': hakgyoansimAllimjang,
  'Hakgyoansim-Dunggeunmiso-TTF-R': hakgyoansimDunggeunmiso,
  'Hakgyoansim-Puzzle-TTF-Black': hakgyoansimPuzzle,
  'HancomMalangMalang-Bold': hancomMalangMalang,
  'HeirofLightRegular': heirOfLight,
  'IntelOneMono-Medium': intelOneMono,
  'Jalnan2TTF': jalnan2,
  'KoPub-Batang-Medium': koPubBatang,
  'LINESeedKR-Rg': lineSeedKR,
  'Mabinogi_Classic_TTF': mabinogiClassic,
  'MangoDdobak-R(ttf)': mangoDdobak,
  'Maplestory-Light': maplestory,
  'Moneygraphy-Pixel': moneygraphy,
  'MoveSans-Medium': moveSans,
  'Mungyeong-Gamhong-Apple': mungyeongGamhong,
  'NEXONLv1GothicRegular': nexonLv1Gothic,
  'NanumGothic': nanumGothic,
  'NanumSquareR': nanumSquare,
  'NanumSquareRoundR': nanumSquareRound,
  'NoonnuBasicGothicRegular': noonnuBasicGothic,
  'NotoSansKR-Medium': notoSansKR,
  'OK-GUNG': okGung,
  'OKMAN-FONT': okmanFont,
  'ONE-Mobile-Title': oneMobileTitle,
  'Orbit-Regular': orbit,
  'Paperlogy-4Regular': paperlogy,
  'Pretendard-Regular': pretendard,
  'Puradak-Gentle-Gothic': puradakGentleGothic,
  'PyeongChangPeace-Light': pyeongChangPeace,
  'ROEHOE-CHAN': roehoeChan,
  'ROKAF-Slab-Serif-Medium': rokafSlabSerif,
  'RiaSans-ExtraBold': riaSans,
  'SDSamliphopangcheTTFBasic': sdSamliphopangche,
  'SDSamliphopangcheTTFOutline': sdSamliphopangcheOutline,
  'SEBANG-Gothic': sebangGothic,
  'SF싸락눈': sfSsaraknun,
  'SMUSnowflake-Regular': smuSnowflake,
  'SOGANG_UNIVERSITY_for_windows': sogangUniversity,
  'Sam3KRFont': sam3KRFont,
  'TDTDTadakTadak': tdtdTadakTadak,
  'Tenada': tenada,
  'The-Jamsil-3-Regular': theJamsil,
  'TmoneyRoundWindRegular': tmoneyRoundWind,
  'VITRO-CORE-TTF': vitroCore,
  'VITRO-INSPIRE-TTF': vitroInspire,
  'VITRO-PRIDE-TTF': vitroPride,
  'WantedSans-Regular': wantedSans,
  'YOnepick-Regular': yOnepick,
  'YUniverse-L': yUniverse,
  'Ycomputer': ycomputer,
  'Yeongdo-Regular': yeongdo,
  'chab': chab,
  'ddag': ddag,
  'esamanru_Medium': esamanru,
  'establish_Retrosans': establishRetrosans,
  'goorm-sans-regular': goormSansRegular,
  'tway_sky': twaySky,
  '빈폴2020': binpol2020,
  '미원Miwon': miwon,
  '온글잎-콘콘체': ongleafConcon,
  '강원교육모두-Light': gangwonEduAll,
  '강원교육튼튼': gangwonEduPower,
  '경기천년바탕_Regular': gyeonggiCheonnyeonBatang
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
