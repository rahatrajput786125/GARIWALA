import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  CheckCircle,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Clock,
  Zap,
  MessageCircle,
} from 'lucide-react'

import Container from '@/components/Container'
import Badge     from '@/components/Badge'
import Button    from '@/components/Button'

gsap.registerPlugin(ScrollTrigger)

/* ─────────────────────────────────────────
   Static data
───────────────────────────────────────── */
const trustPoints = [
  { id: 'tp1', label: 'Fast Response — within 24 hours' },
  { id: 'tp2', label: 'Professional Certified Team' },
  { id: 'tp3', label: 'Tailored Solutions for Every Client' },
]

const contactRows = [
  {
    id: 'cr1',
    icon: Phone,
    title: 'Phone',
    value: '+92 300 000 0000',
    sub: 'Mon – Sat, 9 AM – 7 PM',
    href: 'tel:+923000000000',
  },
  {
    id: 'cr2',
    icon: Mail,
    title: 'Email',
    value: 'info@gariwala.com',
    sub: 'We reply within 24 hours',
    href: 'mailto:info@gariwala.com',
  },
  {
    id: 'cr3',
    icon: MapPin,
    title: 'Office',
    value: 'Lahore, Pakistan',
    sub: 'Main Workshop & HQ',
    href: null,
  },
  {
    id: 'cr4',
    icon: Clock,
    title: 'Working Hours',
    value: 'Mon – Sat: 9 AM – 7 PM',
    sub: 'Sunday by appointment',
    href: null,
  },
  {
    id: 'cr5',
    icon: Zap,
    title: 'Response Time',
    value: 'Under 24 Hours',
    sub: 'Guaranteed first response',
    href: null,
  },
]

/* ─────────────────────────────────────────
   ContactCard
───────────────────────────────────────── */
const ContactCard = () => (
  <motion.div
    animate={{ y: [0, -10, 0] }}
    transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', repeatType: 'mirror' }}
    className="relative rounded-[1.5rem] overflow-hidden border border-white/10 backdrop-blur-xl
               bg-white/[0.06] shadow-[0_32px_80px_rgba(0,0,0,0.45),0_4px_24px_rgba(0,0,0,0.3)]
               hover:shadow-[0_40px_100px_rgba(0,0,0,0.55),0_8px_32px_rgba(0,0,0,0.35)]
               hover:border-primary/30 transition-[border-color,box-shadow] duration-500
               will-change-transform"
    role="complementary"
    aria-label="Contact information"
  >
    {/* Top accent bar */}
    <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-primary via-primary-500 to-primary-700" aria-hidden="true" />

    {/* Inner glow */}
    <div
      className="absolute inset-0 pointer-events-none rounded-[1.5rem]"
      style={{
        background:
          'radial-gradient(ellipse 80% 40% at 50% 0%, rgba(255,193,7,0.07) 0%, transparent 60%)',
      }}
      aria-hidden="true"
    />

    {/* Header row */}
    <div className="flex items-center gap-3 px-7 pt-7 pb-5 border-b border-white/[0.08]">
      <div className="w-10 h-10 rounded-xl bg-primary/15 border border-primary/25 flex items-center justify-center shrink-0">
        <MessageCircle size={18} className="text-primary" aria-hidden="true" />
      </div>
      <div>
        <p className="font-heading font-bold text-body-md text-white leading-tight">
          Get In Touch
        </p>
        <p className="text-body-xs text-white/45 mt-0.5">
          All contact channels
        </p>
      </div>
      {/* Live indicator */}
      <div className="ml-auto flex items-center gap-1.5" aria-label="Currently available">
        <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
        </span>
        <span className="text-[10px] font-heading font-semibold text-emerald-400 uppercase tracking-wider">
          Available
        </span>
      </div>
    </div>

    {/* Contact rows */}
    <div className="px-7 py-5 flex flex-col gap-1">
      {contactRows.map(({ id, icon: Icon, title, value, sub, href }) => {
        const inner = (
          <div
            className="group/row flex items-center gap-4 rounded-2xl px-4 py-3.5
                       hover:bg-white/[0.06] transition-colors duration-300"
          >
            <div
              className="w-9 h-9 rounded-xl bg-white/[0.08] border border-white/10 flex items-center justify-center shrink-0
                         group-hover/row:bg-primary/20 group-hover/row:border-primary/30
                         transition-all duration-300"
            >
              <Icon
                size={15}
                className="text-white/50 group-hover/row:text-primary transition-colors duration-300"
                aria-hidden="true"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-heading font-bold uppercase tracking-[0.12em] text-white/35 mb-0.5">
                {title}
              </p>
              <p className="text-body-sm font-heading font-semibold text-white/85 leading-tight truncate">
                {value}
              </p>
              <p className="text-[10px] text-white/35 mt-0.5">{sub}</p>
            </div>
          </div>
        )

        return href ? (
          <a key={id} href={href} className="block" aria-label={`${title}: ${value}`}>
            {inner}
          </a>
        ) : (
          <div key={id}>{inner}</div>
        )
      })}
    </div>

    {/* Footer note */}
    <div className="mx-7 mb-7 mt-2 rounded-2xl bg-primary/10 border border-primary/20 px-5 py-3.5 flex items-center gap-3">
      <Zap size={14} className="text-primary shrink-0" aria-hidden="true" />
      <p className="text-body-xs text-white/60 leading-relaxed">
        We typically respond within{' '}
        <span className="font-heading font-bold text-primary">24 hours</span>.
        Urgent enquiries are prioritised.
      </p>
    </div>
  </motion.div>
)

