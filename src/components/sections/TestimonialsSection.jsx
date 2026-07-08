import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation, A11y } from 'swiper/modules'
import { Link } from 'react-router-dom'
import { Star, Quote, ArrowRight, Award, CheckCircle, Clock } from 'lucide-react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

import Section   from '@/components/Section'
import Container from '@/components/Container'
import Heading   from '@/components/Heading'
import Badge     from '@/components/Badge'
import Button    from '@/components/Button'
import { useCountUp } from '@/hooks/useCountUp'

gsap.registerPlugin(ScrollTrigger)

/* ─────────────────────────────────────────
   Data
───────────────────────────────────────── */
const testimonials = [
  {
    id: 't1',
    name: 'Ahmed Raza',
    position: 'Fleet Operations Director',
    company: 'Pak Logistics Group',
    category: 'Fleet Management',
    text: "Gariwala transformed our entire fleet maintenance operation. Their systematic approach and attention to detail reduced our downtime by 40%. The team's professionalism is unmatched in the industry.",
    rating: 5,
    avatar: 'AR',
    avatarGradient: 'from-[#1a2a3a] to-[#2d4a6a]',
  },
  {
    id: 't2',
    name: 'Sana Malik',
    position: 'Chief Executive Officer',
    company: 'Malik Enterprises',
    category: 'Corporate Services',
    text: 'We have been partnering with Gariwala for over three years. Their corporate vehicle management service is exceptional — always on time, always premium quality. Truly a world-class operation.',
    rating: 5,
    avatar: 'SM',
    avatarGradient: 'from-[#2a1a3a] to-[#4a2d6a]',
  },
  {
    id: 't3',
    name: 'Tariq Hussain',
    position: 'Head of Procurement',
    company: 'National Construction Co.',
    category: 'Heavy Vehicles',
    text: "Our heavy machinery and construction vehicles require specialist care. Gariwala's technical expertise is extraordinary. They handle everything from routine servicing to complex overhauls with equal precision.",
    rating: 5,
    avatar: 'TH',
    avatarGradient: 'from-[#1a2a1a] to-[#2d4a2d]',
  },
  {
    id: 't4',
    name: 'Zara Qureshi',
    position: 'Managing Director',
    company: 'Qureshi Motors',
    category: 'Dealership Partner',
    text: "As a dealership, we demand the highest standards for our clients' vehicles. Gariwala consistently delivers beyond expectations. Their certified technicians and premium facilities set the benchmark.",
    rating: 5,
    avatar: 'ZQ',
    avatarGradient: 'from-[#2a1a1a] to-[#4a2d2d]',
  },
  {
    id: 't5',
    name: 'Bilal Chaudhry',
    position: 'Operations Manager',
    company: 'Chaudhry Transport Ltd.',
    category: 'Transport & Logistics',
    text: 'Reliability is everything in transport. Gariwala understands this completely. Their preventive maintenance programs have kept our fleet running at peak efficiency for two consecutive years.',
    rating: 5,
    avatar: 'BC',
    avatarGradient: 'from-[#1a1a2a] to-[#2d2d4a]',
  },
  {
    id: 't6',
    name: 'Farrukh Baig',
    position: 'General Manager',
    company: 'Baig Industrial Group',
    category: 'Industrial Fleet',
    text: 'The level of technical knowledge and customer service at Gariwala is remarkable. They diagnosed and resolved a complex engine issue that three other workshops had failed to identify. Truly elite.',
    rating: 5,
    avatar: 'FB',
    avatarGradient: 'from-[#2a2a1a] to-[#4a4a2d]',
  },
]

const trustLogos = [
  { id: 'l1', name: 'Pak Logistics Group',   abbr: 'PLG', color: '#1a4a8a' },
  { id: 'l2', name: 'Malik Enterprises',     abbr: 'ME',  color: '#8a1a1a' },
  { id: 'l3', name: 'National Construction', abbr: 'NCC', color: '#1a6a2a' },
  { id: 'l4', name: 'Qureshi Motors',        abbr: 'QM',  color: '#6a1a6a' },
  { id: 'l5', name: 'Chaudhry Transport',    abbr: 'CTL', color: '#1a5a5a' },
  { id: 'l6', name: 'Baig Industrial',       abbr: 'BIG', color: '#5a4a1a' },
  { id: 'l7', name: 'Premier Auto Group',    abbr: 'PAG', color: '#1a3a5a' },
  { id: 'l8', name: 'Horizon Fleet Co.',     abbr: 'HFC', color: '#3a1a5a' },
]

