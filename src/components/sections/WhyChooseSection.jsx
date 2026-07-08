import { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Users,
  BadgeCheck,
  Cpu,
  Zap,
  Wrench,
  HeartHandshake,
  MessageSquare,
  ClipboardList,
  Settings2,
  PackageCheck,
} from 'lucide-react'
import Section   from '@/components/Section'
import Container from '@/components/Container'
import Heading   from '@/components/Heading'
import Badge     from '@/components/Badge'

gsap.registerPlugin(ScrollTrigger)

/* ─────────────────────────────────────────
   Static data
───────────────────────────────────────── */
const usps = [
  {
    icon: Users,
    title: 'Experienced Professionals',
    description: 'Our team of certified master technicians brings decades of hands-on expertise to every job.',
  },
  {
    icon: BadgeCheck,
    title: 'High Quality Standards',
    description: 'Every service is held to ISO-grade quality benchmarks — no shortcuts, no compromises.',
  },
  {
    icon: Cpu,
    title: 'Certified Engineers',
    description: 'Factory-trained and industry-certified engineers across all major vehicle platforms.',
  },
  {
    icon: Zap,
    title: 'Fast Project Delivery',
    description: 'Streamlined workflows and modern tooling ensure your vehicle is returned on time, every time.',
  },
  {
    icon: Wrench,
    title: 'Modern Equipment',
    description: 'State-of-the-art diagnostic and fabrication equipment for precision results at every stage.',
  },
  {
    icon: HeartHandshake,
    title: 'Customer Satisfaction',
    description: 'A 98% satisfaction rate built on honest communication, fair pricing, and outstanding results.',
  },
]

const steps = [
  {
    number: '01',
    icon: MessageSquare,
    title: 'Consultation',
    description:
      'We begin with a thorough consultation to understand your vehicle, your goals, and your expectations — no assumptions.',
  },
  {
    number: '02',
    icon: ClipboardList,
    title: 'Planning',
    description:
      'A detailed project plan is crafted with transparent timelines, itemised costs, and clear milestones.',
  },
  {
    number: '03',
    icon: Settings2,
    title: 'Execution',
    description:
      'Our certified team executes the work with precision, using only premium parts and proven techniques.',
  },
  {
    number: '04',
    icon: PackageCheck,
    title: 'Delivery',
    description:
      'Your vehicle is delivered on schedule, fully inspected, and backed by our comprehensive quality guarantee.',
  },
]

/* ─────────────────────────────────────────
   UspCard
───────────────────────────────────────── */
const UspCard = ({ icon: Icon, title, description }) => (
  <motion.div
    whileHover={{ y: -6, scale: 1.02 }}
    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    className={[
      'group relative overflow-hidden rounded-[1.25rem] p-6',
      'bg-white border border-border',
      'shadow-card',
      'hover:shadow-card-hover',
      'hover:border-primary/30',
      'transition-[border-color,box-shadow,transform] duration-500',
      'will-change-transform',
    ].join(' ')}
  >
    {/* Top accent bar */}
    <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-primary via-primary-500 to-primary-700 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

    {/* Background glow */}
    <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

    {/* Decorative corner lines */}
    <div className="absolute top-4 right-4 flex flex-col items-end gap-1 pointer-events-none">
      <div className="w-6 h-px bg-border group-hover:bg-primary/30 transition-colors duration-400 rounded-full" />
      <div className="w-4 h-px bg-border group-hover:bg-primary/20 transition-colors duration-400 rounded-full" />
    </div>

    {/* Icon */}
    <div className="relative w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:shadow-primary transition-all duration-400 overflow-hidden shrink-0">
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <Icon
        size={19}
        className="relative z-10 text-primary group-hover:text-heading group-hover:rotate-[-8deg] group-hover:scale-110 transition-all duration-400"
        aria-hidden="true"
      />
    </div>

    <h4 className="font-heading font-bold text-body-md text-heading mb-2 group-hover:text-primary transition-colors duration-300 leading-snug">
      {title}
    </h4>
    <p className="text-body-sm text-body leading-relaxed">{description}</p>

    {/* Bottom underline */}
    <div className="mt-4 h-px bg-gradient-to-r from-primary/40 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
  </motion.div>
)

