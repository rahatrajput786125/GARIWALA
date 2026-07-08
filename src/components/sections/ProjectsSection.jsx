import { useEffect, useRef, useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  ArrowRight,
  MapPin,
  Calendar,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react'
import Section   from '@/components/Section'
import Container from '@/components/Container'
import Heading   from '@/components/Heading'
import Badge     from '@/components/Badge'
import Button    from '@/components/Button'

gsap.registerPlugin(ScrollTrigger)

/* ─────────────────────────────────────────
   Filter categories
───────────────────────────────────────── */
const FILTERS = ['All', 'Industrial', 'Commercial', 'Infrastructure', 'Logistics', 'Manufacturing']

/* ─────────────────────────────────────────
   Project data
───────────────────────────────────────── */
const projects = [
  {
    id: 'p1',
    featured: true,
    category: 'Industrial',
    title: 'Civic Type R — Full Ground-Up Build',
    description:
      'A complete ground-up custom build featuring bespoke bodywork, a high-output turbocharged engine, and a hand-stitched interior — delivered to exacting client specifications.',
    location: 'Lahore, Pakistan',
    year: '2024',
    tags: ['Custom Build', 'Performance', 'Interior'],
    highlights: ['Completed On Time', 'Premium Quality', 'Certified Standards'],
    gradient: 'from-[#1a1f2e] via-[#252d42] to-[#1e2840]',
    accentGlow: 'rgba(255,193,7,0.22)',
  },
  {
    id: 'p2',
    featured: false,
    category: 'Infrastructure',
    title: 'Land Cruiser Heritage Restoration',
    description:
      'Frame-off restoration of a classic Land Cruiser to factory-perfect condition with modern mechanicals.',
    location: 'Islamabad, Pakistan',
    year: '2024',
    tags: ['Restoration', 'Heritage'],
    highlights: ['Completed On Time', 'Certified Standards'],
    gradient: 'from-[#1a2a1a] via-[#2d3d2a] to-[#243320]',
    accentGlow: 'rgba(255,193,7,0.16)',
  },
  {
    id: 'p3',
    featured: false,
    category: 'Manufacturing',
    title: 'BMW M3 — Full Track Preparation',
    description:
      'Race-spec track preparation including roll cage, harness system, and a precision ECU tune for circuit competition.',
    location: 'Karachi, Pakistan',
    year: '2023',
    tags: ['Performance', 'Track'],
    highlights: ['Premium Quality', 'Certified Standards'],
    gradient: 'from-[#1f1a2e] via-[#2a2540] to-[#221e38]',
    accentGlow: 'rgba(255,193,7,0.18)',
  },
  {
    id: 'p4',
    featured: false,
    category: 'Logistics',
    title: 'Hilux Overland Expedition Build',
    description:
      'Full overland conversion with lift kit, roof tent, auxiliary power, and long-range fuel system.',
    location: 'Lahore, Pakistan',
    year: '2023',
    tags: ['Custom Build', 'Overland'],
    highlights: ['Completed On Time', 'Premium Quality'],
    gradient: 'from-[#2a1a0f] via-[#3d2510] to-[#4a2e14]',
    accentGlow: 'rgba(255,193,7,0.2)',
  },
  {
    id: 'p5',
    featured: false,
    category: 'Commercial',
    title: 'Porsche 911 — Paint Correction',
    description:
      'Multi-stage paint correction and ceramic coating on a pristine Porsche 911 GT3 RS.',
    location: 'Lahore, Pakistan',
    year: '2023',
    tags: ['Paint', 'Detailing'],
    highlights: ['Premium Quality', 'Certified Standards'],
    gradient: 'from-[#1e2a2a] via-[#263535] to-[#1e2e2e]',
    accentGlow: 'rgba(255,193,7,0.15)',
  },
  {
    id: 'p6',
    featured: false,
    category: 'Industrial',
    title: 'Supra 2JZ Engine Swap',
    description:
      'Complete 2JZ engine swap with custom manifold, twin-turbo setup, and standalone ECU management.',
    location: 'Faisalabad, Pakistan',
    year: '2022',
    tags: ['Engine', 'Performance'],
    highlights: ['Completed On Time', 'Certified Standards'],
    gradient: 'from-[#2a1a1a] via-[#3d2525] to-[#3a2020]',
    accentGlow: 'rgba(255,193,7,0.18)',
  },
]

/* ─────────────────────────────────────────
   Framer variants
───────────────────────────────────────── */
const cardVariants = {
  initial: { opacity: 0, y: 32, scale: 0.97 },
  animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  exit:    { opacity: 0, scale: 0.96, transition: { duration: 0.25 } },
}

/* ─────────────────────────────────────────
   FeaturedCard
───────────────────────────────────────── */
const FeaturedCard = ({ category, title, description, location, year, tags, highlights, gradient, accentGlow }) => (
  <motion.article
    layout
    variants={cardVariants}
    initial="initial"
    animate="animate"
    exit="exit"
    whileHover={{ y: -6 }}
    transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
    className="group relative flex flex-col overflow-hidden rounded-[1.5rem] border border-border hover:border-primary/40 transition-[border-color,box-shadow,transform] duration-500 shadow-card hover:shadow-card-hover bg-white will-change-transform"
    aria-label={`Featured project: ${title}`}
  >
    {/* ── Image area ── */}
    <div className="relative overflow-hidden rounded-t-[1.5rem] aspect-[16/10]">
      {/* Gradient image placeholder */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradient} group-hover:scale-[1.06] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]`}
      />
      <div className="absolute inset-0 bg-dot-pattern opacity-[0.1]" />
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.05]" />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />
      {/* Yellow glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(ellipse 70% 50% at 50% 100%, ${accentGlow} 0%, transparent 70%)` }}
      />
      {/* Top accent */}
      <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-primary via-primary-500 to-primary-700 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

      {/* Category badge — over image */}
      <div className="absolute top-5 left-5 z-10">
        <Badge variant="dark" className="backdrop-blur-sm bg-heading/80 text-white border-white/10">
          {category}
        </Badge>
      </div>

      {/* Tags — bottom of image */}
      <div className="absolute bottom-5 left-5 z-10 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-sm text-white text-[10px] font-heading font-bold uppercase tracking-wider border border-white/20"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>

    {/* ── Content ── */}
    <div className="flex flex-col flex-1 p-7 lg:p-8">
      {/* Meta row */}
      <div className="flex items-center gap-4 mb-4">
        <span className="flex items-center gap-1.5 text-body-xs text-body">
          <MapPin size={11} className="text-primary" aria-hidden="true" />
          {location}
        </span>
        <span className="w-px h-3 bg-border" />
        <span className="flex items-center gap-1.5 text-body-xs text-body">
          <Calendar size={11} className="text-primary" aria-hidden="true" />
          {year}
        </span>
      </div>

      {/* Title */}
      <h3 className="font-heading font-bold text-display-sm text-heading mb-3 leading-tight group-hover:text-primary transition-colors duration-300">
        {title}
      </h3>

      {/* Description */}
      <p className="text-body-sm text-body leading-relaxed mb-6 flex-1">
        {description}
      </p>

      {/* Highlights */}
      <ul className="flex flex-col gap-2 mb-7 pt-5 border-t border-border">
        {highlights.map((item) => (
          <li key={item} className="flex items-center gap-2.5 text-body-sm text-body">
            <CheckCircle2 size={14} className="text-primary shrink-0" aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Button
        as={Link}
        to="/projects"
        size="md"
        className="group/btn self-start"
        aria-label={`View project: ${title}`}
      >
        View Project
        <ArrowRight
          size={16}
          className="transition-transform duration-300 group-hover/btn:translate-x-1"
          aria-hidden="true"
        />
      </Button>
    </div>

    {/* Bottom glow */}
    <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[1.5rem]" />
  </motion.article>
)

/* ─────────────────────────────────────────
   SecondaryCard
───────────────────────────────────────── */
const SecondaryCard = ({ category, title, description, location, year, tags, gradient, accentGlow }) => (
  <motion.article
    layout
    variants={cardVariants}
    initial="initial"
    animate="animate"
    exit="exit"
    whileHover={{ y: -5, scale: 1.01 }}
    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    className="group relative flex gap-5 overflow-hidden rounded-[1.25rem] border border-border hover:border-primary/35 transition-[border-color,box-shadow,transform] duration-500 shadow-card hover:shadow-card-hover bg-white p-5 will-change-transform"
    aria-label={`Project: ${title}`}
  >
    {/* Top accent */}
    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary via-primary-500 to-primary-700 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-t-[1.25rem]" />

    {/* Background glow */}
    <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.035] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[1.25rem]" />

    {/* Image thumbnail */}
    <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden shrink-0 self-start">
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradient} group-hover:scale-[1.1] transition-transform duration-600 ease-[cubic-bezier(0.16,1,0.3,1)]`}
      />
      <div className="absolute inset-0 bg-dot-pattern opacity-[0.12]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `radial-gradient(ellipse 100% 80% at 50% 100%, ${accentGlow} 0%, transparent 70%)` }}
      />
    </div>

    {/* Content */}
    <div className="flex flex-col flex-1 min-w-0 relative z-10">
      {/* Category + meta */}
      <div className="flex items-center gap-2 mb-2 flex-wrap">
        <Badge variant="primary" className="text-[9px] px-2 py-0.5">
          {category}
        </Badge>
        <span className="flex items-center gap-1 text-body-xs text-body/60">
          <MapPin size={9} className="text-primary" aria-hidden="true" />
          {location}
        </span>
        <span className="flex items-center gap-1 text-body-xs text-body/60">
          <Calendar size={9} className="text-primary" aria-hidden="true" />
          {year}
        </span>
      </div>

      {/* Title */}
      <h3 className="font-heading font-bold text-body-md text-heading mb-1.5 leading-snug group-hover:text-primary transition-colors duration-300 truncate">
        {title}
      </h3>

      {/* Description */}
      <p className="text-body-xs text-body leading-relaxed mb-3 line-clamp-2">
        {description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-0.5 rounded-full bg-surface border border-border text-body-xs text-body font-heading font-semibold"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Link */}
      <Link
        to="/projects"
        className="inline-flex items-center gap-1.5 text-body-xs font-heading font-bold text-body group-hover:text-primary transition-colors duration-300 mt-auto w-fit"
        aria-label={`View project: ${title}`}
      >
        View Project
        <ExternalLink
          size={11}
          className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden="true"
        />
      </Link>
    </div>
  </motion.article>
)

/* ─────────────────────────────────────────
   ProjectsSection
───────────────────────────────────────── */
const ProjectsSection = () => {
  const [activeFilter, setActiveFilter] = useState('All')
  const headerRef  = useRef(null)
  const filterRef  = useRef(null)
  const layoutRef  = useRef(null)

  /* Filtered list */
  const filtered = useMemo(
    () => activeFilter === 'All' ? projects : projects.filter((p) => p.category === activeFilter),
    [activeFilter]
  )

  const featured    = filtered.find((p) => p.featured) ?? filtered[0]
  const secondaries = filtered.filter((p) => p.id !== featured?.id).slice(0, 3)

  /* GSAP entrance — header + filter */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.85, ease: 'power3.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 85%', once: true } }
      )
      gsap.fromTo(
        filterRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', delay: 0.15,
          scrollTrigger: { trigger: filterRef.current, start: 'top 88%', once: true } }
      )
      gsap.fromTo(
        layoutRef.current,
        { opacity: 0, y: 48 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: 0.1,
          scrollTrigger: { trigger: layoutRef.current, start: 'top 84%', once: true } }
      )
    })
    return () => ctx.revert()
  }, [])

  return (
    <Section id="projects" className="relative overflow-hidden" aria-labelledby="projects-heading">

      {/* ── Section background ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 75% 55% at 50% 30%, rgba(255,193,7,0.055) 0%, transparent 65%), ' +
            'radial-gradient(ellipse 45% 40% at 5% 70%, rgba(255,193,7,0.04) 0%, transparent 60%)',
        }}
      />
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.022] pointer-events-none" />
      <div className="absolute top-12 right-[4%] w-64 h-64 rounded-full bg-primary/[0.07] blur-[88px] pointer-events-none" />
      <div className="absolute bottom-16 left-[3%] w-52 h-52 rounded-full bg-primary/[0.05] blur-[72px] pointer-events-none" />

      {/* Floating shapes */}
      <div className="absolute top-[10%] left-[46%] w-10 h-10 rounded-2xl bg-primary/10 border border-primary/15 hidden xl:block pointer-events-none opacity-60" aria-hidden="true" />
      <div className="absolute bottom-[20%] right-[47%] w-2.5 h-2.5 rounded-full bg-primary/35 hidden xl:block pointer-events-none" aria-hidden="true" />

      <Container className="relative z-10">

        {/* ══ Section header ══ */}
        <div ref={headerRef} className="flex flex-col items-center text-center mb-12 lg:mb-14">
          <Badge className="mb-5">Our Work</Badge>
          <Heading as="h2" id="projects-heading" center className="mb-5 max-w-2xl">
            Featured{' '}
            <span className="text-gradient">Projects</span>
          </Heading>
          <p className="text-body-lg text-body max-w-xl leading-relaxed">
            A curated showcase of our finest work — each project a testament to precision
            engineering, premium craftsmanship, and uncompromising quality.
          </p>
        </div>

        {/* ══ Filter bar ══ */}
        <div
          ref={filterRef}
          className="flex flex-wrap justify-center gap-2 mb-12"
          role="group"
          aria-label="Filter projects by category"
        >
          {FILTERS.map((filter) => {
            const isActive = activeFilter === filter
            return (
              <motion.button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2 }}
                aria-pressed={isActive}
                className={[
                  'relative px-5 py-2.5 rounded-full text-body-sm font-heading font-semibold tracking-[0.01em]',
                  'transition-colors duration-300 cursor-pointer select-none',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
                  isActive
                    ? 'text-heading'
                    : 'bg-white border border-border text-body hover:text-heading hover:border-primary/30 hover:bg-primary/5 shadow-xs',
                ].join(' ')}
              >
                {isActive && (
                  <motion.span
                    layoutId="filter-pill"
                    className="absolute inset-0 rounded-full bg-primary shadow-primary -z-10"
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  />
                )}
                {filter}
              </motion.button>
            )
          })}
        </div>

        {/* ══ Project layout ══ */}
        <div ref={layoutRef}>
          <AnimatePresence mode="wait">
            {filtered.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-24 text-center"
              >
                <p className="text-body-lg text-body">No projects found in this category.</p>
              </motion.div>
            ) : (
              <motion.div
                key={activeFilter}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-5 lg:gap-6"
              >
                {/* Featured card */}
                {featured && (
                  <FeaturedCard key={featured.id} {...featured} />
                )}

                {/* Secondary cards column */}
                <div className="flex flex-col gap-5">
                  <AnimatePresence>
                    {secondaries.map((project) => (
                      <SecondaryCard key={project.id} {...project} />
                    ))}
                  </AnimatePresence>

                  {/* View all CTA — fills remaining space */}
                  {secondaries.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      className="mt-auto pt-2"
                    >
                      <Button
                        as={Link}
                        to="/projects"
                        variant="outline"
                        size="md"
                        fullWidth
                        className="group/all"
                        aria-label="View all projects"
                      >
                        View All Projects
                        <ArrowRight
                          size={16}
                          className="transition-transform duration-300 group-hover/all:translate-x-1"
                          aria-hidden="true"
                        />
                      </Button>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </Container>
    </Section>
  )
}

export default ProjectsSection
