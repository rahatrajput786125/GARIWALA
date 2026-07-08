import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { FolderCheck, Smile, Users, CalendarCheck } from 'lucide-react'
import Section   from '@/components/Section'
import Container from '@/components/Container'
import Heading   from '@/components/Heading'
import Badge     from '@/components/Badge'
import { useCountUp } from '@/hooks/useCountUp'

/* ─────────────────────────────────────────
   Static data
───────────────────────────────────────── */
const stats = [
  {
    icon: FolderCheck,
    value: 500,
    suffix: '+',
    label: 'Projects Completed',
    description: 'Across diagnostics, builds, paint, and performance',
  },
  {
    icon: Smile,
    value: 480,
    suffix: '+',
    label: 'Happy Clients',
    description: 'Verified reviews with a 98% satisfaction rate',
  },
  {
    icon: Users,
    value: 50,
    suffix: '+',
    label: 'Expert Team',
    description: 'Certified master technicians and specialists',
  },
  {
    icon: CalendarCheck,
    value: 15,
    suffix: '+',
    label: 'Years Experience',
    description: 'Serving the region since 2009 with pride',
  },
]

/* ─────────────────────────────────────────
   StatCard
───────────────────────────────────────── */
const StatCard = ({ icon: Icon, value, suffix, label, description, index, started }) => {
  const count = useCountUp(value, 1800 + index * 120, started)

  return (
    <motion.div
      initial={{ opacity: 0, y: 52, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
      whileHover={{ y: -8, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } }}
      className={[
        'group relative overflow-hidden flex flex-col gap-5 p-8',
        'bg-white rounded-[1.25rem]',
        'shadow-card',
        'border border-border hover:border-primary/30',
        'transition-[border-color,box-shadow,transform] duration-500',
        'hover:shadow-card-hover',
        'will-change-transform',
      ].join(' ')}
    >
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary via-primary-500 to-primary-700 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" aria-hidden="true" />

      {/* Background gradient on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" aria-hidden="true" />

      {/* Icon */}
      <div className="relative w-[3.25rem] h-[3.25rem] rounded-2xl bg-primary/10 flex items-center justify-center self-start group-hover:bg-primary group-hover:shadow-primary transition-all duration-400 overflow-hidden shrink-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-300/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
        <Icon
          size={22}
          className="relative z-10 text-primary group-hover:text-heading group-hover:rotate-[-10deg] transition-all duration-400"
          aria-hidden="true"
        />
      </div>

      {/* Counter */}
      <div>
        <div
          className="flex items-baseline gap-0.5 mb-1"
          aria-live="polite"
          aria-label={`${count}${suffix} ${label}`}
        >
          <span className="font-heading font-black text-display-md text-heading leading-none tabular-nums">
            {count}
          </span>
          <span className="font-heading font-black text-display-sm text-primary leading-none">
            {suffix}
          </span>
        </div>
        <p className="font-heading font-bold text-body-md text-heading">{label}</p>
      </div>

      {/* Description */}
      <p className="text-body-sm text-body leading-relaxed border-t border-border pt-4 flex-1">
        {description}
      </p>

      {/* Animated bottom underline */}
      <div className="h-px bg-gradient-to-r from-primary/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" aria-hidden="true" />
    </motion.div>
  )
}

/* ─────────────────────────────────────────
   StatsSection
───────────────────────────────────────── */
const StatsSection = () => {
  const [started, setStarted] = useState(false)
  const triggerRef = useRef(null)

  useEffect(() => {
    const el = triggerRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setStarted(true); observer.disconnect() }
      },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <Section surface id="stats" className="relative overflow-hidden" aria-labelledby="stats-heading">

      {/* ── Background decorations ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 55% at 50% 50%, rgba(255,193,7,0.06) 0%, transparent 65%)',
        }}
        aria-hidden="true"
      />
      <div className="absolute top-8 left-[8%] w-56 h-56 rounded-full bg-primary/[0.08] blur-[72px] pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-8 right-[8%] w-44 h-44 rounded-full bg-primary/[0.06] blur-[60px] pointer-events-none" aria-hidden="true" />
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none" aria-hidden="true" />

      <Container className="relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center mb-14 lg:mb-16"
        >
          <Badge className="mb-5">By The Numbers</Badge>
          <Heading as="h2" id="stats-heading" center className="mb-4">
            Results That
            <br />
            <span className="text-gradient">Speak for Themselves</span>
          </Heading>
          <p className="text-body-lg text-body max-w-xl leading-relaxed">
            Over a decade of delivering premium automotive services — the numbers reflect
            our commitment to excellence.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div
          ref={triggerRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6"
        >
          {stats.map((stat, i) => (
            <StatCard key={stat.label} {...stat} index={i} started={started} />
          ))}
        </div>

      </Container>
    </Section>
  )
}

export default StatsSection
