import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation } from 'swiper/modules'
import { ChevronLeft, ChevronRight, Phone, ArrowRight } from 'lucide-react'
import Section from '@/components/Section'
import Container from '@/components/Container'
import { getProducts } from '@/utils/api'
import 'swiper/css'
import 'swiper/css/navigation'

const ProductCard = ({ product }) => (
  <motion.div
    whileHover={{ y: -4 }}
    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
    className="group cursor-pointer flex flex-col"
  >
    <div className="relative overflow-hidden bg-[#f5f5f5] aspect-[4/3]">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-[#F4B400]/0 group-hover:bg-[#F4B400]/10 transition-colors duration-300" />
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span className="bg-[#F4B400] text-heading font-heading font-black text-xs px-4 py-2 uppercase tracking-wide shadow-lg flex items-center gap-1.5">
          View Details <ArrowRight size={12} />
        </span>
      </div>
    </div>
    <div className="pt-3 pb-1 text-center">
      <h3 className="font-heading font-bold text-[#F4B400] text-body-sm leading-tight mb-1">
        {product.name}
      </h3>
      <p className="text-body text-body-xs">Click here to view details</p>
    </div>
  </motion.div>
)

const ProductLineupSection = () => {
  const [activeTab, setActiveTab] = useState('')
  const [allProducts, setAllProducts] = useState([])
  const prevRef = useRef(null)
  const nextRef = useRef(null)

  const fetchData = () => {
    getProducts().then((data) => {
      if (!Array.isArray(data)) return
      setAllProducts(data)
    })
  }

  useEffect(() => {
    fetchData()
    const handler = () => fetchData()
    window.addEventListener('focus', handler)
    window.addEventListener('products_updated', handler)
    return () => {
      window.removeEventListener('focus', handler)
      window.removeEventListener('products_updated', handler)
    }
  }, [])

  const tabs = [...new Set(allProducts.map((p) => p.category))]

  // set first tab on initial load, and fix stale activeTab if category was renamed/deleted
  useEffect(() => {
    if (!tabs.length) return
    if (!activeTab || !tabs.includes(activeTab)) setActiveTab(tabs[0])
  }, [allProducts])

  const list = allProducts.filter((p) => p.category === activeTab)

  return (
    <Section className="bg-white py-0 overflow-hidden" aria-labelledby="lineup-heading">

      {/* Support banner */}
      <div className="border-b border-border py-6 text-center">
        <p className="font-heading font-bold text-heading text-body-lg mb-2">
          We provide a 24/7 customer support
        </p>
        <a
          href="tel:+923000442552"
          className="inline-flex items-center gap-2 text-body text-body-sm hover:text-heading transition-colors mb-3"
        >
          <Phone size={14} className="text-[#F4B400]" aria-hidden="true" />
          +92-300 0442552
        </a>
        <br />
        <a
          href="/projects"
          className="inline-flex items-center gap-1 text-[#F4B400] font-heading font-bold text-body-sm hover:underline"
        >
          Discover Range <ArrowRight size={13} />
        </a>
      </div>

      <Container className="py-12">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2
            id="lineup-heading"
            className="font-heading font-black text-heading uppercase tracking-[0.08em]"
            style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)' }}
          >
            PRODUCT LINE-UP
          </h2>
        </motion.div>

        {/* Tabs */}
        <div className="flex justify-center flex-wrap gap-0 mb-10">
          {tabs.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={[
                'relative px-10 py-3 font-heading font-bold text-body-sm tracking-wide transition-all duration-200 focus:outline-none',
                activeTab === cat
                  ? 'bg-[#F4B400] text-heading z-10'
                  : 'bg-white text-heading border border-border hover:border-[#F4B400]/50',
              ].join(' ')}
              style={{ clipPath: 'polygon(6% 0%, 100% 0%, 94% 100%, 0% 100%)' }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Slider */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
            className="relative"
          >
            <button
              ref={prevRef}
              aria-label="Previous products"
              className="absolute -left-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-border shadow-card hover:border-[#F4B400] hover:shadow-primary flex items-center justify-center transition-all duration-200 group"
            >
              <ChevronLeft size={18} className="text-body group-hover:text-[#F4B400] transition-colors" aria-hidden="true" />
            </button>

            <button
              ref={nextRef}
              aria-label="Next products"
              className="absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-border shadow-card hover:border-[#F4B400] hover:shadow-primary flex items-center justify-center transition-all duration-200 group"
            >
              <ChevronRight size={18} className="text-body group-hover:text-[#F4B400] transition-colors" aria-hidden="true" />
            </button>

            <Swiper
              modules={[Autoplay, Navigation]}
              navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
              onBeforeInit={(swiper) => {
                swiper.params.navigation.prevEl = prevRef.current
                swiper.params.navigation.nextEl = nextRef.current
              }}
              autoplay={{ delay: 3500, disableOnInteraction: false, pauseOnMouseEnter: true }}
              slidesPerView={1}
              spaceBetween={24}
              loop={list.length > 3}
              breakpoints={{
                640:  { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              className="px-1 py-2"
            >
              {list.map((product) => (
                <SwiperSlide key={product.id}>
                  <Link to={`/product/${product.id}`} className="group block">
                    <ProductCard product={product} />
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        </AnimatePresence>

      </Container>
    </Section>
  )
}

export default ProductLineupSection
