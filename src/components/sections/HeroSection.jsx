import { useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ArrowRight, Star, Shield, Wrench, Award, CheckCircle2 } from 'lucide-react'
import { gsap } from 'gsap'
import Button from '@/components/Button'
import Container from '@/components/Container'

/* ── static data ── */
const stats = [
  { value: '500+', label: 'Projects Done' },
  { value: '12+',  label: 'Years Experience' },
  { value: '98%',  label: 'Client Satisfaction' },
]

const floatingBadges = [
  {
    id: 'exp',
    icon: Award,
    title: '12 Years',
    sub: 'Industry Experience',
    className: 'top-[12%] right-[-5%] xl:right-[-8%]',
    delay: 0,
  },
  {
    id: 'cert',
    icon: Shield,
    title: 'Certified',
    sub: 'Master Technicians',
    className: 'bottom-[22%] right-[-4%] xl:right-[-6%]',
    delay: 0.15,
  },
  {
    id: 'done',
    icon: CheckCircle2,
    title: '500+ Jobs',
    sub: 'Successfully Completed',
    className: 'bottom-[8%] left-[4%]',
    delay: 0.3,
  },
]

/* ── framer variants ── */
const stagger = { animate: { transition: { staggerChildren: 0.11 } } }
const fadeUp  = {
  initial: { opacity: 0, y: 36 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] } },
}
const imageReveal = {
  initial: { opacity: 0, scale: 1.06, x: 40 },
  animate: { opacity: 1, scale: 1, x: 0, transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.2 } },
}

