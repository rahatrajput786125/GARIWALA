import { Helmet } from 'react-helmet-async'
import { useGsapReveal } from '@/hooks/useGsapReveal'
import Section     from '@/components/Section'
import Container   from '@/components/Container'
import Heading     from '@/components/Heading'
import StatsSection from '@/components/sections/StatsSection'
import CtaSection  from '@/components/sections/CtaSection'
import { SITE_NAME } from '@/constants'
import { Users, Target, Heart, TrendingUp } from 'lucide-react'

const values = [
  {
    icon: Users,
    title: 'Customer First',
    description: 'Every decision we make starts with what\'s best for our customers. Your satisfaction is our benchmark.',
    color: 'text-blue-500',
    bg: 'bg-blue-50',
  },
  {
    icon: Target,
    title: 'Precision',
    description: 'We hold ourselves to the highest standards of accuracy and quality — in every bolt, every brushstroke.',
    color: 'text-amber-500',
    bg: 'bg-amber-50',
  },
  {
    icon: Heart,
    title: 'Passion',
    description: 'Our love for automobiles drives everything we do. This isn\'t just a job — it\'s a calling.',
    color: 'text-rose-500',
    bg: 'bg-rose-50',
  },
  {
    icon: TrendingUp,
    title: 'Continuous Growth',
    description: 'We invest in the latest tools, training, and technology to stay ahead of the industry.',
    color: 'text-emerald-500',
    bg: 'bg-emerald-50',
  },
]

const timeline = [
  { year: '2012', event: 'Founded as a small workshop in New M. A. Jinnah Rd, Shikarpur Colony Muslimabad, Karachi, 74400 with 3 technicians.' },
  { year: '2015', event: 'Expanded to a full-service facility with 20+ staff members.' },
  { year: '2018', event: 'Launched custom builds division — first bespoke project delivered.' },
  { year: '2021', event: 'Awarded Best Automotive Service Provider in the region.' },
  { year: '2024', event: 'Serving 500+ clients with a team of 50+ certified professionals.' },
]

const About = () => {
  const heroRef     = useGsapReveal()
  const valuesRef   = useGsapReveal({ delay: 0.1 })
  const timelineRef = useGsapReveal({ delay: 0.05 })

  return (
    <>
      <Helmet>
        <title>About — {SITE_NAME}</title>
        <meta name="description" content="Learn about Gariwala's story, mission, and the team behind our premium automotive services." />
      </Helmet>

      {/* Hero */}
      <Section surface navOffset>
        <Container>
          <div ref={heroRef} className="max-w-3xl">
            <span className="eyebrow mb-6 block">Our Story</span>
            <Heading as="h1" className="mb-7">
              Built on a Love for
              <br />
              <span className="text-gradient">Automobiles</span>
            </Heading>
            <p className="text-body-xl text-body leading-relaxed mb-5">
              Gariwala was born from a simple belief: every vehicle deserves expert care, and every
              customer deserves honest, transparent service. What started as a small workshop has
              grown into a full-service automotive destination trusted by hundreds.
            </p>
            <p className="text-body-lg text-body leading-relaxed">
              Today, our team of certified technicians and passionate car enthusiasts work together
              to deliver results that consistently exceed expectations — whether it's a routine
              service or a ground-up custom build.
            </p>
          </div>
        </Container>
      </Section>

      {/* Values */}
      <Section>
        <Container>
          <div className="mb-14">
            <span className="eyebrow mb-5 block">What Drives Us</span>
            <Heading as="h2">
              Our Core <span className="text-gradient">Values</span>
            </Heading>
          </div>
          <div ref={valuesRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map(({ icon: Icon, title, description, color, bg }) => (
              <div
                key={title}
                className="group p-7 rounded-[1.25rem] bg-white border border-border shadow-card hover:shadow-card-hover hover:-translate-y-1.5 hover:border-primary/20 transition-all duration-500"
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 ${bg}`}>
                  <Icon size={22} className={color} />
                </div>
                <h3 className="font-heading font-bold text-body-lg text-heading mb-3">{title}</h3>
                <p className="text-body-sm text-body leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Timeline */}
      <Section surface>
        <Container narrow>
          <div className="mb-14 text-center">
            <span className="eyebrow mb-5 block justify-center">Our Journey</span>
            <Heading as="h2" center>
              A Decade of <span className="text-gradient">Excellence</span>
            </Heading>
          </div>
          <div ref={timelineRef} className="relative">
            {/* Vertical line */}
            <div className="absolute left-[22px] top-0 bottom-0 w-px bg-gradient-to-b from-primary/60 via-border to-transparent" />

            <div className="flex flex-col gap-8">
              {timeline.map(({ year, event }, i) => (
                <div key={year} className="flex gap-8 items-start pl-16 relative">
                  <div className="absolute left-0 w-11 h-11 rounded-2xl bg-primary flex items-center justify-center shadow-primary shrink-0">
                    <span className="font-heading font-black text-body-xs text-heading">{year.slice(2)}</span>
                  </div>
                  <div className="pt-2">
                    <span className="font-heading font-bold text-body-sm text-primary block mb-1.5">{year}</span>
                    <p className="text-body-md text-body leading-relaxed">{event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <StatsSection />
      <CtaSection />
    </>
  )
}

export default About