/* ─────────────────────────────────────────
   TimelineStep
───────────────────────────────────────── */
const TimelineStep = ({ number, icon: Icon, title, description, index, isLast }) => {
  const stepRef = useRef(null)
  const isInView = useInView(stepRef, { once: true, margin: '-60px 0px' })

  return (
    <motion.div
      ref={stepRef}
      initial={{ opacity: 0, x: 32 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: index * 0.15 }}
      className="relative flex gap-5"
    >
      {/* ── Node + connecting line column ── */}
      <div className="flex flex-col items-center shrink-0">
        {/* Pulsing node */}
        <div className="relative flex items-center justify-center">
          {/* Pulse ring — only on first step as "active" */}
          {index === 0 && (
            <motion.div
              animate={{ scale: [1, 1.55, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
              className="absolute w-10 h-10 rounded-full bg-primary/20"
            />
          )}
          <motion.div
            animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.6, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: index * 0.15 + 0.1 }}
            className={[
              'relative z-10 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors duration-500',
              isInView
                ? 'bg-primary border-primary shadow-primary'
                : 'bg-white border-border',
            ].join(' ')}
          >
            <Icon
              size={14}
              className={isInView ? 'text-heading' : 'text-body'}
              aria-hidden="true"
            />
          </motion.div>
        </div>

        {/* Connecting line */}
        {!isLast && (
          <div className="relative w-px flex-1 mt-2 mb-2 overflow-hidden bg-border" style={{ minHeight: '3rem' }}>
            <motion.div
              initial={{ scaleY: 0 }}
              animate={isInView ? { scaleY: 1 } : {}}
              transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.15 + 0.3 }}
              className="absolute inset-0 bg-gradient-to-b from-primary to-primary/30 origin-top"
            />
          </div>
        )}
      </div>

      {/* ── Step content ── */}
      <div className={`pb-8 ${isLast ? 'pb-0' : ''}`}>
        {/* Step number */}
        <span className="font-heading font-black text-body-xs text-primary/50 tracking-[0.22em] block mb-1.5">
          {number}
        </span>

        {/* Title */}
        <h4 className="font-heading font-bold text-display-sm text-heading mb-2 leading-tight">
          {title}
        </h4>

        {/* Description */}
        <p className="text-body-sm text-body leading-relaxed max-w-xs">
          {description}
        </p>
      </div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────
   WhyChooseSection
───────────────────────────────────────── */
const WhyChooseSection = () => {
  const cardsRef = useRef(null)

  /* GSAP staggered USP card entrance */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardsRef.current?.children ?? [],
        { opacity: 0, y: 48, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.09,
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 83%',
            once: true,
          },
        }
      )
    })
    return () => ctx.revert()
  }, [])

  return (
    <Section id="why-choose-us" className="relative overflow-hidden" aria-labelledby="why-heading">

      {/* ── Section background ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 20% 50%, rgba(255,193,7,0.055) 0%, transparent 65%), ' +
            'radial-gradient(ellipse 55% 45% at 85% 30%, rgba(255,193,7,0.04) 0%, transparent 60%)',
        }}
      />
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.022] pointer-events-none" />
      <div className="absolute top-16 left-[3%] w-60 h-60 rounded-full bg-primary/[0.07] blur-[80px] pointer-events-none" />
      <div className="absolute bottom-12 right-[5%] w-48 h-48 rounded-full bg-primary/[0.06] blur-[64px] pointer-events-none" />

      {/* Floating decorative shapes */}
      <div className="absolute top-[12%] right-[42%] w-10 h-10 rounded-xl bg-primary/10 border border-primary/15 hidden xl:block pointer-events-none opacity-60" aria-hidden="true" />
      <div className="absolute bottom-[18%] left-[44%] w-7 h-7 rounded-lg bg-border/60 border border-border hidden xl:block pointer-events-none opacity-60" aria-hidden="true" />

      <Container className="relative z-10">

        {/* ══ Section header ══ */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center mb-14 lg:mb-16"
        >
          <Badge className="mb-5">Why Choose Us</Badge>
          <Heading as="h2" id="why-heading" center className="mb-5 max-w-2xl">
            Built on{' '}
            <span className="text-gradient">Excellence</span>
          </Heading>
          <p className="text-body-lg text-body max-w-xl leading-relaxed">
            From the first consultation to final delivery, every step of our process is
            designed to exceed your expectations — consistently and without compromise.
          </p>
        </motion.div>

        {/* ══ Two-column layout ══ */}
        <div className="grid grid-cols-1 lg:grid-cols-[55fr_45fr] gap-12 xl:gap-20 items-start">

          {/* ── LEFT — USP cards ── */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mb-7"
            >
              <span className="eyebrow">Our Strengths</span>
            </motion.div>

            <div
              ref={cardsRef}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {usps.map(({ icon, title, description }) => (
                <UspCard key={title} icon={icon} title={title} description={description} />
              ))}
            </div>
          </div>

          {/* ── RIGHT — Process timeline ── */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mb-7"
            >
              <span className="eyebrow">How We Work</span>
            </motion.div>

            {/* Timeline card wrapper */}
            <div
              className={[
                'relative rounded-[1.5rem] p-7 lg:p-9',
                'bg-white border border-border',
                'shadow-card',
                'transition-[border-color,box-shadow] duration-500',
                'hover:shadow-card-md hover:border-primary/20',
              ].join(' ')}
            >
              {/* Subtle inner gradient */}
              <div className="absolute inset-0 rounded-[1.5rem] bg-gradient-to-br from-primary/[0.025] via-transparent to-transparent pointer-events-none" />

              <div className="relative z-10">
                {steps.map((step, i) => (
                  <TimelineStep
                    key={step.number}
                    {...step}
                    index={i}
                    isLast={i === steps.length - 1}
                  />
                ))}
              </div>
            </div>
          </div>

        </div>
      </Container>
    </Section>
  )
}

export default WhyChooseSection