const stats = [
  { icon: CheckCircle, label: 'Client Satisfaction', value: '98%'  },
  { icon: Award,       label: 'Completed Projects',  value: '500+' },
  { icon: Clock,       label: 'Years Experience',    value: '15+'  },
]

/* ─────────────────────────────────────────
   StarRating
───────────────────────────────────────── */
const StarRating = ({ rating = 5, size = 14 }) => (
  <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
    {Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        size={size}
        className={i < rating ? 'text-primary fill-primary' : 'text-border fill-border'}
        aria-hidden="true"
      />
    ))}
  </div>
)

/* ─────────────────────────────────────────
   TestimonialCard
───────────────────────────────────────── */
const TestimonialCard = ({ name, position, company, category, text, rating, avatar, avatarGradient }) => (
  <motion.article
    whileHover={{ y: -6, scale: 1.01 }}
    transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
    className="group relative flex flex-col h-full bg-white rounded-[1.5rem] border border-border overflow-hidden p-7 lg:p-8 shadow-card hover:shadow-card-hover hover:border-primary/40 transition-[border-color,box-shadow,transform] duration-500 will-change-transform"
    aria-label={`Testimonial from ${name}, ${position} at ${company}`}
  >
    {/* Top accent bar */}
    <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-primary via-primary-500 to-primary-700 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

    {/* Background glow */}
    <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.025] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[1.5rem]" />

    {/* Bottom yellow glow */}
    <div
      className="absolute bottom-0 left-0 right-0 h-32 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
      style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(255,193,7,0.08) 0%, transparent 70%)' }}
    />

    {/* Quote icon */}
    <div className="absolute top-6 right-6 z-10">
      <div
        className="w-10 h-10 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300"
        aria-hidden="true"
      >
        <Quote size={16} className="text-primary fill-primary/30" />
      </div>
    </div>

    {/* Stars */}
    <div className="mb-5">
      <StarRating rating={rating} size={15} />
    </div>

    {/* Quote text */}
    <blockquote className="flex-1 text-body-sm text-body leading-relaxed mb-6 relative z-10">
      &ldquo;{text}&rdquo;
    </blockquote>

    {/* Divider */}
    <div className="w-full h-px bg-border mb-5" />

    {/* Profile row */}
    <div className="flex items-center gap-4 relative z-10">
      <div className="relative shrink-0">
        <div
          className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${avatarGradient} flex items-center justify-center overflow-hidden group-hover:scale-110 transition-transform duration-500`}
        >
          <span className="font-heading font-bold text-body-sm text-white/90 tracking-wide">
            {avatar}
          </span>
        </div>
        <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-white" aria-hidden="true" />
      </div>

      <div className="flex-1 min-w-0">
        <p className="font-heading font-bold text-body-sm text-heading leading-tight truncate">{name}</p>
        <p className="text-body-xs text-body truncate mt-0.5">{position} &middot; {company}</p>
      </div>

      <Badge variant="primary" className="shrink-0 text-[9px] px-2 py-0.5 hidden sm:inline-flex">
        {category}
      </Badge>
    </div>
  </motion.article>
)

/* ─────────────────────────────────────────
   SatisfactionPanel
───────────────────────────────────────── */
const SatisfactionPanel = () => {
  const [started, setStarted] = useState(false)
  const ratingRef = useRef(null)
  /* Count 0→49 then display as x/10 → "4.9" */
  const count = useCountUp(49, 1600, started)

  useEffect(() => {
    const el = ratingRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.disconnect() } },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div className="flex flex-col h-full">

      {/* Rating card */}
      <div className="relative rounded-[1.5rem] border border-border bg-white overflow-hidden p-8 shadow-card hover:shadow-card-md hover:border-primary/20 transition-[border-color,box-shadow] duration-500 mb-5">
        <div className="absolute top-0 left-0 w-24 h-24 rounded-br-[3rem] bg-primary/[0.06] pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-primary via-primary-500 to-primary-700" />

        <div className="flex items-center gap-1 mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={22} className="text-primary fill-primary" aria-hidden="true" />
          ))}
        </div>

        <div
          ref={ratingRef}
          className="flex items-end gap-2 mb-2"
          aria-live="polite"
          aria-label={`Rating: ${(count / 10).toFixed(1)} out of 5`}
        >
          <span className="font-heading font-black text-[4rem] leading-none text-heading tracking-tight tabular-nums">
            {(count / 10).toFixed(1)}
          </span>
          <span className="font-heading font-bold text-body-lg text-body mb-2">/5</span>
        </div>

        <p className="text-body-sm text-body leading-relaxed">
          Average Rating &mdash; based on{' '}
          <span className="font-heading font-semibold text-heading">500+</span>{' '}
          successful client engagements.
        </p>
      </div>

      {/* Stats */}
      <div className="flex flex-col gap-3 mb-5">
        {stats.map(({ icon: Icon, label, value }) => (
          <div
            key={label}
            className="group/stat flex items-center gap-4 rounded-2xl border border-border bg-white px-5 py-4 shadow-xs hover:border-primary/35 hover:shadow-card-md transition-all duration-300"
          >
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover/stat:bg-primary group-hover/stat:shadow-primary transition-all duration-300">
              <Icon size={18} className="text-primary group-hover/stat:text-heading transition-colors duration-300" aria-hidden="true" />
            </div>
            <div className="flex-1">
              <p className="font-heading font-black text-display-sm text-heading leading-none">{value}</p>
              <p className="text-body-xs text-body mt-0.5">{label}</p>
            </div>
            <div className="w-2 h-2 rounded-full bg-primary/30 group-hover/stat:bg-primary transition-colors duration-300 shrink-0" />
          </div>
        ))}
      </div>

      {/* CTA */}
      <Button
        as={Link}
        to="/projects"
        size="md"
        className="group/cta w-full justify-center"
        aria-label="View all success stories"
      >
        View All Success Stories
        <ArrowRight
          size={16}
          className="transition-transform duration-300 group-hover/cta:translate-x-1"
          aria-hidden="true"
        />
      </Button>
    </div>
  )
}

/* ─────────────────────────────────────────
   TrustLogoItem — isolated so hover state
   is managed per-item without inline handlers
───────────────────────────────────────── */
const TrustLogoItem = ({ name, abbr, color }) => {
  const [hovered, setHovered] = useState(false)
  return (
    <motion.div
      whileHover={{ y: -3, scale: 1.06 }}
      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="group/logo relative flex items-center justify-center w-[calc(50%-0.375rem)] xs:w-[calc(33.333%-0.5rem)] sm:w-36 lg:w-40 h-14 sm:h-16 rounded-2xl border border-border bg-white shadow-[0_1px_6px_rgba(0,0,0,0.05)] hover:border-primary/30 hover:shadow-card-md transition-all duration-300 cursor-default overflow-hidden"
      aria-label={name}
      role="img"
    >
      <div
        className="absolute inset-0 opacity-0 group-hover/logo:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
        style={{ background: `radial-gradient(ellipse 80% 60% at 50% 50%, ${color}18 0%, transparent 70%)` }}
      />
      <div className="relative z-10 flex flex-col items-center gap-1">
        <span
          className="font-heading font-black text-body-md tracking-tight transition-colors duration-300"
          style={{ color: hovered ? color : '#9ca3af' }}
        >
          {abbr}
        </span>
        <span className="text-[9px] font-heading font-semibold uppercase tracking-[0.12em] text-body/30 group-hover/logo:text-body/55 transition-colors duration-300 text-center px-2 leading-tight">
          {name}
        </span>
      </div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────
   TrustLogos
───────────────────────────────────────── */
const TrustLogos = ({ containerRef }) => (
  <div ref={containerRef} className="mt-16 lg:mt-20">
    <p className="text-center text-body-xs font-heading font-bold uppercase tracking-[0.18em] text-body/50 mb-8">
      Trusted by industry leaders across Pakistan
    </p>
    <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4">
      {trustLogos.map(({ id, name, abbr, color }) => (
        <TrustLogoItem key={id} name={name} abbr={abbr} color={color} />
      ))}
    </div>
  </div>
)

/* ─────────────────────────────────────────
   TestimonialsSection
───────────────────────────────────────── */
const TestimonialsSection = () => {
  const headerRef   = useRef(null)
  const panelRef    = useRef(null)
  const carouselRef = useRef(null)
  const logosRef    = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 44 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 86%', once: true } }
      )
      gsap.fromTo(
        panelRef.current,
        { opacity: 0, x: -40 },
        { opacity: 1, x: 0, duration: 0.85, ease: 'power3.out', delay: 0.1,
          scrollTrigger: { trigger: panelRef.current, start: 'top 84%', once: true } }
      )
      gsap.fromTo(
        carouselRef.current,
        { opacity: 0, x: 40 },
        { opacity: 1, x: 0, duration: 0.85, ease: 'power3.out', delay: 0.2,
          scrollTrigger: { trigger: carouselRef.current, start: 'top 84%', once: true } }
      )
      gsap.fromTo(
        logosRef.current,
        { opacity: 0, y: 32 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: logosRef.current, start: 'top 88%', once: true } }
      )
    })
    return () => ctx.revert()
  }, [])

  return (
    <Section id="testimonials" surface className="relative overflow-hidden" aria-labelledby="testimonials-heading">

      {/* Background layers */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 20%, rgba(255,193,7,0.06) 0%, transparent 65%), ' +
            'radial-gradient(ellipse 40% 35% at 8% 75%, rgba(255,193,7,0.045) 0%, transparent 60%)',
        }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.022] pointer-events-none" aria-hidden="true" />
      <div className="absolute top-10 right-[5%] w-72 h-72 rounded-full bg-primary/[0.07] blur-[96px] pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-20 left-[4%] w-56 h-56 rounded-full bg-primary/[0.05] blur-[80px] pointer-events-none" aria-hidden="true" />

      {/* Floating accents */}
      <motion.div
        initial={{ opacity: 0, rotate: 0 }}
        animate={{ opacity: 1, rotate: 18 }}
        transition={{ delay: 0.8, duration: 1.8 }}
        className="absolute top-[8%] left-[44%] w-9 h-9 rounded-2xl bg-primary/[0.09] border border-primary/[0.14] hidden xl:block pointer-events-none"
        aria-hidden="true"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.1, duration: 0.9 }}
        className="absolute bottom-[22%] right-[46%] w-2.5 h-2.5 rounded-full bg-primary/30 hidden xl:block pointer-events-none"
        aria-hidden="true"
      />

      <Container className="relative z-10">

        {/* Header */}
        <div ref={headerRef} className="flex flex-col items-center text-center mb-14 lg:mb-16">
          <Badge className="mb-5">Client Testimonials</Badge>
          <Heading as="h2" id="testimonials-heading" center className="mb-5 max-w-2xl">
            Trusted by{' '}
            <span className="text-gradient">Industry Leaders</span>
          </Heading>
          <p className="text-body-lg text-body max-w-xl leading-relaxed">
            Real results, real relationships. Hear directly from the companies that rely on
            Gariwala for their most critical automotive and fleet requirements.
          </p>
        </div>

        {/* Main layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[35%_1fr] gap-8 lg:gap-10 items-start">

          {/* Left — Satisfaction panel */}
          <div ref={panelRef}>
            <SatisfactionPanel />
          </div>

          {/* Right — Carousel */}
          <div ref={carouselRef} className="min-w-0">
            <Swiper
              modules={[Autoplay, Pagination, Navigation, A11y]}
              spaceBetween={20}
              slidesPerView={1}
              breakpoints={{
                640:  { slidesPerView: 1, spaceBetween: 20 },
                768:  { slidesPerView: 2, spaceBetween: 20 },
                1024: { slidesPerView: 2, spaceBetween: 24 },
              }}
              autoplay={{ delay: 4500, disableOnInteraction: false, pauseOnMouseEnter: true }}
              loop
              pagination={{ clickable: true }}
              navigation
              a11y={{ prevSlideMessage: 'Previous testimonial', nextSlideMessage: 'Next testimonial' }}
              className="testimonials-swiper !pb-12"
            >
              {testimonials.map((t) => (
                <SwiperSlide key={t.id} className="h-auto">
                  <TestimonialCard {...t} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        {/* Trust logos */}
        <TrustLogos containerRef={logosRef} />

      </Container>
    </Section>
  )
}

export default TestimonialsSection
