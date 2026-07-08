import { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Zap,
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  ArrowUp,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  Twitter,
  CheckCircle,
  MessageSquare,
} from 'lucide-react'

import Container from '@/components/Container'
import Input     from '@/components/Input'
import Button    from '@/components/Button'
import { NAV_LINKS, SITE_NAME, CONTACT_INFO } from '@/constants'

gsap.registerPlugin(ScrollTrigger)

/* ─────────────────────────────────────────
   Static data
───────────────────────────────────────── */
const socials = [
  { icon: Facebook,  href: '#', label: 'Facebook'  },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Linkedin,  href: '#', label: 'LinkedIn'  },
  { icon: Youtube,   href: '#', label: 'YouTube'   },
  { icon: Twitter,   href: '#', label: 'X (Twitter)' },
]

const services = [
  { label: 'Industrial Solutions',  path: '/services' },
  { label: 'Engineering Services',  path: '/services' },
  { label: 'Equipment Support',     path: '/services' },
  { label: 'Fleet Maintenance',     path: '/services' },
  { label: 'Expert Consultation',   path: '/services' },
]

const contactRows = [
  { icon: Phone,  title: 'Phone',   value: CONTACT_INFO.phone,   href: `tel:${CONTACT_INFO.phone}` },
  { icon: Mail,   title: 'Email',   value: CONTACT_INFO.email,   href: `mailto:${CONTACT_INFO.email}` },
  { icon: MapPin, title: 'Address', value: CONTACT_INFO.address, href: '#' },
  { icon: Clock,  title: 'Hours',   value: 'Mon – Sat, 9 AM – 7 PM', href: null },
]

const legalLinks = [
  { label: 'Privacy Policy',     path: '#' },
  { label: 'Terms & Conditions', path: '#' },
  { label: 'Cookies',            path: '#' },
]

/* ─────────────────────────────────────────
   SocialIcon
───────────────────────────────────────── */
const SocialIcon = ({ icon: Icon, href, label }) => (
  <motion.a
    href={href}
    aria-label={label}
    whileHover={{ scale: 1.1, y: -2 }}
    whileTap={{ scale: 0.95 }}
    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
    className="w-9 h-9 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-white/40 hover:text-heading hover:bg-primary hover:border-primary hover:shadow-primary transition-[background,border-color,box-shadow,color] duration-300 will-change-transform"
  >
    <Icon size={15} aria-hidden="true" />
  </motion.a>
)

/* ─────────────────────────────────────────
   FooterLink
───────────────────────────────────────── */
const FooterLink = ({ to, children }) => (
  <li>
    <Link
      to={to}
      className="group flex items-center gap-2 text-body-sm text-white/45 hover:text-primary transition-colors duration-250 w-fit"
    >
      <ArrowRight
        size={11}
        className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-primary shrink-0"
        aria-hidden="true"
      />
      <span className="relative">
        {children}
        <span className="absolute bottom-0 left-0 h-px w-0 bg-primary group-hover:w-full transition-all duration-300 rounded-full" />
      </span>
    </Link>
  </li>
)

/* ─────────────────────────────────────────
   ContactRow
───────────────────────────────────────── */
const ContactRow = ({ icon: Icon, title, value, href }) => {
  const inner = (
    <div className="group flex items-start gap-3.5 py-2 rounded-xl hover:bg-white/[0.04] px-2 -mx-2 transition-colors duration-250 cursor-default">
      <div className="w-8 h-8 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-primary/20 group-hover:border-primary/30 transition-all duration-300">
        <Icon size={13} className="text-white/40 group-hover:text-primary transition-colors duration-300" aria-hidden="true" />
      </div>
      <div>
        <p className="text-[10px] font-heading font-bold uppercase tracking-[0.12em] text-white/25 mb-0.5">{title}</p>
        <p className="text-body-sm text-white/60 leading-snug">{value}</p>
      </div>
    </div>
  )

  return href
    ? <a href={href} className="block" aria-label={`${title}: ${value}`}>{inner}</a>
    : <div>{inner}</div>
}

