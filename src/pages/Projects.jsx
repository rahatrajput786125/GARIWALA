import { Helmet } from 'react-helmet-async'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Section from '@/components/Section'
import Container from '@/components/Container'
import Heading from '@/components/Heading'
import CtaSection from '@/components/sections/CtaSection'
import { SITE_NAME } from '@/constants'
import { ArrowUpRight } from 'lucide-react'

const categories = ['All', 'Fleet Supply', 'Corporate', 'Government', 'Rental']

const projects = [
  {
    title: 'Packages Limited — Toyota Corolla Executive Fleet',
    category: 'Corporate',
    year: '2024',
    productId: 'toyota-corolla',
    image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&q=80&fit=crop',
    description: 'Supplied 30 units of Toyota Corolla 1.8L CVT to Packages Limited for their senior management and field operations fleet across New M. A. Jinnah Rd, Shikarpur Colony Muslimabad, Karachi, 74400 and Karachi.',
    specs: ['30 Units Delivered', 'Toyota Corolla 1.8L', 'New M. A. Jinnah Rd, Shikarpur Colony Muslimabad, Karachi, 74400 & Karachi', '3-Year Warranty'],
  },
  {
    title: 'Nishat Group — Honda Civic Corporate Fleet',
    category: 'Corporate',
    year: '2024',
    productId: 'honda-civic',
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80&fit=crop',
    description: 'Delivered 20 Honda Civic VTEC Turbo sedans to Nishat Group for their mid-management fleet, complete with extended service packages and roadside assistance.',
    specs: ['20 Units Delivered', 'Honda Civic 1.5T', 'Punjab & Sindh', 'Full Service Pack'],
  },
  {
    title: 'Punjab Government — Toyota Corolla Official Fleet',
    category: 'Government',
    year: '2024',
    productId: 'toyota-corolla',
    image: 'https://images.unsplash.com/photo-1623869675781-80aa31012a5a?w=800&q=80&fit=crop',
    description: 'Provided 50 Toyota Corolla units to Punjab Government for official use across various departments, including full registration, insurance, and maintenance contracts.',
    specs: ['50 Units Delivered', 'Toyota Corolla 1.8L', 'Punjab Province', 'Govt. Contract'],
  },
  {
    title: 'Engro Corporation — BMW 3 Series Executive Fleet',
    category: 'Corporate',
    year: '2023',
    productId: 'bmw-3-series',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80&fit=crop',
    description: 'Supplied 10 BMW 330i executive sedans to Engro Corporation for their C-suite and senior director fleet, with full BMW warranty and dedicated service support.',
    specs: ['10 Units Delivered', 'BMW 330i G20', 'Executive Fleet', 'BMW Warranty'],
  },
  {
    title: 'Serena Hotels — Mercedes-Benz C-Class VIP Fleet',
    category: 'Fleet Supply',
    year: '2023',
    productId: 'mercedes-c-class',
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80&fit=crop',
    description: 'Delivered 8 Mercedes-Benz C200 luxury sedans to Serena Hotels for their VIP guest transfer and airport pickup services across Islamabad and New M. A. Jinnah Rd, Shikarpur Colony Muslimabad, Karachi, 74400 properties.',
    specs: ['8 Units Delivered', 'Mercedes C200 W206', 'VIP Transfer Fleet', 'Islamabad & New M. A. Jinnah Rd, Shikarpur Colony Muslimabad, Karachi, 74400'],
  },
  {
    title: 'Fauji Foundation — Audi A4 Management Fleet',
    category: 'Corporate',
    year: '2023',
    productId: 'audi-a4',
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&q=80&fit=crop',
    description: 'Supplied 12 Audi A4 Quattro sedans to Fauji Foundation for their senior management fleet, featuring full Quattro AWD for year-round performance across Pakistan.',
    specs: ['12 Units Delivered', 'Audi A4 40 TFSI', 'Quattro AWD', 'Management Fleet'],
  },
  {
    title: 'Islamabad Airport — Honda Civic Rental Fleet',
    category: 'Rental',
    year: '2022',
    productId: 'honda-civic',
    image: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=800&q=80&fit=crop',
    description: 'Provided 25 Honda Civic units to a premium car rental operator at Islamabad International Airport, complete with GPS tracking and fleet management systems.',
    specs: ['25 Units Delivered', 'Honda Civic 1.5T', 'IIAL Islamabad', 'GPS Equipped'],
  },
  {
    title: 'PTCL — Toyota Corolla Field Operations Fleet',
    category: 'Government',
    year: '2022',
    productId: 'toyota-corolla',
    image: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800&q=80&fit=crop',
    description: 'Delivered 40 Toyota Corolla units to PTCL for their nationwide field engineering and customer service teams, with custom livery and equipment fitouts.',
    specs: ['40 Units Delivered', 'Toyota Corolla 1.8L', 'Nationwide', 'Custom Livery'],
  },
  {
    title: 'Pearl Continental Hotels — Mercedes C-Class Chauffeur Fleet',
    category: 'Fleet Supply',
    year: '2022',
    productId: 'mercedes-c-class',
    image: 'https://images.unsplash.com/photo-1617531653332-bd46c16f4d68?w=800&q=80&fit=crop',
    description: 'Supplied 6 Mercedes-Benz C-Class sedans to Pearl Continental Hotels for their chauffeur-driven guest services in Karachi, New M. A. Jinnah Rd, Shikarpur Colony Muslimabad, Karachi, 74400, and Rawalpindi.',
    specs: ['6 Units Delivered', 'Mercedes C200 W206', 'Chauffeur Fleet', '3 Cities'],
  },
]

