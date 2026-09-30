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
    'AURELIA — New Year Collection | Start the Year Beautifully',
    'Discover the AURELIA New Year Collection — premium gifts, lifestyle, beauty, fashion, tech and home products for a beautiful new beginning.',
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
