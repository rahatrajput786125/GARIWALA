import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  ArrowRight,
  CheckCircle2,
  Cpu,
  Hammer,
  Paintbrush2,
  Gauge,
  Sparkles,
  CircleDot,
} from 'lucide-react'
import Section   from '@/components/Section'
import Container from '@/components/Container'
import Heading   from '@/components/Heading'
import Badge     from '@/components/Badge'
import Button    from '@/components/Button'

gsap.registerPlugin(ScrollTrigger)

/* ─────────────────────────────────────────
   Service data
───────────────────────────────────────── */
const services = [
  {
    number: '01',
    icon: Cpu,
    title: 'Engine Diagnostics',
    description:
      'Advanced OBD-II diagnostics to identify and resolve engine issues with surgical precision — fast, accurate, and reliable.',
    highlights: ['Full OBD-II Scan', 'Emission Testing', 'Engine Rebuild'],
    tag: 'Most Popular',
  },
  {
    number: '02',
    icon: Hammer,
    title: 'Custom Builds',
    description:
      'Bespoke vehicle builds engineered to your exact specifications — from concept to completion with zero compromise.',
    highlights: ['Concept Design', 'Chassis Fabrication', 'Full Documentation'],
    tag: 'Premium',
  },
  {
    number: '03',
    icon: Paintbrush2,
    title: 'Paint & Bodywork',
    description:
      'Flawless paint correction and body restoration that bring vehicles back to showroom-perfect condition.',
    highlights: ['Paint Correction', 'Custom Colours', 'Rust Treatment'],
    tag: null,
  },
  {
    number: '04',
    icon: Gauge,
    title: 'Performance Tuning',
    description:
      'ECU remapping, suspension upgrades, and performance parts installation to unlock your vehicle\'s full potential.',
    highlights: ['ECU Remapping', 'Dyno Testing', 'Exhaust Systems'],
    tag: null,
  },
  {
    number: '05',
    icon: Sparkles,
    title: 'Interior Detailing',
    description:
      'Premium interior restoration and deep detailing for a truly luxurious, showroom-fresh cabin experience.',
    highlights: ['Deep Clean', 'Leather Care', 'Odour Elimination'],
    tag: null,
  },
  {
    number: '06',
    icon: CircleDot,
    title: 'Wheel & Tyre',
    description:
      'Complete wheel and tyre solutions — fitting, balancing, precision alignment, and custom wheel upgrades.',
    highlights: ['Tyre Fitting', 'Wheel Alignment', 'Custom Wheels'],
    tag: null,
  },
]

