import { Helmet } from 'react-helmet-async'
import { useGsapReveal } from '@/hooks/useGsapReveal'
import Section   from '@/components/Section'
import Container from '@/components/Container'
import Heading   from '@/components/Heading'
import CtaSection from '@/components/sections/CtaSection'
import { SITE_NAME } from '@/constants'
import { Check } from 'lucide-react'

const services = [
  {
    number: '01',
    title: 'Engine Diagnostics & Repair',
    description: 'Comprehensive engine diagnostics using the latest OBD technology, followed by expert repair and precision tuning.',
    features: ['Full OBD scan', 'Engine rebuild', 'Timing & fuel system', 'Emission testing'],
    tag: 'Most Popular',
    tagColor: 'bg-primary text-heading',
  },
  {
    number: '02',
    title: 'Custom Vehicle Builds',
    description: 'From concept to completion, we build bespoke vehicles that reflect your personality and performance goals.',
    features: ['Concept design', 'Chassis fabrication', 'Custom interiors', 'Full documentation'],
    tag: 'Premium',
    tagColor: 'bg-heading text-white',
  },
  {
    number: '03',
    title: 'Paint & Bodywork',
    description: 'Professional paint correction, custom paint jobs, and body restoration to showroom standard.',
    features: ['Paint correction', 'Custom colours', 'Dent removal', 'Rust treatment'],
    tag: null,
    tagColor: '',
  },
  {
    number: '04',
    title: 'Performance Tuning',
    description: 'ECU remapping, suspension upgrades, and performance parts installation for maximum output.',
    features: ['ECU remapping', 'Suspension setup', 'Exhaust systems', 'Dyno testing'],
    tag: null,
    tagColor: '',
  },
  {
    number: '05',
    title: 'Interior Detailing',
    description: 'Deep cleaning, leather restoration, and premium interior upgrades for a luxurious cabin experience.',
    features: ['Deep clean', 'Leather care', 'Upholstery repair', 'Odour elimination'],
    tag: null,
    tagColor: '',
  },
  {
    number: '06',
    title: 'Wheel & Tyre Services',
    description: 'Complete wheel and tyre solutions including fitting, balancing, alignment, and custom wheel upgrades.',
    features: ['Tyre fitting', 'Wheel alignment', 'Balancing', 'Custom wheels'],
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
        <meta name="description" content="Explore Gariwala's full range of premium automotive services." />
      </Helmet>

      {/* Page hero */}
      <Section surface navOffset>
        <Container>
          <div ref={heroRef} className="max-w-2xl">
            <span className="eyebrow mb-6 block">What We Offer</span>
            <Heading as="h1" className="mb-6">
              Premium
              <br />
              <span className="text-gradient">Services</span>
            </Heading>
            <p className="text-body-xl text-body leading-relaxed">
              Every service is delivered with the same commitment to quality, transparency, and excellence — no compromises.
            </p>
          </div>
        </Container>
      </Section>

      {/* Services grid */}
      <Section>
        <Container>
          <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map(({ number, title, description, features, tag, tagColor }) => (
              <div
                key={number}
                className="group relative flex flex-col p-8 rounded-[1.25rem] bg-white border border-border shadow-card hover:shadow-card-hover hover:-translate-y-1.5 hover:border-primary/20 transition-all duration-500"
              >
                {/* Top accent on hover */}
                <div className="absolute top-0 left-8 right-8 h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-full" />

                {tag && (
                  <span className={`absolute top-6 right-6 px-3 py-1 rounded-full text-body-xs font-heading font-black uppercase tracking-wider ${tagColor}`}>
                    {tag}
                  </span>
                )}
                <span className="font-heading font-black text-body-xs text-primary/40 tracking-[0.2em] mb-5">
                  {number}
                </span>
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

      <CtaSection />
    </>
  )
}

export default Services