/* ── FloatingCard ── */
const FloatingCard = ({ icon: Icon, title, sub, className, delay }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.85, y: 16 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    transition={{ delay: 0.9 + delay, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    className={`absolute z-20 ${className}`}
    aria-hidden="true"
  >
    <motion.div
      animate={{ y: [0, -8, 0] }}
      transition={{ repeat: Infinity, duration: 4 + delay * 2, ease: 'easeInOut', delay: delay * 0.5, repeatType: 'mirror' }}
      className="flex items-center gap-3 px-4 py-3 bg-white/96 backdrop-blur-xl rounded-2xl shadow-card-md border border-border/60 whitespace-nowrap will-change-transform"
    >
      <span className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
        <Icon size={16} className="text-primary" aria-hidden="true" />
      </span>
      <div>
        <p className="font-heading font-bold text-body-sm text-heading leading-tight">{title}</p>
        <p className="text-body-xs text-body leading-tight">{sub}</p>
      </div>
    </motion.div>
  </motion.div>
)

/* ── HeroSection ── */
const HeroSection = () => {
  const sectionRef = useRef(null)
  const leftRef    = useRef(null)

  /* mouse parallax */
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 55, damping: 22 })
  const springY = useSpring(mouseY, { stiffness: 55, damping: 22 })
  const imgX = useTransform(springX, [-0.5, 0.5], [-10, 10])
  const imgY = useTransform(springY, [-0.5, 0.5], [-8, 8])

  const handleMouseMove = useCallback((e) => {
    if (!sectionRef.current) return
    const { left, top, width, height } = sectionRef.current.getBoundingClientRect()
    mouseX.set((e.clientX - left) / width - 0.5)
    mouseY.set((e.clientY - top) / height - 0.5)
  }, [mouseX, mouseY])

  /* GSAP entrance */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        leftRef.current.children,
        { opacity: 0, y: 48 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.1,
          delay: 0.15,
        }
      )
    })
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center bg-white overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* ── Background layers ── */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none" aria-hidden="true" />
      <div className="absolute top-0 left-0 w-[55%] h-full bg-gradient-to-r from-surface/60 to-transparent pointer-events-none" aria-hidden="true" />
      <div className="absolute top-1/3 left-[5%] w-96 h-96 rounded-full bg-primary/[0.06] blur-[100px] pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-1/4 left-[20%] w-64 h-64 rounded-full bg-primary/[0.05] blur-[80px] pointer-events-none animate-pulse-slow" aria-hidden="true" />

      {/* ── Decorative shapes ── */}
      <motion.div
        initial={{ opacity: 0, rotate: 0 }}
        animate={{ opacity: 1, rotate: 15 }}
        transition={{ delay: 1.2, duration: 1.4 }}
        className="absolute top-[15%] left-[42%] w-14 h-14 rounded-2xl bg-primary/15 border border-primary/20 hidden xl:block pointer-events-none"
        aria-hidden="true"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute top-[22%] left-[52%] w-3 h-3 rounded-full bg-primary hidden xl:block pointer-events-none"
        aria-hidden="true"
      />

      <Container className="relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center min-h-screen pt-32 pb-16 lg:py-0">

          {/* ══ LEFT COLUMN ══ */}
          <div ref={leftRef} className="flex flex-col justify-center">

            {/* Trust badge */}
            <div className="flex items-center gap-3 mb-8">
              <div className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 w-fit">
                <div className="flex -space-x-0.5" aria-hidden="true">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={10} className="text-primary fill-primary" />
                  ))}
                </div>
                <span className="text-body-xs font-heading font-bold text-heading tracking-wide">
                  Premium Automotive Services
                </span>
              </div>
            </div>

            {/* Headline */}
            <h1
              id="hero-heading"
              className="font-heading font-black text-display-xl text-heading leading-[1.03] tracking-[-0.03em] mb-7"
            >
              Where Craft
              <br />
              Meets{' '}
              <span className="relative inline-block">
                <span className="text-gradient">Excellence</span>
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute -bottom-1 left-0 right-0 h-[3px] bg-primary rounded-full origin-left"
                  aria-hidden="true"
                />
              </span>
            </h1>

            {/* Description */}
            <p className="text-body-xl text-body max-w-[500px] leading-relaxed mb-10">
              Gariwala delivers world-class automotive solutions — from precision diagnostics
              to full custom builds — crafted for those who demand the best.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-14">
              <Button as={Link} to="/services" size="lg">
                Explore Services
                <ArrowRight size={18} aria-hidden="true" />
              </Button>
              <Button as={Link} to="/contact" variant="outline" size="lg">
                Get a Quote
              </Button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap items-center gap-6 sm:gap-8 pt-10 border-t border-border" role="list" aria-label="Key statistics">
              {stats.map(({ value, label }, i) => (
                <div key={label} className="flex items-baseline gap-2" role="listitem">
                  <span className="font-heading font-black text-display-sm text-heading tabular-nums" aria-label={`${value} ${label}`}>{value}</span>
                  <span className="text-body-sm text-body">{label}</span>
                  {i < stats.length - 1 && (
                    <span className="hidden sm:block w-px h-6 bg-border ml-2" aria-hidden="true" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* ══ RIGHT COLUMN ══ */}
          <motion.div
            variants={imageReveal}
            initial="initial"
            animate="animate"
            className="relative hidden lg:flex items-center justify-center"
          >
            {/* Image frame */}
            <motion.div
              style={{ x: imgX, y: imgY }}
              className="relative w-full max-w-[560px] aspect-[4/5] rounded-[2rem] overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.14)] will-change-transform"
              role="img"
              aria-label="Gariwala premium automotive workshop"
            >
              {/* Placeholder — replace with: <img src="/hero.jpg" alt="Gariwala premium automotive workshop" loading="eager" fetchpriority="high" /> */}
              <div className="absolute inset-0 bg-gradient-to-br from-surface via-[#e8e8e8] to-[#d0d0d0]" aria-hidden="true" />
              <div className="absolute inset-0 bg-dot-pattern opacity-40" aria-hidden="true" />
              <div className="absolute inset-0 bg-gradient-to-t from-heading/20 via-transparent to-transparent" aria-hidden="true" />
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" aria-hidden="true" />

              {/* Center icon placeholder */}
              <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
                <div className="flex flex-col items-center gap-4 opacity-20">
                  <Wrench size={64} className="text-heading" />
                  <span className="font-heading font-black text-display-sm text-heading tracking-tight">
                    GARIWALA
                  </span>
                </div>
              </div>

              {/* Bottom label bar */}
              <div className="absolute bottom-0 left-0 right-0 px-6 py-5 bg-gradient-to-t from-heading/80 to-transparent">
                <p className="font-heading font-bold text-body-sm text-white/90 tracking-wide">
                  Premium Automotive Workshop
                </p>
                <p className="text-body-xs text-white/50 mt-0.5">Lahore, Pakistan</p>
              </div>

              {/* Inset ring */}
              <div className="absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/10 pointer-events-none" aria-hidden="true" />
            </motion.div>

            {/* ── Floating cards ── */}
            {floatingBadges.map(({ id, icon, title, sub, className, delay }) => (
              <FloatingCard key={id} icon={icon} title={title} sub={sub} className={className} delay={delay} />
            ))}

            {/* ── Decorative rings ── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 1 }}
              className="absolute -top-8 -right-8 w-48 h-48 rounded-full border border-primary/15 pointer-events-none hidden xl:block"
              aria-hidden="true"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full border border-border pointer-events-none hidden xl:block"
              aria-hidden="true"
            />
          </motion.div>
        </div>
      </Container>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 pointer-events-none hidden lg:flex"
        aria-hidden="true"
      >
        <span className="text-body-xs font-heading font-bold uppercase tracking-[0.2em] text-body/30">
          Scroll
        </span>
        <div className="w-5 h-8 rounded-full border-2 border-body/15 flex items-start justify-center pt-1.5">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            className="w-1 h-1.5 rounded-full bg-body/25 will-change-transform"
          />
        </div>
      </motion.div>
    </section>
  )
}

export default HeroSection
