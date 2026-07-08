import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  HardHat,
  Mountain,
  Truck,
  Factory,
  Building2,
  Flame,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react'
import Section   from '@/components/Section'
import Container from '@/components/Container'
import Heading   from '@/components/Heading'
import Badge     from '@/components/Badge'

gsap.registerPlugin(ScrollTrigger)

/* ─────────────────────────────────────────
   Industry data
───────────────────────────────────────── */
const industries = [
  {
    id: 'construction',
    icon: HardHat,
    title: 'Construction',
    description:
      'Heavy-duty fleet maintenance and custom builds engineered for the toughest construction environments.',
    highlights: ['Fleet Maintenance', 'On-Site Support'],
    /* gradient simulates a dusty concrete / earth tone */
    gradient: 'from-[#3d2b1f] via-[#5c3d2e] to-[#7a5c42]',
    accentGlow: 'rgba(255,193,7,0.18)',
    badge: 'Most Popular',
  },
  {
    id: 'mining',
    icon: Mountain,
    title: 'Mining',
    description:
      'Specialised vehicle servicing and diagnostics for mining operations demanding maximum uptime.',
    highlights: ['24/7 Support', 'Certified Solutions'],
    gradient: 'from-[#1a2a1a] via-[#2d3d2a] to-[#3d5235]',
    accentGlow: 'rgba(255,193,7,0.15)',
    badge: null,
  },
  {
    id: 'logistics',
    icon: Truck,
    title: 'Logistics',
    description:
      'Comprehensive fleet care for logistics companies — keeping your vehicles on the road and on schedule.',
    highlights: ['Fleet Contracts', 'Nationwide Service'],
    gradient: 'from-[#1a1f2e] via-[#252d42] to-[#2e3a56]',
    accentGlow: 'rgba(255,193,7,0.16)',
    badge: 'Trusted Industry',
  },
  {
    id: 'manufacturing',
    icon: Factory,
    title: 'Manufacturing',
    description:
      'Precision maintenance and performance tuning for manufacturing plant vehicles and equipment.',
    highlights: ['Preventive Care', 'Certified Team'],
    gradient: 'from-[#1f1f2e] via-[#2a2a3d] to-[#353550]',
    accentGlow: 'rgba(255,193,7,0.14)',
    badge: null,
  },
  {
    id: 'infrastructure',
    icon: Building2,
    title: 'Infrastructure',
    description:
      'Reliable vehicle support for infrastructure projects — from diagnostics to full custom builds.',
    highlights: ['Project Support', 'Premium Quality'],
    gradient: 'from-[#1e2a2a] via-[#263535] to-[#2e4040]',
    accentGlow: 'rgba(255,193,7,0.15)',
    badge: null,
  },
  {
    id: 'oil-gas',
    icon: Flame,
    title: 'Oil & Gas',
    description:
      'Ruggedised vehicle solutions built to withstand the extreme demands of oil and gas field operations.',
    highlights: ['Field-Ready Builds', 'Rapid Response'],
    gradient: 'from-[#2a1a0f] via-[#3d2510] to-[#522f12]',
    accentGlow: 'rgba(255,193,7,0.2)',
    badge: '24/7 Support',
  },
]

