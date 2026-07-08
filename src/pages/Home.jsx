import { Helmet } from 'react-helmet-async'
import HeroSection          from '@/components/sections/HeroSection'
import AboutSection         from '@/components/sections/AboutSection'
import ServicesSection      from '@/components/sections/ServicesSection'
import StatsSection         from '@/components/sections/StatsSection'
import WhyChooseSection     from '@/components/sections/WhyChooseSection'
import IndustriesSection    from '@/components/sections/IndustriesSection'
import ProjectsSection      from '@/components/sections/ProjectsSection'
import TestimonialsSection  from '@/components/sections/TestimonialsSection'
import GallerySection       from '@/components/sections/GallerySection'
import ContactCtaSection    from '@/components/sections/ContactCtaSection'
import { SITE_NAME, SITE_DESCRIPTION } from '@/constants'

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'AutoRepair',
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Lahore',
    addressCountry: 'PK',
  },
  telephone: '+92-300-0000000',
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
      <meta name="twitter:title" content={`${SITE_NAME} — Premium Automotive Services`} />
      <meta name="twitter:description" content={SITE_DESCRIPTION} />
      <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
    </Helmet>

    <main id="main-content" aria-label="Gariwala homepage">
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <StatsSection />
      <WhyChooseSection />
      <IndustriesSection />
      <ProjectsSection />
      <TestimonialsSection />
      <GallerySection />
      <ContactCtaSection />
    </main>
  </>
)

export default Home
