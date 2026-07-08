import { Helmet } from 'react-helmet-async'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import Section from '@/components/Section'
import Container from '@/components/Container'
import Heading from '@/components/Heading'
import CtaSection from '@/components/sections/CtaSection'
import { useGsapReveal } from '@/hooks/useGsapReveal'
import { SITE_NAME } from '@/constants'
import { Camera } from 'lucide-react'

const galleryItems = [
  { id: 1, title: 'Engine Bay Detail',   category: 'Engine',      color: 'from-amber-900/80' },
  { id: 2, title: 'Custom Paint Job',    category: 'Paint',       color: 'from-blue-900/80' },
  { id: 3, title: 'Interior Build',      category: 'Interior',    color: 'from-violet-900/80' },
  { id: 4, title: 'Track Day Prep',      category: 'Performance', color: 'from-red-900/80' },
  { id: 5, title: 'Wheel Setup',         category: 'Wheels',      color: 'from-emerald-900/80' },
  { id: 6, title: 'Body Restoration',    category: 'Body',        color: 'from-slate-900/80' },
  { id: 7, title: 'Suspension Work',     category: 'Performance', color: 'from-orange-900/80' },
  { id: 8, title: 'Detailing Session',   category: 'Detail',      color: 'from-teal-900/80' },
]

const GalleryCard = ({ title, category, color }) => (
  <div className="group relative aspect-square rounded-[1.25rem] overflow-hidden bg-[#1A1A1A] cursor-pointer">
    {/* Placeholder gradient bg */}
    <div className={`absolute inset-0 bg-gradient-to-br ${color} to-[#111] opacity-80`} />

    {/* Grid pattern overlay */}
    <div className="absolute inset-0 bg-grid-pattern opacity-20" />

    {/* Center icon */}
    <div className="absolute inset-0 flex items-center justify-center">
      <Camera size={32} className="text-white/10 group-hover:text-white/5 transition-opacity" />
    </div>

    {/* Hover overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

    {/* Content */}
    <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400">
      <span className="inline-block px-2.5 py-1 rounded-full bg-primary text-heading text-[10px] font-heading font-black uppercase tracking-wider mb-2">
        {category}
      </span>
      <p className="text-white font-heading font-bold text-body-sm">{title}</p>
    </div>

    {/* Corner accent */}
    <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
  </div>
)

const Gallery = () => {
  const heroRef = useGsapReveal()
  const gridRef = useGsapReveal({ delay: 0.1 })

  return (
    <>
      <Helmet>
        <title>Gallery — {SITE_NAME}</title>
        <meta name="description" content="Browse Gariwala's gallery of automotive work and projects." />
      </Helmet>

      <Section surface navOffset>
        <Container>
          <div ref={heroRef} className="max-w-2xl mb-16">
            <span className="eyebrow mb-6 block">Visual Portfolio</span>
            <Heading as="h1" className="mb-5">
              Our <span className="text-gradient">Gallery</span>
            </Heading>
            <p className="text-body-xl text-body leading-relaxed">
              A visual journey through our finest automotive work.
            </p>
          </div>

          {/* Swiper carousel */}
          <div className="mb-16">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={20}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 3500, disableOnInteraction: false }}
              breakpoints={{
                640:  { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              className="pb-12"
            >
              {galleryItems.map((item) => (
                <SwiperSlide key={item.id}>
                  <GalleryCard {...item} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Static grid */}
          <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {galleryItems.map((item) => (
              <GalleryCard key={`grid-${item.id}`} {...item} />
            ))}
          </div>
        </Container>
      </Section>

      <CtaSection />
    </>
  )
}

export default Gallery