const Projects = () => {
  const [active, setActive] = useState('All')
  const navigate = useNavigate()

  const filtered = active === 'All' ? projects : projects.filter((p) => p.category === active)

  return (
    <>
      <Helmet>
        <title>Projects — {SITE_NAME}</title>
        <meta name="description" content="Browse Gariwala Automobiles' completed car fleet supply projects across Pakistan." />
      </Helmet>

      <Section surface navOffset>
        <Container>
          <div className="max-w-2xl mb-10">
            <span className="eyebrow mb-4 block">Our Work</span>
            <Heading as="h1" className="mb-4">
              Featured <br />
              <span className="text-gradient">Projects</span>
            </Heading>
            <p className="text-body-xl text-body leading-relaxed">
              A curated selection of car fleet supply and delivery projects completed across Pakistan — from corporate fleets to government contracts.
            </p>
          </div>

          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-5 py-2.5 text-body-sm font-heading font-semibold transition-all duration-200 ${
                  active === cat
                    ? 'bg-[#F4B400] text-heading'
                    : 'bg-surface text-body border border-border hover:border-[#F4B400]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((project) => (
                <motion.div
                  key={project.title}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  onClick={() => navigate(`/product/${project.productId}`)}
                  className="group cursor-pointer border border-border rounded-xl overflow-hidden hover:border-[#F4B400]/60 hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="relative overflow-hidden aspect-[16/9]">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 flex gap-2">
                      <span className="bg-[#F4B400] text-heading font-heading font-bold text-[10px] uppercase tracking-wider px-2.5 py-1">
                        {project.category}
                      </span>
                      <span className="bg-black/60 text-white font-heading font-semibold text-[10px] px-2.5 py-1">
                        {project.year}
                      </span>
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="font-heading font-bold text-heading text-body-sm leading-snug mb-2 group-hover:text-[#F4B400] transition-colors duration-200">
                      {project.title}
                    </h3>
                    <p className="text-body text-body-xs leading-relaxed mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.specs.map((s) => (
                        <span key={s} className="bg-surface border border-border text-heading text-[10px] font-heading font-semibold px-2.5 py-1">
                          {s}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-1.5 text-body-xs font-heading font-bold text-body group-hover:text-[#F4B400] transition-colors duration-200">
                      View Vehicle <ArrowUpRight size={13} />
                    </div>
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