/* ─────────────────────────────────────────
   ContactCtaSection
───────────────────────────────────────── */
const ContactCtaSection = () => {
  const sectionRef = useRef(null)
  const leftRef    = useRef(null)
  const rightRef   = useRef(null)
  const trustRef   = useRef(null)
  const btnsRef    = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        leftRef.current,
        { opacity: 0, x: -48 },
        {
          opacity: 1, x: 0, duration: 0.95, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 82%', once: true },
        }
      )
      gsap.fromTo(
        rightRef.current,
        { opacity: 0, x: 48 },
        {
          opacity: 1, x: 0, duration: 0.95, ease: 'power3.out', delay: 0.12,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 82%', once: true },
        }
      )
      gsap.fromTo(
        trustRef.current?.children ?? [],
        { opacity: 0, x: -24 },
        {
          opacity: 1, x: 0, duration: 0.65, ease: 'power3.out',
          stagger: 0.1, delay: 0.3,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 82%', once: true },
        }
      )
      gsap.fromTo(
        btnsRef.current,
        { opacity: 0, y: 24 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', delay: 0.55,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 82%', once: true },
        }
      )
    })
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="contact-cta"
      className="relative overflow-hidden bg-[#111111] py-section"
      aria-labelledby="contact-cta-heading"
      data-dark=""
    >

      {/* ── Background layers ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 65% 55% at 15% 50%, rgba(255,193,7,0.07) 0%, transparent 65%), ' +
            'radial-gradient(ellipse 55% 50% at 85% 40%, rgba(255,193,7,0.05) 0%, transparent 60%)',
        }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.04] pointer-events-none" aria-hidden="true" />
      <div className="absolute inset-0 bg-dot-pattern opacity-[0.06] pointer-events-none" aria-hidden="true" />
      <div className="absolute top-0 left-[8%] w-96 h-96 rounded-full bg-primary/[0.08] blur-[120px] pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-0 right-[6%] w-72 h-72 rounded-full bg-primary/[0.06] blur-[100px] pointer-events-none" aria-hidden="true" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" aria-hidden="true" />

      {/* Floating shapes */}
      <motion.div
        initial={{ opacity: 0, rotate: 0 }}
        animate={{ opacity: 1, rotate: 20 }}
        transition={{ delay: 0.8, duration: 2 }}
        className="absolute top-[12%] left-[46%] w-10 h-10 rounded-2xl bg-primary/[0.08] border border-primary/[0.12] hidden xl:block pointer-events-none"
        aria-hidden="true"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.1, duration: 0.9 }}
        className="absolute bottom-[20%] right-[44%] w-3 h-3 rounded-full bg-primary/30 hidden xl:block pointer-events-none"
        aria-hidden="true"
      />
      <motion.div
        initial={{ opacity: 0, rotate: 0 }}
        animate={{ opacity: 1, rotate: -16 }}
        transition={{ delay: 1.3, duration: 1.8 }}
        className="absolute top-[60%] left-[3%] w-7 h-7 rounded-xl bg-white/[0.04] border border-white/[0.08] hidden xl:block pointer-events-none"
        aria-hidden="true"
      />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_480px] gap-12 lg:gap-16 items-center">

          {/* ══ Left — Content ══ */}
          <div ref={leftRef}>

            <div className="mb-6">
              <Badge variant="primary" className="bg-primary/15 text-primary border-primary/25">
                Let&rsquo;s Work Together
              </Badge>
            </div>

            <h2
              id="contact-cta-heading"
              className="font-heading font-black text-display-lg text-white leading-[1.08] tracking-tight mb-6"
            >
              Ready to Build Your{' '}
              <span className="text-gradient">Next Project?</span>
            </h2>

            <p className="text-body-lg text-white/55 leading-relaxed mb-10 max-w-lg">
              Whether you need a full custom build, fleet maintenance, or a specialist
              consultation — our certified team is ready to deliver a solution engineered
              precisely to your requirements.
            </p>

            {/* Trust points */}
            <ul
              ref={trustRef}
              className="flex flex-col gap-4 mb-10"
              aria-label="Key benefits"
            >
              {trustPoints.map(({ id, label }) => (
                <li key={id} className="flex items-center gap-3.5">
                  <div className="w-6 h-6 rounded-full bg-primary/15 border border-primary/25 flex items-center justify-center shrink-0">
                    <CheckCircle size={13} className="text-primary" aria-hidden="true" />
                  </div>
                  <span className="text-body-md text-white/70 font-heading font-medium">
                    {label}
                  </span>
                </li>
              ))}
            </ul>

            {/* Buttons */}
            <div ref={btnsRef} className="flex flex-col sm:flex-row gap-4">
              <Button
                as={Link}
                to="/contact"
                size="lg"
                className="group/primary"
                aria-label="Request a quote"
              >
                Request a Quote
                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover/primary:translate-x-1.5"
                  aria-hidden="true"
                />
              </Button>

              <Button
                as={Link}
                to="/contact"
                size="lg"
                variant="outline"
                className="border-white/20 text-white hover:bg-white hover:text-heading hover:border-white"
                aria-label="Contact us"
              >
                <MessageCircle size={17} aria-hidden="true" />
                Contact Us
              </Button>
            </div>
          </div>

          {/* ══ Right — Contact card ══ */}
          <div ref={rightRef}>
            <ContactCard />
          </div>

        </div>
      </Container>
    </section>
  )
}

export default ContactCtaSection