/* ─────────────────────────────────────────
   NewsletterCard
───────────────────────────────────────── */
const NewsletterCard = () => {
  const [email, setEmail]     = useState('')
  const [error, setError]     = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const validate = (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)

  const handleSubmit = useCallback((e) => {
    e.preventDefault()
    if (!email.trim()) { setError('Email is required.'); return }
    if (!validate(email)) { setError('Please enter a valid email address.'); return }
    setError('')
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSuccess(true)
      setEmail('')
    }, 900)
  }, [email])

  return (
    <div className="relative rounded-[1.25rem] bg-white/[0.04] border border-white/[0.08] p-6 overflow-hidden">
      {/* Top accent */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary via-primary-500 to-primary-700" />
      {/* Inner glow */}
      <div
        className="absolute inset-0 pointer-events-none rounded-[1.25rem]"
        style={{ background: 'radial-gradient(ellipse 80% 40% at 50% 0%, rgba(255,193,7,0.06) 0%, transparent 60%)' }}
      />

      <div className="relative z-10">
        <div className="w-9 h-9 rounded-xl bg-primary/15 border border-primary/25 flex items-center justify-center mb-4">
          <MessageSquare size={15} className="text-primary" aria-hidden="true" />
        </div>

        <h3 className="font-heading font-bold text-body-lg text-white mb-1.5">
          Stay Updated
        </h3>
        <p className="text-body-xs text-white/40 leading-relaxed mb-5">
          Get the latest news, project showcases and industry insights delivered to your inbox.
        </p>

        <AnimatePresence mode="wait">
          {success ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 px-4 py-3.5"
              role="status"
              aria-live="polite"
            >
              <CheckCircle size={16} className="text-emerald-400 shrink-0" aria-hidden="true" />
              <p className="text-body-sm text-emerald-300 font-heading font-medium">
                You&rsquo;re subscribed. Thank you!
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              noValidate
              className="flex flex-col gap-3"
              aria-label="Newsletter subscription form"
            >
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => { setEmail(e.target.value); if (error) setError('') }}
                error={error}
                aria-label="Email address"
                className="bg-white/[0.06] border-white/[0.10] text-white placeholder:text-white/25 focus:border-primary focus:ring-primary/20 hover:border-white/20"
              />
              <Button
                type="submit"
                size="sm"
                loading={loading}
                fullWidth
                className="group/sub justify-center"
                aria-label="Subscribe to newsletter"
              >
                Subscribe
                <ArrowRight
                  size={14}
                  className="transition-transform duration-300 group-hover/sub:translate-x-1"
                  aria-hidden="true"
                />
              </Button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────
   BackToTop
───────────────────────────────────────── */
const BackToTop = () => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.7, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 16 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ scale: 1.1, y: -3 }}
          whileTap={{ scale: 0.93 }}
          onClick={scrollTop}
          aria-label="Back to top"
          className="fixed bottom-7 right-7 z-50 w-11 h-11 rounded-full bg-primary shadow-primary hover:shadow-primary-lg flex items-center justify-center text-heading transition-[box-shadow] duration-300 will-change-transform"
        >
          <ArrowUp size={17} aria-hidden="true" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}

/* ─────────────────────────────────────────
   ColHeading
───────────────────────────────────────── */
const ColHeading = ({ children }) => (
  <p className="text-body-xs font-heading font-bold uppercase tracking-[0.16em] text-white/30 mb-6">
    {children}
  </p>
)

