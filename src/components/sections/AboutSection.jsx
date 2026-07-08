import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  ArrowRight,
  ShieldCheck,
  Users,
  Star,
  HeartHandshake,
  CheckCircle2,
} from 'lucide-react'
import Section   from '@/components/Section'
import Container from '@/components/Container'
import Heading   from '@/components/Heading'
import Badge     from '@/components/Badge'
import Button    from '@/components/Button'
import Card      from '@/components/Card'

gsap.registerPlugin(ScrollTrigger)

/* ─────────────────────────────────────────
   Static data
───────────────────────────────────────── */
const features = [
  {
    icon: ShieldCheck,
    title: 'Trusted Company',
    description: 'Over a decade of verified excellence, backed by hundreds of satisfied clients across the region.',
  },
  {
    icon: Users,
    title: 'Experienced Team',
    description: 'Certified master technicians with deep expertise across all vehicle makes, models, and disciplines.',
  },
  {
    icon: Star,
    title: 'Quality Services',
    description: 'Every job is held to the highest standard — precision, care, and craftsmanship in every detail.',
  },
  {
    icon: HeartHandshake,
    title: 'Customer Satisfaction',
    description: 'A 98% satisfaction rate built on transparency, honest pricing, and results that speak for themselves.',
  },
]

const highlights = [
  'ISO-certified workshop processes',
  'State-of-the-art diagnostic equipment',
  'Genuine OEM and premium aftermarket parts',
  'Transparent pricing with no hidden costs',
]

