import { Helmet } from 'react-helmet-async'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGsapReveal } from '@/hooks/useGsapReveal'
import Section   from '@/components/Section'
import Container from '@/components/Container'
import Heading   from '@/components/Heading'
import CtaSection from '@/components/sections/CtaSection'
import { SITE_NAME } from '@/constants'
import { ArrowUpRight } from 'lucide-react'

const categories = ['All', 'Custom Build', 'Restoration', 'Performance', 'Paint & Body', 'Engine']

const projects = [
  { title: 'Civic Type R Full Build',       category: 'Custom Build',  year: '2024', description: 'Complete ground-up build with custom bodywork, performance engine, and bespoke interior.' },
  { title: 'Land Cruiser Restoration',      category: 'Restoration',   year: '2024', description: 'Full frame-off restoration of a classic Land Cruiser to factory-perfect condition.' },
  { title: 'BMW M3 Track Prep',             category: 'Performance',   year: '2023', description: 'Full track preparation including roll cage, harness, and ECU tune for circuit racing.' },
  { title: 'Porsche 911 Paint Correction',  category: 'Paint & Body',  year: '2023', description: 'Multi-stage paint correction and ceramic coating on a pristine Porsche 911.' },
  { title: 'Hilux Overland Build',          category: 'Custom Build',  year: '2023', description: 'Full overland conversion with lift kit, roof tent, and auxiliary power system.' },
  { title: 'Supra 2JZ Swap',               category: 'Engine',        year: '2022', description: 'Complete 2JZ engine swap with custom manifold, turbo setup, and standalone ECU.' },
  { title: 'Mustang GT500 Widebody',        category: 'Custom Build',  year: '2022', description: 'Full widebody conversion with custom flares, air suspension, and carbon fibre accents.' },
  { title: 'Defender Heritage Restore',     category: 'Restoration',   year: '2022', description: 'Heritage-spec restoration of a 1990 Defender with modern mechanicals and period-correct trim.' },
  { title: 'Golf R Stage 3 Tune',           category: 'Performance',   year: '2021', description: 'Stage 3 power upgrade with hybrid turbo, intercooler, and full supporting mods.' },
]

const Projects = () => {
  const [active, setActive] = useState('All')
  const heroRef = useGsapReveal()

  const filtered = active === 'All' ? projects : projects.filter((p) => p.category === active)

  return (
    <>
      <Helmet>
        <title>Projects — {SITE_NAME}</title>
        <meta name="description" content="Browse Gariwala's portfolio of completed automotive projects." />
      </Helmet>

      <Section surface navOffset>
        <Container>
          <div ref={heroRef} className="max-w-2xl">
            <span className="eyebrow mb-6 block">Our Work</span>
            <Heading as="h1" className="mb-6">
              Featured
              <br />
              <span className="text-gradient">Projects</span>
            </Heading>
            <p className="text-body-xl text-body leading-relaxed">
              A curated selection of our finest work — each project a testament to our craft and commitment.
            </p>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-5 py-2.5 rounded-full text-body-sm font-heading font-semibold transition-all duration-200 ${
                  active === cat
                    ? 'bg-heading text-white shadow-[0_4px_16px_rgba(26,26,26,0.2)]'
                    : 'bg-surface text-body hover:bg-border hover:text-heading'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map(({ title, category, description, year }) => (
                <motion.div
                  key={title}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="group relative flex flex-col p-7 rounded-[1.25rem] bg-white border border-border shadow-card hover:shadow-card-hover hover:-translate-y-1.5 hover:border-primary/20 transition-all duration-500 cursor-pointer"
                >
                  {/* Hover accent */}
                  <div className="absolute top-0 left-7 right-7 h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-full" />

                  <div className="flex items-start justify-between mb-5">
                    <span className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-body-xs font-heading font-bold">
                      {category}
                    </span>
                    <span className="text-body-xs text-body font-heading font-semibold">{year}</span>
                  </div>
                  <h3 className="font-heading font-bold text-display-sm text-heading mb-3 group-hover:text-primary transition-colors duration-300 leading-tight flex-1">
                    {title}
                  </h3>
                  <p className="text-body-sm text-body leading-relaxed mb-5">{description}</p>
                  <div className="flex items-center gap-2 text-body-xs font-heading font-bold text-body group-hover:text-primary transition-colors duration-300">
                    View Project
                    <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </Container>
      </Section>

      <CtaSection />
    </>
  )
}

export default Projects
