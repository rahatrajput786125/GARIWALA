import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion, AnimatePresence } from 'framer-motion'
import Section from '@/components/Section'
import Container from '@/components/Container'
import Heading from '@/components/Heading'
import CtaSection from '@/components/sections/CtaSection'
import { getProducts } from '@/utils/api'
import { SITE_NAME } from '@/constants'
import { searchProducts, getProductSlug } from '@/utils/searchUtils'
import { ArrowRight } from 'lucide-react'

const Gallery = () => {
  const location = useLocation()
  const [active, setActive] = useState('All')
  const [galleryItems, setGalleryItems] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()

  const fetchItems = () => {
    getProducts().then((products) => {
      if (!Array.isArray(products)) return
      const items = products.map((product) => ({
        id: product.id,
        productId: product.id,
        image: product.image,
        name: product.name,
        category: product.category,
        type: product.type,
        createdAt: product.createdAt || product.created_at || product.updatedAt || product.updated_at || '',
      }))
      setGalleryItems(items)
    })
  }

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const queryFromUrl = params.get('search') || ''
    setSearchQuery(queryFromUrl)
    fetchItems()
    const handler = () => fetchItems()
    window.addEventListener('focus', handler)
    window.addEventListener('products_updated', handler)
    return () => {
      window.removeEventListener('focus', handler)
      window.removeEventListener('products_updated', handler)
    }
  }, [location.search])

  const categories = ['All', ...new Set(galleryItems.flatMap((g) => [g.category, g.type]))]

  // reset active filter if it no longer exists in fetched data
  useEffect(() => {
    if (active !== 'All' && !categories.includes(active)) setActive('All')
  }, [galleryItems, categories, active])

  const baseFiltered = active === 'All'
    ? galleryItems
    : galleryItems.filter((g) => g.category === active || g.type === active)
  const filtered = searchProducts(baseFiltered, searchQuery)

  return (
    <>
      <Helmet>
        <title>Gallery — {SITE_NAME}</title>
        <meta name="description" content="Browse Gariwala Automobiles' full vehicle gallery." />
      </Helmet>

      <Section surface navOffset>
        <Container>
          <div className="max-w-2xl mb-10">
            <span className="eyebrow mb-4 block">Visual Portfolio</span>
            <Heading as="h1" className="mb-4">
              Our <span className="text-gradient">Gallery</span>
            </Heading>
            <p className="text-body-xl text-body leading-relaxed">
              {searchQuery
                ? `Showing products related to “${searchQuery}”. Exact matches appear first, then similar results.`
                : 'Explore our complete lineup of cars. Click any image to view full product details.'}
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
          <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <AnimatePresence mode="popLayout">
              {filtered.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  onClick={() => navigate(`/product/${getProductSlug(item)}`)}
                  className="group relative aspect-[4/3] overflow-hidden rounded-xl cursor-pointer border border-border hover:border-[#F4B400] transition-all duration-300"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <span className="inline-block bg-[#F4B400] text-heading font-heading font-bold text-[10px] uppercase tracking-wider px-2.5 py-1 mb-1.5">
                      {item.type}
                    </span>
                    <p className="text-white font-heading font-bold text-body-sm leading-tight">{item.name}</p>
                    <p className="text-white/70 text-[11px] mt-1 flex items-center gap-1">
                      View Details <ArrowRight size={10} />
                    </p>
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

export default Gallery
