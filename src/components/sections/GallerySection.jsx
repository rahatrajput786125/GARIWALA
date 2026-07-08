import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ZoomIn, ArrowRight, MoveRight } from 'lucide-react'

import Section   from '@/components/Section'
import Container from '@/components/Container'
import Heading   from '@/components/Heading'
import Badge     from '@/components/Badge'
import Button    from '@/components/Button'

gsap.registerPlugin(ScrollTrigger)

/* ─────────────────────────────────────────
   Gallery data
───────────────────────────────────────── */
const galleryItems = [
  {
    id: 'g1',
    featured: true,
    category: 'Projects',
    title: 'Civic Type R — Ground-Up Custom Build',
    description:
      'A complete ground-up build featuring bespoke bodywork, high-output turbocharged engine, and a hand-stitched interior — delivered to exacting client specifications.',
    gradient: 'from-[#0f1923] via-[#1a2d42] to-[#0d1f35]',
    accentGlow: 'rgba(255,193,7,0.22)',
    dotOpacity: '0.14',
  },
  {
    id: 'g2',
    featured: false,
    category: 'Equipment',
    title: 'Precision Diagnostic Bay',
    gradient: 'from-[#1a1a2e] via-[#2a2a45] to-[#1e1e38]',
    accentGlow: 'rgba(255,193,7,0.16)',
    dotOpacity: '0.10',
  },
  {
    id: 'g3',
    featured: false,
    category: 'Facilities',
    title: 'State-of-the-Art Workshop',
    gradient: 'from-[#1a2a1a] via-[#2d3d2a] to-[#243320]',
    accentGlow: 'rgba(255,193,7,0.14)',
    dotOpacity: '0.10',
  },
  {
    id: 'g4',
    featured: false,
    category: 'Operations',
    title: 'Fleet Maintenance Operations',
    gradient: 'from-[#2a1a0f] via-[#3d2510] to-[#4a2e14]',
    accentGlow: 'rgba(255,193,7,0.20)',
    dotOpacity: '0.12',
  },
  {
    id: 'g5',
    featured: false,
    category: 'Projects',
    title: 'Land Cruiser Heritage Restoration',
    gradient: 'from-[#1f1a2e] via-[#2a2540] to-[#221e38]',
    accentGlow: 'rgba(255,193,7,0.18)',
    dotOpacity: '0.11',
  },
  {
    id: 'g6',
    featured: false,
    category: 'Team',
    title: 'Certified Master Technicians',
    gradient: 'from-[#1e2a2a] via-[#263535] to-[#1e2e2e]',
    accentGlow: 'rgba(255,193,7,0.15)',
    dotOpacity: '0.10',
  },
  {
    id: 'g7',
    featured: false,
    category: 'Events',
    title: 'Annual Automotive Showcase 2024',
    gradient: 'from-[#2a2a1a] via-[#3d3d25] to-[#4a4a2d]',
    accentGlow: 'rgba(255,193,7,0.17)',
    dotOpacity: '0.12',
  },
]