/* ─────────────────────────────────────────
   ServiceCard
───────────────────────────────────────── */
const ServiceCard = ({ number, icon: Icon, title, description, highlights, tag }) => (
  <motion.article
    whileHover={{ y: -8, scale: 1.015 }}
    transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
    className={[
      'group relative flex flex-col overflow-hidden rounded-[1.25rem]',
      'bg-white border border-border',
      'shadow-card',
      'hover:shadow-card-hover',
      'hover:border-primary/35',
      'transition-[border-color,box-shadow,transform] duration-500',
      'p-7 lg:p-8',
      'will-change-transform',
    ].join(' ')}
    aria-label={`Service: ${title}`}
  >
    {/* ── Top accent bar ── */}
    <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-primary via-primary-500 to-primary-700 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

    {/* ── Background glow on hover ── */}
    <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

    {/* ── Decorative corner element ── */}
    <div className="absolute top-5 right-5 flex flex-col items-end gap-1 pointer-events-none">
      <div className="w-8 h-[1.5px] bg-border group-hover:bg-primary/30 transition-colors duration-400 rounded-full" />
      <div className="w-5 h-[1.5px] bg-border group-hover:bg-primary/20 transition-colors duration-400 rounded-full" />
    </div>

    {/* ── Number + optional tag ── */}
    <div className="flex items-center justify-between mb-6">
      <span className="font-heading font-black text-body-xs text-primary/40 tracking-[0.22em]">
        {number}
      </span>
      {tag && (
        <span className="px-2.5 py-1 rounded-full bg-primary text-heading text-[10px] font-heading font-black uppercase tracking-wider shadow-primary">
          {tag}
        </span>
      )}
    </div>

    {/* ── Icon ── */}
    <div className="relative w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:shadow-primary transition-all duration-400 self-start overflow-hidden shrink-0">
      {/* Inner gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <Icon
        size={24}
        className="relative z-10 text-primary group-hover:text-heading group-hover:scale-110 group-hover:rotate-[-6deg] transition-all duration-400"
        aria-hidden="true"
      />
    </div>

    {/* ── Title ── */}
    <h3 className="font-heading font-bold text-display-sm text-heading mb-3 group-hover:text-primary transition-colors duration-300 leading-tight">
      {title}
    </h3>

    {/* ── Description ── */}
    <p className="text-body-sm text-body leading-relaxed mb-6 flex-1">
      {description}
    </p>

    {/* ── Highlights ── */}
    <ul className="flex flex-col gap-2 mb-7 pt-5 border-t border-border" aria-label={`${title} highlights`}>
      {highlights.map((item) => (
        <li key={item} className="flex items-center gap-2.5 text-body-xs text-body">
          <CheckCircle2
            size={13}
            className="text-primary shrink-0 group-hover:scale-110 transition-transform duration-300"
            aria-hidden="true"
          />
          {item}
        </li>
      ))}
    </ul>

    {/* ── Learn More link ── */}
    <Link
      to="/services"
      className="inline-flex items-center gap-2 text-body-sm font-heading font-bold text-heading group-hover:text-primary transition-colors duration-300 mt-auto w-fit"
      aria-label={`Learn more about ${title}`}
    >
      Learn More
      <ArrowRight
        size={15}
        className="transition-transform duration-300 group-hover:translate-x-1.5"
        aria-hidden="true"
      />
    </Link>

    {/* ── Animated bottom underline on link ── */}
    <div className="mt-2 h-px bg-gradient-to-r from-primary/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
  </motion.article>
)

/* ─────────────────────────────────────────
   ServicesSection
───────────────────────────────────────── */
const ServicesSection = () => {
  const gridRef = useRef(null)

  /* GSAP staggered card entrance */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        gridRef.current?.children ?? [],
        { opacity: 0, y: 56, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.85,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 82%',
            once: true,
          },
        }
      )
    })
    return () => ctx.revert()
  }, [])

  return (
    <Section id="services" surface className="relative overflow-hidden" aria-labelledby="services-heading">

      {/* ── Section background layers ── */}
      {/* Radial gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 75% 55% at 50% 40%, rgba(255,193,7,0.065) 0%, transparent 68%), ' +
            'radial-gradient(ellipse 50% 40% at 10% 80%, rgba(255,193,7,0.04) 0%, transparent 60%)',
        }}
      />
      {/* Industrial grid texture */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.022] pointer-events-none" />
      {/* Yellow blur circles */}
      <div className="absolute top-12 right-[6%] w-64 h-64 rounded-full bg-primary/[0.08] blur-[80px] pointer-events-none" />
      <div className="absolute bottom-16 left-[4%] w-48 h-48 rounded-full bg-primary/[0.06] blur-[64px] pointer-events-none" />

      <Container className="relative z-10">

        {/* ══ Section header ══ */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center mb-14 lg:mb-16"
        >
          <Badge className="mb-5">What We Do</Badge>

          <Heading as="h2" id="services-heading" center className="mb-5 max-w-2xl">
            Our Core{' '}
            <span className="text-gradient">Services</span>
          </Heading>

          <p className="text-body-lg text-body max-w-xl leading-relaxed">
            Comprehensive automotive solutions under one roof — delivered by certified
            experts who combine precision engineering with genuine passion.
          </p>
        </motion.div>

        {/* ══ Cards grid ══ */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6"
        >
          {services.map((service) => (
            <ServiceCard key={service.number} {...service} />
          ))}
        </div>

        {/* ══ Bottom CTA ══ */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-14 flex justify-center"
        >
          <Button as={Link} to="/services" variant="dark" size="lg" className="group/cta">
            View All Services
            <ArrowRight
              size={18}
              className="transition-transform duration-300 group-hover/cta:translate-x-1"
              aria-hidden="true"
            />
          </Button>
        </motion.div>

      </Container>
    </Section>
  )
}

export default ServicesSection
