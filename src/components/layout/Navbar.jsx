import { useState, useCallback, useRef, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Menu, X, ChevronDown, Search, Phone, Mail, Truck } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { NAV_LINKS, SITE_NAME, CONTACT_INFO } from '@/constants'
import { cn } from '@/utils/helpers'
import { useNavScroll } from '@/hooks/useNavScroll'

const BrandLogo = ({ name, sub }) => (
  <div className="flex flex-col items-center justify-center px-4 py-1 border-r border-border last:border-r-0 cursor-pointer group">
    <span className="font-heading font-black text-heading text-sm tracking-tight group-hover:text-primary transition-colors duration-200 leading-none">
      {name}
    </span>
    {sub && (
      <span className="font-sans text-body text-[10px] tracking-widest uppercase mt-0.5 group-hover:text-primary/70 transition-colors duration-200">
        {sub}
      </span>
    )}
  </div>
)

const SocialBtn = ({ href, label, children }) => (
  <a
    href={href}
    aria-label={label}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center justify-center transition-opacity duration-200 hover:opacity-80"
  >
    {children}
  </a>
)

const topLinks = [
  { label: 'Home',           path: '/' },
  { label: 'Online Booking', path: '/contact' },
  { label: 'Feedback',       path: '/contact' },
  { label: 'Careers',        path: '/about' },
  { label: 'Sitemap',        path: '/' },
  { label: 'Contact Us',     path: '/contact' },
  { label: 'Webmail',        path: '#' },
]

const mainNav = [
  { label: 'About Us',         path: '/about',   },
  { label: 'Products',         path: '/projects', },
  { label: 'Gallery', path: '/gallery',     },
  { label: 'Services',      path: '/services', },
  { label: 'Dealers',          path: '/contact',   },
]

const drawerVariants = {
  initial: { opacity: 0, x: '100%' },
  animate: { opacity: 1, x: 0, transition: { duration: 0.38, ease: [0.16, 1, 0.3, 1] } },
  exit:    { opacity: 0, x: '100%', transition: { duration: 0.28, ease: [0.4, 0, 1, 1] } },
}
const overlayVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.22 } },
  exit:    { opacity: 0, transition: { duration: 0.22 } },
}
const itemVariants = {
  initial: { opacity: 0, x: 18 },
  animate: (i) => ({
    opacity: 1, x: 0,
    transition: { delay: 0.05 + i * 0.05, duration: 0.34, ease: [0.16, 1, 0.3, 1] },
  }),
}

