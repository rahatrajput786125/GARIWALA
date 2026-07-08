import { useState, useCallback } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Menu, X, ArrowRight, Zap, Phone } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { NAV_LINKS, SITE_NAME, CONTACT_INFO } from '@/constants'
import { useScrolled } from '@/hooks/useScrolled'
import { cn } from '@/utils/helpers'
import Button from '@/components/Button'
import Container from '@/components/Container'

/* ── animation variants ── */
const drawerVariants = {
  initial: { opacity: 0, x: '100%' },
  animate: { opacity: 1, x: 0, transition: { duration: 0.42, ease: [0.16, 1, 0.3, 1] } },
  exit:    { opacity: 0, x: '100%', transition: { duration: 0.32, ease: [0.4, 0, 1, 1] } },
}

const itemVariants = {
  initial: { opacity: 0, x: 20 },
  animate: (i) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.06 + i * 0.055, duration: 0.38, ease: [0.16, 1, 0.3, 1] },
  }),
}

const overlayVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.25 } },
  exit:    { opacity: 0, transition: { duration: 0.25 } },
}

const Navbar = () => {
  const [open, setOpen] = useState(false)
  const scrolled = useScrolled(40)
  const close = useCallback(() => setOpen(false), [])

  return (
    <>
      {/* Skip to main content — keyboard accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-heading focus:font-heading focus:font-bold focus:rounded-xl focus:shadow-primary"
      >
        Skip to main content
      </a>

      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-smooth',
          scrolled
            ? 'bg-white/[0.97] backdrop-blur-2xl border-b border-border/60 shadow-[0_1px_20px_rgba(0,0,0,0.06)] h-[72px]'
            : 'bg-transparent h-24'
        )}
        role="banner"
      >
        <Container className="h-full">
          <nav className="flex items-center justify-between h-full" aria-label="Main navigation">

            {/* ── Logo ── */}
            <Link to="/" className="flex items-center gap-3 group shrink-0" aria-label={`${SITE_NAME} — Home`}>
              <span className="relative w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-primary transition-all duration-300 group-hover:scale-105 group-hover:shadow-primary-lg overflow-hidden">
                <span className="absolute inset-0 bg-gradient-to-br from-primary-300 to-primary-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Zap size={17} className="relative z-10 text-heading fill-heading" aria-hidden="true" />
              </span>
              <span className="font-heading font-black text-xl text-heading tracking-tight">
                {SITE_NAME}
              </span>
            </Link>

            {/* ── Desktop nav links ── */}
            <ul className="hidden lg:flex items-center gap-0.5" role="list">
              {NAV_LINKS.map(({ label, path }) => (
                <li key={path}>
                  <NavLink
                    to={path}
                    end={path === '/'}
                    className={({ isActive }) =>
                      cn(
                        'relative px-4 py-2.5 rounded-xl text-body-sm font-heading font-semibold tracking-[0.01em] transition-all duration-200 ease-smooth',
                        isActive
                          ? 'text-heading bg-primary/10'
                          : 'text-body hover:text-heading hover:bg-surface'
                      )
                    }
                    aria-current={undefined}
                  >
                    {({ isActive }) => (
                      <>
                        {label}
                        {isActive && (
                          <motion.span
                            layoutId="nav-indicator"
                            className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary"
                            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                            aria-hidden="true"
                          />
                        )}
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>

            {/* ── Desktop actions ── */}
            <div className="hidden lg:flex items-center gap-2">
              {/* Phone */}
              <a
                href={`tel:${CONTACT_INFO.phone}`}
                className="hidden xl:flex items-center gap-2 px-4 py-2.5 rounded-xl text-body-sm font-heading font-semibold text-body hover:text-heading hover:bg-surface transition-all duration-200"
                aria-label={`Call us: ${CONTACT_INFO.phone}`}
              >
                <Phone size={14} className="text-primary" aria-hidden="true" />
                {CONTACT_INFO.phone}
              </a>

              {/* Divider */}
              <span className="w-px h-5 bg-border mx-1 hidden xl:block" aria-hidden="true" />

              {/* CTA */}
              <Button as={Link} to="/contact" size="sm">
                Get a Quote
                <ArrowRight size={14} aria-hidden="true" />
              </Button>
            </div>

            {/* ── Mobile toggle ── */}
            <button
              type="button"
              className="lg:hidden w-10 h-10 rounded-xl flex items-center justify-center text-heading hover:bg-surface transition-colors duration-200"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="mobile-drawer"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={open ? 'close' : 'open'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  {open ? <X size={21} aria-hidden="true" /> : <Menu size={21} aria-hidden="true" />}
                </motion.span>
              </AnimatePresence>
            </button>
          </nav>
        </Container>
      </header>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              variants={overlayVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="fixed inset-0 z-40 bg-heading/40 backdrop-blur-sm lg:hidden"
              onClick={close}
              aria-hidden="true"
            />

            {/* Drawer panel */}
            <motion.div
              id="mobile-drawer"
              key="drawer"
              variants={drawerVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="fixed top-0 right-0 bottom-0 z-50 w-[min(360px,100vw)] bg-white flex flex-col lg:hidden shadow-[-8px_0_48px_rgba(0,0,0,0.12)] overflow-hidden"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-6 h-20 border-b border-border shrink-0">
                <Link to="/" className="flex items-center gap-3" onClick={close} aria-label={`${SITE_NAME} — Home`}>
                  <span className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shadow-primary">
                    <Zap size={15} className="text-heading fill-heading" aria-hidden="true" />
                  </span>
                  <span className="font-heading font-black text-lg text-heading">{SITE_NAME}</span>
                </Link>
                <button
                  type="button"
                  onClick={close}
                  aria-label="Close menu"
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-body hover:text-heading hover:bg-surface transition-colors"
                >
                  <X size={20} aria-hidden="true" />
                </button>
              </div>

              {/* Nav links */}
              <nav className="flex-1 overflow-y-auto px-4 py-6" aria-label="Mobile navigation">
                <ul className="flex flex-col gap-1" role="list">
                  {NAV_LINKS.map(({ label, path }, i) => (
                    <motion.li key={path} custom={i} variants={itemVariants} initial="initial" animate="animate">
                      <NavLink
                        to={path}
                        end={path === '/'}
                        onClick={close}
                        className={({ isActive }) =>
                          cn(
                            'flex items-center justify-between px-4 py-3.5 rounded-2xl text-body-md font-heading font-semibold transition-all duration-200',
                            isActive
                              ? 'text-heading bg-primary/10'
                              : 'text-body hover:text-heading hover:bg-surface'
                          )
                        }
                      >
                        {({ isActive }) => (
                          <>
                            <span>{label}</span>
                            {isActive && (
                              <span className="w-1.5 h-1.5 rounded-full bg-primary" aria-hidden="true" />
                            )}
                          </>
                        )}
                      </NavLink>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              {/* Drawer footer */}
              <div className="px-4 pb-8 pt-4 border-t border-border shrink-0 flex flex-col gap-3">
                <a
                  href={`tel:${CONTACT_INFO.phone}`}
                  className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-surface text-body-sm font-heading font-semibold text-body hover:text-heading transition-colors"
                  aria-label={`Call us: ${CONTACT_INFO.phone}`}
                >
                  <span className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Phone size={14} className="text-primary" aria-hidden="true" />
                  </span>
                  {CONTACT_INFO.phone}
                </a>
                <Button as={Link} to="/contact" fullWidth onClick={close}>
                  Get a Quote
                  <ArrowRight size={16} aria-hidden="true" />
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
