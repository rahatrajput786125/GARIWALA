import { Helmet } from 'react-helmet-async'
import HeroSection          from '@/components/sections/HeroSection'
import ServicesSection      from '@/components/sections/ServicesSection'
import DealerListSection    from '@/components/sections/DealerListSection'
import ProductLineupSection from '@/components/sections/ProductLineupSection'
import { SITE_NAME, SITE_DESCRIPTION } from '@/constants'

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'AutoRepair',
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'New M. A. Jinnah Rd, Shikarpur Colony Muslimabad',
    addressLocality: 'Karachi',
    postalCode: '74400',
    addressCountry: 'PK',
  },
  telephone: '+92-313-255-3864',
  email: 'info@gariwala.com',
  openingHours: 'Mo-Sa 09:00-19:00',
  priceRange: '$$',
}

const Home = () => (
  <>
    <Helmet>
      <title>{SITE_NAME} — Premium Automotive Services</title>
      <meta name="description" content={SITE_DESCRIPTION} />
      <meta property="og:title" content={`${SITE_NAME} — Premium Automotive Services`} />
      <meta property="og:description" content={SITE_DESCRIPTION} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
    </Helmet>

    <main id="main-content" aria-label="Gariwala homepage">
      <HeroSection />
      <ProductLineupSection />
      <DealerListSection />
      
    </main>
  </>
)

export default Home