/* ─────────────────────────────────────────
   IndustryCard
───────────────────────────────────────── */
const IndustryCard = ({ icon: Icon, title, description, highlights, gradient, accentGlow, badge }) => (
  <motion.article
    whileHover={{ y: -8, scale: 1.015 }}
    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    className="group relative flex flex-col overflow-hidden rounded-[1.5rem] border border-white/[0.08] hover:border-primary/50 transition-[border-color,box-shadow,transform] duration-500 shadow-[0_4px_24px_rgba(0,0,0,0.18),0_1px_6px_rgba(0,0,0,0.12)] hover:shadow-[0_28px_72px_rgba(0,0,0,0.28),0_4px_20px_rgba(0,0,0,0.16)] cursor-pointer will-change-transform"
    style={{ minHeight: '420px' }}
    aria-label={`Industry: ${title}`}
  >
    {/* ── Image / gradient background ── */}
    <div className="absolute inset-0 overflow-hidden rounded-[1.5rem]">
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradient} group-hover:scale-[1.08] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]`}
      />
      {/* Dot texture overlay */}
      <div className="absolute inset-0 bg-dot-pattern opacity-[0.12]" />
      {/* Grid texture overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.06]" />
    </div>

    {/* ── Dark gradient overlay — deepens on hover ── */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10 group-hover:from-black/90 group-hover:via-black/40 transition-all duration-500" />

    {/* ── Yellow glow on hover ── */}
    <div
      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[1.5rem]"
      style={{
        background: `radial-gradient(ellipse 80% 60% at 50% 100%, ${accentGlow} 0%, transparent 70%)`,
      }}
    />

    {/* ── Top accent bar ── */}
    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary via-primary-500 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

    {/* ── Optional floating badge ── */}
    {badge && (
      <div className="absolute top-5 right-5 z-20">
        <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-primary/90 backdrop-blur-sm text-heading text-[10px] font-heading font-black uppercase tracking-wider shadow-primary">
          {badge}
        </span>
      </div>
    )}

    {/* ── Card content — pinned to bottom ── */}
    <div className="relative z-10 flex flex-col justify-end flex-1 p-7">

      {/* Glassmorphism icon container */}
      <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center mb-5 group-hover:bg-primary/90 group-hover:border-primary group-hover:shadow-primary transition-all duration-400 self-start overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <Icon
          size={20}
          className="relative z-10 text-white group-hover:text-heading group-hover:rotate-[-8deg] group-hover:scale-110 transition-all duration-400"
          aria-hidden="true"
        />
      </div>

      {/* Title */}
      <h3 className="font-heading font-bold text-display-sm text-white mb-2.5 leading-tight group-hover:text-primary transition-colors duration-300">
        {title}
      </h3>

      {/* Description */}
      <p className="text-body-sm text-white/65 leading-relaxed mb-5 group-hover:text-white/80 transition-colors duration-300">
        {description}
      </p>

      {/* Highlights */}
      <ul className="flex flex-col gap-1.5 mb-6" aria-label={`${title} highlights`}>
        {highlights.map((item) => (
          <li key={item} className="flex items-center gap-2 text-body-xs text-white/55 group-hover:text-white/75 transition-colors duration-300">
            <CheckCircle2
              size={12}
              className="text-primary shrink-0"
              aria-hidden="true"
            />
            {item}
          </li>
        ))}
      </ul>

      {/* Explore More link */}
      <div className="flex items-center gap-2 pt-4 border-t border-white/10 group-hover:border-primary/30 transition-colors duration-400">
        <Link
          to="/services"
          className="inline-flex items-center gap-2 text-body-xs font-heading font-bold text-white/60 group-hover:text-primary transition-colors duration-300"
          aria-label={`Explore more about ${title}`}
        >
          Explore More
          <ArrowRight
            size={13}
            className="transition-transform duration-300 group-hover:translate-x-1.5"
            aria-hidden="true"
          />
        </Link>
      </div>
    </div>
  </motion.article>
)

/* ─────────────────────────────────────────
   IndustriesSection
───────────────────────────────────────── */
const IndustriesSection = () => {
  const gridRef = useRef(null)

  /* GSAP staggered card entrance */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        gridRef.current?.children ?? [],
        { opacity: 0, y: 60, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 83%',
            once: true,
          },
        }
      )
    })
    return () => ctx.revert()
  }, [])

  return (
    <Section id="industries" surface className="relative overflow-hidden" aria-labelledby="industries-heading">

      {/* ── Section background ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 72% 55% at 50% 35%, rgba(255,193,7,0.06) 0%, transparent 65%), ' +
            'radial-gradient(ellipse 50% 40% at 90% 75%, rgba(255,193,7,0.04) 0%, transparent 60%)',
        }}
      />
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.022] pointer-events-none" />
      {/* Yellow blur circles */}
      <div className="absolute top-10 left-[5%] w-72 h-72 rounded-full bg-primary/[0.07] blur-[90px] pointer-events-none" />
      <div className="absolute bottom-10 right-[4%] w-56 h-56 rounded-full bg-primary/[0.06] blur-[70px] pointer-events-none" />

      {/* Floating decorative shapes */}
      <div className="absolute top-[8%] right-[44%] w-11 h-11 rounded-2xl bg-primary/10 border border-primary/15 hidden xl:block pointer-events-none opacity-60" aria-hidden="true" />
      <div className="absolute bottom-[14%] left-[46%] w-7 h-7 rounded-xl bg-border/70 border border-border hidden xl:block pointer-events-none opacity-60" aria-hidden="true" />
      <div className="absolute top-[20%] left-[48%] w-2.5 h-2.5 rounded-full bg-primary/40 hidden xl:block pointer-events-none" aria-hidden="true" />

      <Container className="relative z-10">

        {/* ══ Section header ══ */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center mb-14 lg:mb-16"
        >
          <Badge className="mb-5">Industries We Serve</Badge>

          <Heading as="h2" id="industries-heading" center className="mb-5 max-w-2xl">
            Powering Every{' '}
            <span className="text-gradient">Industry</span>
          </Heading>

          <p className="text-body-lg text-body max-w-xl leading-relaxed">
            From construction sites to oil fields, our premium automotive solutions are
            trusted across the most demanding industries in the region.
          </p>
        </motion.div>

        {/* ══ Cards grid ══ */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6"
        >
          {industries.map((industry) => (
            <IndustryCard key={industry.id} {...industry} />
          ))}
        </div>

      </Container>
    </Section>
  )
}

export default IndustriesSection
