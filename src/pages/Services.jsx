import { Helmet } from 'react-helmet-async'
import { useGsapReveal } from '@/hooks/useGsapReveal'
import Section from '@/components/Section'
import Container from '@/components/Container'
import Heading from '@/components/Heading'
import { SITE_NAME } from '@/constants'
import { Check } from 'lucide-react'

const services = [
  {
    number: '01',
    title: 'New Car Sales',
    description: 'Browse our full lineup of brand-new JAC, Dongfeng, and Renault vehicles. Competitive pricing with flexible financing options.',
    features: ['Latest models in stock', 'Flexible installment plans', 'Bank financing available', 'Trade-in accepted'],
    tag: 'Most Popular',
    tagColor: 'bg-primary text-heading',
  },
  {
    number: '02',
    title: 'Test Drive Booking',
    description: 'Experience your dream car before you buy. Book a test drive at our Karachi showroom at your convenience.',
    features: ['Same-day booking', 'Expert guide on board', 'All models available', 'No obligation'],
    tag: null,
    tagColor: '',
  },
  {
    number: '03',
    title: 'Car Financing & Leasing',
    description: 'We partner with leading banks to offer you the best auto financing and leasing packages with low markup rates.',
    features: ['Low markup rates', 'Up to 5-year tenure', 'Minimal down payment', 'Quick approval'],
    tag: 'Popular',
    tagColor: 'bg-heading text-white',
  },
  {
    number: '04',
    title: 'After-Sales Service',
    description: 'Our certified technicians provide full after-sales support including scheduled maintenance and warranty repairs.',
    features: ['Certified technicians', 'Genuine spare parts', 'Warranty repairs', 'Scheduled maintenance'],
    tag: null,
    tagColor: '',
  },
  {
    number: '05',
    title: 'Vehicle Registration',
    description: 'We handle all documentation and registration formalities so you can drive away without any hassle.',
    features: ['Full documentation', 'Number plate issuance', 'Insurance assistance', 'Transfer of ownership'],
    tag: null,
    tagColor: '',
  },
  {
    number: '06',
    title: 'Corporate Fleet Supply',
    description: 'Special bulk pricing and dedicated account management for businesses looking to build or expand their vehicle fleet.',
    features: ['Bulk discounts', 'Dedicated account manager', 'Custom livery options', 'Fleet maintenance plans'],
    tag: null,
    tagColor: '',
  },
]

const Services = () => {
  const heroRef = useGsapReveal()
  const gridRef = useGsapReveal({ delay: 0.1 })

  return (
    <>
      <Helmet>
        <title>Services — {SITE_NAME}</title>
        <meta name="description" content="Explore Gariwala's car showroom services — sales, financing, after-sales support and more." />
      </Helmet>

      <Section surface navOffset>
        <Container>
          <div ref={heroRef} className="max-w-2xl">
            <span className="eyebrow mb-6 block">What We Offer</span>
            <Heading as="h1" className="mb-6">
              Our <span className="text-gradient">Services</span>
            </Heading>
            <p className="text-body-xl text-body leading-relaxed">
              From buying your first car to managing a corporate fleet — Gariwala provides end-to-end automotive solutions at our Karachi showroom.
            </p>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map(({ number, title, description, features, tag, tagColor }) => (
              <div
                key={number}
                className="group relative flex flex-col p-8 rounded-[1.25rem] bg-white border border-border shadow-card hover:shadow-card-hover hover:-translate-y-1.5 hover:border-primary/20 transition-all duration-500"
              >
                <div className="absolute top-0 left-8 right-8 h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-full" />
                {tag && (
                  <span className={`absolute top-6 right-6 px-3 py-1 rounded-full text-body-xs font-heading font-black uppercase tracking-wider ${tagColor}`}>
                    {tag}
                  </span>
                )}
                <span className="font-heading font-black text-body-xs text-primary/40 tracking-[0.2em] mb-5">{number}</span>
                <h3 className="font-heading font-bold text-display-sm text-heading mb-4 group-hover:text-primary transition-colors duration-300 leading-tight">
                  {title}
                </h3>
                <p className="text-body-sm text-body leading-relaxed mb-6 flex-1">{description}</p>
                <ul className="flex flex-col gap-2.5 pt-6 border-t border-border">
                  {features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-body-sm text-heading">
                      <span className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <Check size={11} className="text-primary" strokeWidth={3} />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </>
  )
}

export default Services
