import { usePage } from '../hooks/usePage'
import { Hero, Countdown } from '../components/sections/Hero'
import {
  TrustBar,
  NewYearEdit,
  GiftGuide,
} from '../components/sections/Editorial'
import {
  BestSellers,
  NewYearSpecials,
  FreshStart,
  FeaturedProduct,
} from '../components/sections/Commerce'
import {
  EditorialBanner,
  SocialProof,
  InstagramSection,
  Newsletter,
  EditorialIntro,
} from '../components/sections/Engagement'

export function Home() {
  usePage(
    'AURELIA — Collection du Nouvel An | Commencez l’année avec beauté',
    'Découvrez la Collection du Nouvel An AURELIA — cadeaux premium, univers de vie, beauté, mode, high-tech et maison pour un beau nouveau départ.',
  )

  return (
    <>
      <Hero />
      <Countdown />
      <TrustBar />
      <EditorialIntro />
      <NewYearEdit />
      <BestSellers />
      <GiftGuide />
      <FreshStart />
      <FeaturedProduct />
      <NewYearSpecials />
      <EditorialBanner />
      <SocialProof />
      <InstagramSection />
      <Newsletter />
    </>
  )
}