/* ─────────────────────────────────────────
   Footer
───────────────────────────────────────── */
const Footer = () => {
  const year      = new Date().getFullYear()
  const colsRef   = useRef(null)
  const bottomRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cols = colsRef.current?.children
      if (cols?.length) {
        gsap.fromTo(
          cols,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.85, ease: 'power3.out', stagger: 0.1,
            scrollTrigger: { trigger: colsRef.current, start: 'top 88%', once: true },
          }
        )
      }
      gsap.fromTo(
        bottomRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', delay: 0.4,
          scrollTrigger: { trigger: bottomRef.current, start: 'top 95%', once: true },
        }
      )
    })
    return () => ctx.revert()
  }, [])

  return (
    <>
      <footer
        className="relative bg-[#111111] text-white overflow-hidden"
        aria-label="Site footer"
        data-dark=""
      >
        {/* ── Background layers ── */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 60% 50% at 10% 60%, rgba(255,193,7,0.055) 0%, transparent 60%), ' +
              'radial-gradient(ellipse 50% 45% at 88% 30%, rgba(255,193,7,0.04) 0%, transparent 58%)',
          }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.04] pointer-events-none" aria-hidden="true" />
        <div className="absolute top-0 left-[12%] w-80 h-80 rounded-full bg-primary/[0.06] blur-[110px] pointer-events-none" aria-hidden="true" />
        <div className="absolute bottom-0 right-[8%] w-64 h-64 rounded-full bg-primary/[0.05] blur-[90px] pointer-events-none" aria-hidden="true" />

        {/* Floating geometric accents */}
        <motion.div
          initial={{ opacity: 0, rotate: 0 }}
          animate={{ opacity: 1, rotate: 18 }}
          transition={{ delay: 0.6, duration: 2 }}
          className="absolute top-[10%] left-[48%] w-9 h-9 rounded-2xl bg-primary/[0.07] border border-primary/[0.10] hidden xl:block pointer-events-none"
          aria-hidden="true"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.9 }}
          className="absolute bottom-[30%] right-[47%] w-2.5 h-2.5 rounded-full bg-primary/25 hidden xl:block pointer-events-none"
          aria-hidden="true"
        />

        {/* Top accent line */}
        <div className="h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" aria-hidden="true" />

        {/* ── Main grid ── */}
        <Container className="relative z-10">
          <div
            ref={colsRef}
            className="py-16 lg:py-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 xl:gap-10"
          >
            {/* ── Col 1 — Company ── */}
            <div className="sm:col-span-2 lg:col-span-1">
              <Link
                to="/"
                className="flex items-center gap-3 mb-5 group w-fit"
                aria-label={`${SITE_NAME} home`}
              >
                <span className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shadow-primary transition-all duration-300 group-hover:scale-105 group-hover:shadow-primary-lg">
                  <Zap size={16} className="text-heading fill-heading" aria-hidden="true" />
                </span>
                <span className="font-heading font-black text-xl text-white tracking-tight">
                  {SITE_NAME}
                </span>
              </Link>

              <p className="text-body-sm text-white/40 leading-relaxed mb-7 max-w-[220px]">
                Premium automotive services delivered with precision, passion, and unmatched expertise across Pakistan.
              </p>

              {/* Social icons */}
              <div className="flex items-center flex-wrap gap-2" role="list" aria-label="Social media links">
                {socials.map((s) => (
                  <div key={s.label} role="listitem">
                    <SocialIcon {...s} />
                  </div>
                ))}
              </div>
            </div>

            {/* ── Col 2 — Quick Links ── */}
            <div>
              <ColHeading>Quick Links</ColHeading>
              <ul className="flex flex-col gap-3" aria-label="Quick navigation links">
                {NAV_LINKS.map(({ label, path }) => (
                  <FooterLink key={path} to={path}>{label}</FooterLink>
                ))}
              </ul>
            </div>

            {/* ── Col 3 — Services ── */}
            <div>
              <ColHeading>Services</ColHeading>
              <ul className="flex flex-col gap-3" aria-label="Service links">
                {services.map(({ label, path }) => (
                  <FooterLink key={label} to={path}>{label}</FooterLink>
                ))}
              </ul>
            </div>

            {/* ── Col 4 — Contact ── */}
            <div>
              <ColHeading>Contact</ColHeading>
              <div className="flex flex-col gap-0.5">
                {contactRows.map(({ icon, title, value, href }) => (
                  <ContactRow key={title} icon={icon} title={title} value={value} href={href} />
                ))}
              </div>
            </div>

            {/* ── Col 5 — Newsletter ── */}
            <div>
              <ColHeading>Newsletter</ColHeading>
              <NewsletterCard />
            </div>
          </div>
        </Container>

        {/* ── Bottom bar ── */}
        <div className="border-t border-white/[0.06]" ref={bottomRef}>
          <Container className="relative z-10">
            <div className="py-5 flex flex-col md:flex-row items-center justify-between gap-4">

              {/* Left — copyright */}
              <p className="text-body-xs text-white/25 order-3 md:order-1">
                &copy; {year}{' '}
                <span className="text-white/40 font-heading font-semibold">{SITE_NAME}</span>
                . All rights reserved.
              </p>

              {/* Center — legal links */}
              <nav aria-label="Legal links" className="order-1 md:order-2">
                <ul className="flex items-center gap-1">
                  {legalLinks.map(({ label, path }, i) => (
                    <li key={label} className="flex items-center gap-1">
                      {i > 0 && (
                        <span className="w-px h-3 bg-white/15 mx-1" aria-hidden="true" />
                      )}
                      <Link
                        to={path}
                        className="text-body-xs text-white/30 hover:text-primary transition-colors duration-200"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Right — tagline */}
              <p className="text-body-xs text-white/20 order-2 md:order-3 flex items-center gap-1.5">
                Designed with
                <span className="text-primary font-heading font-bold">SOLVEVARE</span>
              </p>

            </div>
          </Container>
        </div>

      </footer>

      {/* Back to top — floats over everything */}
      <BackToTop />
    </>
  )
}

export default Footer