/* ─────────────────────────────────────────
   FeaturedCard
───────────────────────────────────────── */
const FeaturedCard = ({ category, title, description, gradient, accentGlow, dotOpacity }) => (
  <motion.article
    whileHover={{ scale: 1.012 }}
    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    className="group relative overflow-hidden rounded-[1.5rem] border border-border hover:border-primary/50 transition-[border-color,box-shadow,transform] duration-500 shadow-[0_4px_24px_rgba(0,0,0,0.10),0_1px_6px_rgba(0,0,0,0.06)] hover:shadow-[0_32px_80px_rgba(0,0,0,0.18),0_4px_24px_rgba(0,0,0,0.10)] cursor-pointer h-full min-h-[520px] will-change-transform"
    aria-label={`Featured gallery item: ${title}`}
  >
    {/* Gradient image placeholder */}
    <div
      className={`absolute inset-0 bg-gradient-to-br ${gradient} group-hover:scale-[1.06] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]`}
    />
    <div className="absolute inset-0 bg-dot-pattern opacity-[0.14] pointer-events-none" />
    <div className="absolute inset-0 bg-grid-pattern opacity-[0.06] pointer-events-none" />

    {/* Dark overlay — deepens on hover */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/10 group-hover:from-black/95 group-hover:via-black/45 transition-all duration-500" />

    {/* Yellow glow */}
    <div
      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
      style={{ background: `radial-gradient(ellipse 75% 55% at 50% 100%, ${accentGlow} 0%, transparent 68%)` }}
    />

    {/* Top accent bar */}
    <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-primary via-primary-500 to-primary-700 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

    {/* Zoom icon — top right */}
    <div className="absolute top-5 right-5 z-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        whileInView={{ opacity: 1, scale: 1 }}
        className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:bg-primary/90 group-hover:border-primary transition-all duration-300"
        aria-hidden="true"
      >
        <ZoomIn size={16} className="text-white group-hover:text-heading transition-colors duration-300" />
      </motion.div>
    </div>

    {/* Category badge — top left */}
    <div className="absolute top-5 left-5 z-20">
      <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-primary/90 backdrop-blur-sm text-heading text-[10px] font-heading font-black uppercase tracking-wider shadow-primary">
        {category}
      </span>
    </div>

    {/* Bottom content */}
    <div className="absolute bottom-0 left-0 right-0 z-10 p-8">
      <h3 className="font-heading font-bold text-display-sm text-white mb-3 leading-tight group-hover:text-primary transition-all duration-300 translate-y-1 group-hover:translate-y-0">
        {title}
      </h3>
      <p className="text-body-sm text-white/65 leading-relaxed mb-6 max-w-sm group-hover:text-white/80 opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-400">
        {description}
      </p>
      <Button
        as={Link}
        to="/gallery"
        variant="white"
        size="sm"
        className="group/btn opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-400"
        aria-label="Explore gallery"
      >
        Explore Gallery
        <ArrowRight
          size={14}
          className="transition-transform duration-300 group-hover/btn:translate-x-1"
          aria-hidden="true"
        />
      </Button>
    </div>
  </motion.article>
)

/* ─────────────────────────────────────────
   SecondaryCard
───────────────────────────────────────── */
const SecondaryCard = ({ category, title, gradient, accentGlow, dotOpacity }) => (
  <motion.article
    whileHover={{ scale: 1.02, y: -4 }}
    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    className="group relative overflow-hidden rounded-[1.5rem] border border-border hover:border-primary/45 transition-[border-color,box-shadow,transform] duration-500 shadow-card hover:shadow-[0_20px_56px_rgba(0,0,0,0.16),0_4px_16px_rgba(0,0,0,0.09)] cursor-pointer aspect-[4/3] will-change-transform"
    aria-label={`Gallery item: ${title}`}
  >
    {/* Gradient image placeholder */}
    <div
      className={`absolute inset-0 bg-gradient-to-br ${gradient} group-hover:scale-[1.08] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]`}
    />
    <div className="absolute inset-0 bg-dot-pattern opacity-[0.10] pointer-events-none" />
    <div className="absolute inset-0 bg-grid-pattern opacity-[0.05] pointer-events-none" />

    {/* Dark overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/88 group-hover:via-black/30 transition-all duration-500" />

    {/* Yellow glow */}
    <div
      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
      style={{ background: `radial-gradient(ellipse 80% 55% at 50% 100%, ${accentGlow} 0%, transparent 70%)` }}
    />

    {/* Top accent bar */}
    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary via-primary-500 to-primary-700 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

    {/* Zoom icon */}
    <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <div className="w-8 h-8 rounded-xl bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center group-hover:bg-primary/90 group-hover:border-primary transition-all duration-300" aria-hidden="true">
        <ZoomIn size={13} className="text-white group-hover:text-heading transition-colors duration-300" />
      </div>
    </div>

    {/* Bottom content */}
    <div className="absolute bottom-0 left-0 right-0 z-10 p-5">
      {/* Category badge */}
      <div className="mb-2 translate-y-1 group-hover:translate-y-0 transition-transform duration-400">
        <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 text-white text-[9px] font-heading font-bold uppercase tracking-wider">
          {category}
        </span>
      </div>

      {/* Title */}
      <div className="flex items-end justify-between gap-3">
        <h3 className="font-heading font-bold text-body-md text-white leading-snug group-hover:text-primary transition-all duration-300 translate-y-1 group-hover:translate-y-0">
          {title}
        </h3>
        <div className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <MoveRight
            size={16}
            className="text-primary transition-transform duration-300 group-hover:translate-x-1"
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  </motion.article>
)

/* ─────────────────────────────────────────
   GallerySection
───────────────────────────────────────── */
const GallerySection = () => {
  const headerRef = useRef(null)
  const gridRef   = useRef(null)
  const ctaRef    = useRef(null)

  const featured    = galleryItems.find((g) => g.featured)
  const secondaries = galleryItems.filter((g) => !g.featured)

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Header */
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 44 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 86%', once: true },
        }
      )

      /* Featured card */
      const featured = gridRef.current?.querySelector('[data-featured]')
      if (featured) {
        gsap.fromTo(
          featured,
          { opacity: 0, x: -48, scale: 0.97 },
          {
            opacity: 1, x: 0, scale: 1, duration: 0.95, ease: 'power3.out',
            scrollTrigger: { trigger: gridRef.current, start: 'top 84%', once: true },
          }
        )
      }

      /* Secondary cards — stagger */
      const cards = gridRef.current?.querySelectorAll('[data-secondary]')
      if (cards?.length) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 48, scale: 0.96 },
          {
            opacity: 1, y: 0, scale: 1, duration: 0.85, ease: 'power3.out',
            stagger: 0.09, delay: 0.12,
            scrollTrigger: { trigger: gridRef.current, start: 'top 84%', once: true },
          }
        )
      }

      /* CTA */
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 28 },
        {
          opacity: 1, y: 0, duration: 0.75, ease: 'power3.out',
          scrollTrigger: { trigger: ctaRef.current, start: 'top 90%', once: true },
        }
      )
    })
    return () => ctx.revert()
  }, [])

  return (
    <Section id="gallery" className="relative overflow-hidden" aria-labelledby="gallery-heading">

      {/* ── Background layers ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 68% 52% at 50% 25%, rgba(255,193,7,0.055) 0%, transparent 65%), ' +
            'radial-gradient(ellipse 42% 38% at 92% 70%, rgba(255,193,7,0.04) 0%, transparent 60%)',
        }}
      />
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.022] pointer-events-none" />
      <div className="absolute top-12 left-[4%] w-80 h-80 rounded-full bg-primary/[0.065] blur-[100px] pointer-events-none" />
      <div className="absolute bottom-16 right-[5%] w-60 h-60 rounded-full bg-primary/[0.05] blur-[80px] pointer-events-none" />

      {/* Floating geometric accents */}
      <motion.div
        initial={{ opacity: 0, rotate: 0 }}
        animate={{ opacity: 1, rotate: 22 }}
        transition={{ delay: 0.7, duration: 1.8 }}
        className="absolute top-[7%] right-[43%] w-10 h-10 rounded-2xl bg-primary/[0.09] border border-primary/[0.14] hidden xl:block pointer-events-none"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.0, duration: 0.9 }}
        className="absolute bottom-[18%] left-[45%] w-3 h-3 rounded-full bg-primary/35 hidden xl:block pointer-events-none"
      />
      <motion.div
        initial={{ opacity: 0, rotate: 0 }}
        animate={{ opacity: 1, rotate: -14 }}
        transition={{ delay: 1.2, duration: 1.6 }}
        className="absolute top-[52%] right-[3%] w-6 h-6 rounded-xl bg-border/80 border border-border hidden xl:block pointer-events-none"
      />

      <Container className="relative z-10">

        {/* ══ Section header ══ */}
        <div ref={headerRef} className="flex flex-col items-center text-center mb-14 lg:mb-16">
          <Badge className="mb-5">Our Gallery</Badge>
          <Heading as="h2" id="gallery-heading" center className="mb-5 max-w-2xl">
            Craftsmanship in{' '}
            <span className="text-gradient">Every Frame</span>
          </Heading>
          <p className="text-body-lg text-body max-w-xl leading-relaxed">
            A visual testament to precision, passion, and premium quality — explore our
            work across projects, facilities, equipment, and the team behind it all.
          </p>
        </div>

        {/* ══ Gallery grid ══ */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-5 lg:gap-6"
        >
          {/* Featured card — left column, full height */}
          {featured && (
            <div data-featured className="lg:row-span-2">
              <FeaturedCard {...featured} />
            </div>
          )}

          {/* Secondary cards — right column, 2×3 grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5 lg:gap-6 lg:col-start-2">
            {secondaries.slice(0, 6).map((item) => (
              <div key={item.id} data-secondary>
                <SecondaryCard {...item} />
              </div>
            ))}
          </div>
        </div>

        {/* ══ View all CTA ══ */}
        <div ref={ctaRef} className="flex justify-center mt-12 lg:mt-14">
          <Button
            as={Link}
            to="/gallery"
            size="lg"
            className="group/cta"
            aria-label="View full gallery"
          >
            View Full Gallery
            <ArrowRight
              size={18}
              className="transition-transform duration-300 group-hover/cta:translate-x-1.5"
              aria-hidden="true"
            />
          </Button>
        </div>

      </Container>
    </Section>
  )
}

export default GallerySection