const Navbar = () => {
  const [open, setOpen]             = useState(false)
  const [search, setSearch]         = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const searchRef                   = useRef(null)
  const close                       = useCallback(() => setOpen(false), [])
  const navState                    = useNavScroll(80)

  useEffect(() => {
    if (!searchOpen) return
    const handler = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) setSearchOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [searchOpen])

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-heading focus:font-heading focus:font-bold focus:rounded-xl"
      >
        Skip to main content
      </a>

      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 shadow-[0_2px_16px_rgba(0,0,0,0.10)]',
          'transition-transform duration-300 ease-in-out',
          navState === 'hidden' ? '-translate-y-full' : 'translate-y-0'
        )}
        role="banner"
      >

        {/* ── TOP UTILITY BAR — yellow background ── */}
        <div className="bg-[#F4B400] border-b border-[#d9a200]">
          <div className="max-w-[1400px] mx-auto px-4 lg:px-8 flex items-center justify-between h-10">


            {/* Center — social icons */}
            <div className="flex items-center gap-1.5">
              <SocialBtn href="#" label="Facebook">
                <span className="w-6 h-6 rounded-full bg-[#1877F2] flex items-center justify-center text-white text-[10px] font-black">f</span>
              </SocialBtn>
              <SocialBtn href="#" label="Twitter">
                <span className="w-6 h-6 rounded-full bg-[#1DA1F2] flex items-center justify-center text-white text-[10px] font-black">𝕏</span>
              </SocialBtn>
              <SocialBtn href="#" label="YouTube">
                <span className="w-6 h-6 rounded-full bg-[#FF0000] flex items-center justify-center text-white text-[10px] font-black">▶</span>
              </SocialBtn>
              <SocialBtn href="#" label="LinkedIn">
                <span className="w-6 h-6 rounded-full bg-[#0A66C2] flex items-center justify-center text-white text-[10px] font-black">in</span>
              </SocialBtn>
              <SocialBtn href="#" label="Instagram">
                <span className="w-6 h-6 rounded-full bg-gradient-to-br from-[#f09433] via-[#dc2743] to-[#bc1888] flex items-center justify-center text-white text-[10px] font-black">◎</span>
              </SocialBtn>
            </div>

            {/* Right — secondary links + search */}
            <div className="hidden md:flex items-center">
              <nav aria-label="Secondary navigation">
                <ul className="flex items-center">
                  {topLinks.map(({ label, path }, i) => (
                    <li key={label} className="flex items-center">
                      {i > 0 && <span className="text-[#111]/25 mx-1 text-xs select-none">|</span>}
                      <Link
                        to={path}
                        className="text-[11px] font-heading font-semibold text-[#111] hover:text-[#111]/60 transition-colors duration-150 px-1 whitespace-nowrap"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Search — white border on yellow bg */}
              <div ref={searchRef} className="ml-4 flex items-center">
                <div className="flex items-center border-2 border-white rounded-sm overflow-hidden h-7 bg-white">
                  <input
                    type="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search"
                    aria-label="Search"
                    className="w-32 px-2.5 text-[11px] font-sans text-heading placeholder:text-body/60 outline-none bg-white h-full"
                  />
                  <button
                    aria-label="Submit search"
                    className="w-7 h-full bg-white border-l border-border flex items-center justify-center text-heading hover:bg-surface transition-colors"
                  >
                    <Search size={12} aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── MAIN NAV BAR — white background ── */}
        <div className="bg-white border-b border-border">
          <div className="max-w-[1400px] mx-auto px-4 lg:px-8 flex items-center justify-between h-[72px]">

            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-3 shrink-0 group"
              aria-label={`${SITE_NAME} — Home`}
            >
              <div className="w-12 h-12 rounded-xl bg-primary group-hover:bg-primary-500 flex items-center justify-center transition-colors duration-300 shrink-0 shadow-primary">
                <Truck size={24} className="text-heading" strokeWidth={2.2} aria-hidden="true" />
              </div>
              <div className="leading-none">
                <p className="font-heading font-black text-heading text-lg tracking-tight uppercase leading-tight group-hover:text-primary transition-colors duration-300">
                  {SITE_NAME}
                </p>
                <p className="font-sans text-body text-[10px] tracking-[0.18em] uppercase mt-0.5">
                  Automobiles
                </p>
              </div>
            </Link>

            {/* Brand partner logos — desktop */}
            <div className="hidden xl:flex items-center border border-border rounded-sm mx-6 shrink-0">
              <BrandLogo name="JAC" sub="MOTORS" />
              <BrandLogo name="DONGFENG" sub="Trucks" />
              <BrandLogo name="RENAULT" sub="TRUCKS" />
            </div>

            {/* Main nav — desktop */}
            <nav className="hidden lg:block flex-1" aria-label="Main navigation">
              <ul className="flex items-center justify-end" role="list">
                {mainNav.map(({ label, path, dropdown }) => (
                  <li key={label} className="relative group">
                    <NavLink
                      to={path}
                      end={path === '/'}
                      className={({ isActive }) =>
                        cn(
                          'flex items-center gap-1 px-4 py-2 font-heading font-semibold text-[13px] tracking-[0.01em] transition-colors duration-200 whitespace-nowrap',
                          isActive ? 'text-primary' : 'text-heading hover:text-primary'
                        )
                      }
                    >
                      {label}
                      {dropdown && (
                        <ChevronDown
                          size={12}
                          className="text-body group-hover:text-primary transition-colors duration-200 mt-0.5"
                          aria-hidden="true"
                        />
                      )}
                    </NavLink>
                    {/* Yellow hover underline */}
                    <span className="absolute bottom-0 left-4 right-4 h-[2.5px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full" />
                  </li>
                ))}

                {/* Hamburger */}
                <li className="ml-2">
                  <button
                    type="button"
                    onClick={() => setOpen(true)}
                    aria-label="Open full menu"
                    className="w-9 h-9 flex flex-col items-center justify-center gap-[5px] hover:bg-primary/10 rounded transition-colors duration-200"
                  >
                    <span className="w-5 h-[2px] bg-heading rounded-full" />
                    <span className="w-5 h-[2px] bg-heading rounded-full" />
                    <span className="w-5 h-[2px] bg-heading rounded-full" />
                  </button>
                </li>
              </ul>
            </nav>

            {/* Mobile: search + hamburger */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                aria-label="Search"
                onClick={() => setSearchOpen((v) => !v)}
                className="w-9 h-9 rounded flex items-center justify-center text-body hover:text-heading hover:bg-surface transition-colors"
              >
                <Search size={18} aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => setOpen(true)}
                aria-label="Open menu"
                aria-expanded={open}
                aria-controls="mobile-drawer"
                className="w-9 h-9 rounded flex items-center justify-center text-heading hover:bg-surface transition-colors"
              >
                <Menu size={20} aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Mobile search bar */}
          <AnimatePresence>
            {searchOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="lg:hidden overflow-hidden border-t border-border"
              >
                <div className="px-4 py-3 flex items-center gap-2">
                  <input
                    autoFocus
                    type="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search..."
                    className="flex-1 h-9 px-3 rounded border border-border text-sm outline-none focus:border-primary transition-colors"
                  />
                  <button
                    aria-label="Submit search"
                    className="w-9 h-9 rounded bg-primary flex items-center justify-center text-heading"
                  >
                    <Search size={14} aria-hidden="true" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* ── MOBILE DRAWER ── */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="backdrop"
              variants={overlayVariants}
              initial="initial" animate="animate" exit="exit"
              className="fixed inset-0 z-40 bg-heading/40 backdrop-blur-sm"
              onClick={close}
              aria-hidden="true"
            />

            <motion.div
              id="mobile-drawer"
              key="drawer"
              variants={drawerVariants}
              initial="initial" animate="animate" exit="exit"
              className="fixed top-0 right-0 bottom-0 z-50 w-[min(340px,100vw)] bg-white flex flex-col shadow-[-8px_0_48px_rgba(0,0,0,0.14)] overflow-hidden"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
            >
              {/* Drawer header — yellow accent top bar */}
              <div className="h-1.5 bg-primary w-full shrink-0" />
              <div className="flex items-center justify-between px-5 h-[68px] border-b border-border shrink-0">
                <Link to="/" className="flex items-center gap-2.5" onClick={close}>
                  <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shadow-primary shrink-0">
                    <Truck size={18} className="text-heading" strokeWidth={2.2} aria-hidden="true" />
                  </div>
                  <span className="font-heading font-black text-heading text-base uppercase tracking-tight">
                    {SITE_NAME}
                  </span>
                </Link>
                <button
                  type="button"
                  onClick={close}
                  aria-label="Close menu"
                  className="w-9 h-9 rounded flex items-center justify-center text-body hover:text-heading hover:bg-surface transition-colors"
                >
                  <X size={20} aria-hidden="true" />
                </button>
              </div>


              {/* Nav links */}
              <nav className="flex-1 overflow-y-auto px-3 py-4" aria-label="Mobile navigation">
                <ul className="flex flex-col gap-0.5" role="list">
                  {mainNav.map(({ label, path }, i) => (
                    <motion.li key={label} custom={i} variants={itemVariants} initial="initial" animate="animate">
                      <NavLink
                        to={path}
                        end={path === '/'}
                        onClick={close}
                        className={({ isActive }) =>
                          cn(
                            'flex items-center justify-between px-4 py-3 rounded-xl font-heading font-semibold text-sm transition-all duration-200',
                            isActive
                              ? 'text-heading bg-primary/15 border-l-[3px] border-primary'
                              : 'text-heading hover:text-primary hover:bg-primary/5'
                          )
                        }
                      >
                        {({ isActive }) => (
                          <>
                            <span>{label}</span>
                            <ChevronDown
                              size={14}
                              className={cn('transition-colors', isActive ? 'text-primary' : 'text-body')}
                              aria-hidden="true"
                            />
                          </>
                        )}
                      </NavLink>
                    </motion.li>
                  ))}

                  <li className="mt-3 pt-3 border-t border-border">
                    <p className="px-4 text-[10px] font-heading font-bold uppercase tracking-[0.15em] text-body/50 mb-2">
                      Quick Links
                    </p>
                  </li>
                  {topLinks.slice(1).map(({ label, path }, i) => (
                    <motion.li key={label} custom={mainNav.length + i} variants={itemVariants} initial="initial" animate="animate">
                      <Link
                        to={path}
                        onClick={close}
                        className="flex items-center px-4 py-2.5 rounded-xl font-heading font-medium text-sm text-body hover:text-heading hover:bg-surface transition-all duration-200"
                      >
                        {label}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              {/* Drawer footer */}
              <div className="px-4 pb-6 pt-3 border-t border-border shrink-0 space-y-2">
                <a
                  href={`tel:${CONTACT_INFO.phone}`}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-surface text-sm font-heading font-semibold text-body hover:text-heading transition-colors"
                >
                  <span className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center shrink-0">
                    <Phone size={14} className="text-primary" aria-hidden="true" />
                  </span>
                  {CONTACT_INFO.phone}
                </a>
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-surface text-sm font-heading font-semibold text-body hover:text-heading transition-colors"
                >
                  <span className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center shrink-0">
                    <Mail size={14} className="text-primary" aria-hidden="true" />
                  </span>
                  {CONTACT_INFO.email}
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