/* ─────────────────────────────────────────
   Framer Motion variants
───────────────────────────────────────── */
const fadeUp = {
  initial: { opacity: 0, y: 36 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
}

const stagger = {
  animate: { transition: { staggerChildren: 0.11 } },
}

const imageReveal = {
  initial: { opacity: 0, scale: 1.06, x: -28 },
  animate: {
    opacity: 1, scale: 1, x: 0,
    transition: { duration: 1.15, ease: [0.16, 1, 0.3, 1] },
  },
}

/* Individual stagger for mission/vision blocks */
const blockStagger = {
  animate: { transition: { staggerChildren: 0.14 } },
}

/* Checklist item — fade up */
const checkItem = {
  initial: { opacity: 0, y: 16 },
  animate: {
    opacity: 1, y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
}

const checkStagger = {
  animate: { transition: { staggerChildren: 0.09 } },
}

/* ─────────────────────────────────────────
   FeatureCard — Stripe / Linear style
───────────────────────────────────────── */
const FeatureCard = ({ icon: Icon, title, description }) => (
  <motion.div
    whileHover={{ scale: 1.02, y: -6 }}
    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    className={[
      'group relative overflow-hidden rounded-[1.25rem] p-7 lg:p-8',
      'bg-white border border-border',
      'shadow-[0_2px_16px_rgba(0,0,0,0.06),0_1px_3px_rgba(0,0,0,0.04)]',
      'hover:shadow-[0_20px_56px_rgba(0,0,0,0.12),0_4px_16px_rgba(0,0,0,0.06)]',
      'hover:border-primary/25',
      'transition-[border-color,box-shadow] duration-500',
    ].join(' ')}
  >
    {/* Top animated accent line */}
    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary via-primary-500 to-primary-700 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-t-[1.25rem]" />

    {/* Subtle background gradient */}
    <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

    {/* Decorative corner accent */}
    <div className="absolute top-4 right-4 w-6 h-6 rounded-full border border-primary/15 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
    <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-primary/30 translate-x-2 -translate-y-2 opacity-0 group-hover:opacity-100 transition-all duration-400" />

    {/* Icon with rotation micro-interaction */}
    <div className="relative w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary group-hover:shadow-primary transition-all duration-400 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-300/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <Icon
        size={20}
        className="relative z-10 text-primary group-hover:text-heading group-hover:rotate-[-8deg] transition-all duration-400"
      />
    </div>

    <h4 className="font-heading font-bold text-body-md text-heading mb-2.5 group-hover:text-primary transition-colors duration-300">
      {title}
    </h4>
    <p className="text-body-sm text-body leading-relaxed">{description}</p>

    {/* Animated bottom underline */}
    <div className="mt-5 h-px bg-gradient-to-r from-primary/40 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
  </motion.div>
)

/* ─────────────────────────────────────────
   AboutSection
───────────────────────────────────────── */
const AboutSection = () => {
  const sectionRef = useRef(null)
  const imageWrapRef = useRef(null)
  const cardsRef   = useRef(null)

  /* Parallax — image moves up slightly on scroll */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const imageY = useTransform(scrollYProgress, [0, 1], ['4%', '-4%'])

  /* GSAP staggered card entrance */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardsRef.current?.children ?? [],
        { opacity: 0, y: 52, scale: 0.97 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 84%',
            once: true,
          },
        }
      )
    })
    return () => ctx.revert()
  }, [])

  return (
    <Section id="about" className="relative overflow-hidden" aria-labelledby="about-heading">

      {/* ── Section background layers ── */}
      {/* Radial gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 15% 50%, rgba(255,193,7,0.055) 0%, transparent 70%), ' +
            'radial-gradient(ellipse 60% 50% at 85% 20%, rgba(255,193,7,0.04) 0%, transparent 65%)',
        }}
      />
      {/* Industrial grid texture */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.025] pointer-events-none" />

      <Container className="relative z-10">

        {/* ══ Two-column main layout ══ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-[1fr_2px_1fr] gap-14 xl:gap-0 items-center mb-20">

          {/* ── LEFT — image ── */}
          <motion.div
            variants={imageReveal}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.25 }}
            className="relative xl:pr-16 will-change-transform"
          >
            {/* Decorative yellow accent shapes */}
            <div className="absolute -top-6 -left-6 w-28 h-28 rounded-3xl bg-primary/[0.12] border border-primary/[0.18] -z-10 rotate-6" />
            <div className="absolute -bottom-5 -right-5 w-[4.5rem] h-[4.5rem] rounded-2xl bg-primary/[0.08] border border-primary/[0.12] -z-10 -rotate-12" />
            {/* Soft yellow glow behind badges */}
            <div className="absolute -bottom-8 right-2 w-40 h-40 rounded-full bg-primary/[0.12] blur-[40px] pointer-events-none" />
            <div className="absolute -top-6 right-8 w-28 h-28 rounded-full bg-primary/[0.10] blur-[32px] pointer-events-none" />

            {/* Parallax wrapper */}
            <motion.div style={{ y: imageY }} ref={imageWrapRef}>
              {/* Image zoom on hover */}
              <div className="group relative rounded-[2rem] overflow-hidden shadow-[0_28px_72px_rgba(0,0,0,0.13)] aspect-[3/4] sm:aspect-[4/5]" role="img" aria-label="Gariwala premium automotive workshop interior">
                {/* Placeholder — replace with: <img src="/about.jpg" alt="Gariwala premium automotive workshop" loading="lazy" /> */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#e8e8e8] via-[#d4d4d4] to-[#c0c0c0] group-hover:scale-[1.05] transition-transform duration-700 ease-expo-out will-change-transform" aria-hidden="true" />
                <div className="absolute inset-0 bg-dot-pattern opacity-30 group-hover:scale-[1.05] transition-transform duration-700 ease-expo-out" />
                <div className="absolute inset-0 bg-gradient-to-t from-heading/35 via-transparent to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.08] to-transparent" />

                {/* Bottom label */}
                <div className="absolute bottom-0 left-0 right-0 px-7 py-6 bg-gradient-to-t from-heading/80 to-transparent">
                  <p className="font-heading font-bold text-body-sm text-white/90 tracking-wide">
                    Premium Automotive Workshop
                  </p>
                  <p className="text-body-xs text-white/50 mt-0.5">Lahore, Pakistan — Est. 2012</p>
                </div>

                <div className="absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/10 pointer-events-none" />
              </div>
            </motion.div>

            {/* ── Floating badge — bottom right (4s cycle) ── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 16 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.55, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="absolute -bottom-6 -right-3 sm:right-5 z-10"
            >
              <motion.div
                animate={{ y: [0, -9, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut', delay: 0, repeatType: 'mirror' }}
                className="flex items-center gap-4 px-5 py-4 bg-white/96 backdrop-blur-xl rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.12),0_2px_8px_rgba(0,0,0,0.06)] border border-white/80"
              >
                <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center shadow-primary shrink-0">
                  <span className="font-heading font-black text-body-md text-heading leading-none">15+</span>
                </div>
                <div>
                  <p className="font-heading font-black text-body-md text-heading leading-tight">Years</p>
                  <p className="text-body-xs text-body leading-tight">of Experience</p>
                </div>
              </motion.div>
            </motion.div>

            {/* ── Floating badge — top right (5.5s cycle, 1.2s delay) ── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: -16 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.75, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="absolute -top-4 right-5 sm:right-10 z-10"
            >
              <motion.div
                animate={{ y: [0, -7, 0] }}
                transition={{ repeat: Infinity, duration: 5.5, ease: 'easeInOut', delay: 1.2, repeatType: 'mirror' }}
                className="flex items-center gap-3 px-4 py-3 bg-white/96 backdrop-blur-xl rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.10),0_2px_8px_rgba(0,0,0,0.05)] border border-white/80"
              >
                <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Star size={14} className="text-primary fill-primary" />
                </div>
                <div>
                  <p className="font-heading font-bold text-body-sm text-heading leading-tight">500+</p>
                  <p className="text-body-xs text-body leading-tight">Projects Done</p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* ── Vertical divider (xl only) ── */}
          <div className="hidden xl:flex flex-col items-center self-stretch py-8 mx-8">
            <div className="w-px flex-1 bg-gradient-to-b from-transparent via-border to-transparent" />
            <div className="w-2 h-2 rounded-full bg-primary my-3 shadow-primary" />
            <div className="w-px flex-1 bg-gradient-to-b from-transparent via-border to-transparent" />
          </div>

          {/* ── RIGHT — content ── */}
          <motion.div
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.2 }}
            className="flex flex-col xl:pl-16"
          >
            <motion.div variants={fadeUp}>
              <Badge className="mb-6">Who We Are</Badge>
            </motion.div>

            <motion.div variants={fadeUp}>
              <Heading as="h2" id="about-heading" className="mb-7">
                Passion Meets
                <br />
                <span className="text-gradient">Precision</span>
              </Heading>
            </motion.div>

            <motion.p variants={fadeUp} className="text-body-lg text-body leading-relaxed mb-7">
              Founded in 2012 on a genuine love for automobiles, Gariwala has grown into the
              region's most trusted name for premium automotive care. We combine cutting-edge
              technology with old-school craftsmanship to deliver results that consistently
              exceed expectations.
            </motion.p>

            {/* Mission + Vision — individually staggered */}
            <motion.div variants={blockStagger} className="flex flex-col gap-4 mb-8">
              {/* Mission */}
              <motion.div
                variants={fadeUp}
                className="group pl-5 border-l-2 border-primary hover:border-primary-600 transition-colors duration-300"
              >
                <p className="text-body-xs font-heading font-bold uppercase tracking-[0.14em] text-primary mb-1.5">
                  Our Mission
                </p>
                <p className="text-body-md text-body leading-relaxed">
                  To deliver world-class automotive services with uncompromising quality,
                  complete transparency, and a relentless commitment to customer satisfaction.
                </p>
              </motion.div>

              {/* Vision */}
              <motion.div
                variants={fadeUp}
                className="group pl-5 border-l-2 border-border hover:border-primary/40 transition-colors duration-300"
              >
                <p className="text-body-xs font-heading font-bold uppercase tracking-[0.14em] text-body/60 mb-1.5">
                  Our Vision
                </p>
                <p className="text-body-md text-body leading-relaxed">
                  To be the benchmark for automotive excellence across Pakistan — a company
                  where every vehicle is treated as a masterpiece.
                </p>
              </motion.div>
            </motion.div>

            {/* Checklist — one-by-one blur reveal */}
            <motion.ul
              variants={checkStagger}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, amount: 0.3 }}
              className="flex flex-col gap-3 mb-10"
            >
              {highlights.map((item) => (
                <motion.li
                  key={item}
                  variants={checkItem}
                  className="flex items-center gap-3 text-body-sm text-body"
                >
                  <span className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors duration-300">
                    <CheckCircle2 size={12} className="text-primary" />
                  </span>
                  {item}
                </motion.li>
              ))}
            </motion.ul>

            {/* CTA — arrow slides on hover */}
            <motion.div variants={fadeUp}>
              <Button
                as={Link}
                to="/about"
                size="lg"
                className="group/btn"
              >
                Learn More About Us
                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover/btn:translate-x-1"
                />
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* ══ Feature cards ══ */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6"
          role="list"
          aria-label="Our key strengths"
        >
          {features.map(({ icon, title, description }) => (
            <FeatureCard key={title} icon={icon} title={title} description={description} />
          ))}
        </div>

      </Container>
    </Section>
  )
}

export default AboutSection
