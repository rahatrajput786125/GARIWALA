import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { ArrowLeft, ChevronLeft, ChevronRight, ChevronDown, FileText, MapPin, Download } from 'lucide-react'
import Container from '@/components/Container'
import { getProductById, getProducts } from '@/utils/api'

/* ── Accordion row ── */
const SpecGroup = ({ group, defaultOpen }) => {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border-b border-border last:border-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between py-3 px-4 hover:bg-surface transition-colors"
      >
        <span className="font-heading font-bold text-heading text-body-sm">{group.label}</span>
        <ChevronDown size={16} className={`text-body transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="px-4 pb-3">
          <table className="w-full text-body-sm">
            <tbody>
              {group.items.map((item) => (
                <tr key={item.label} className="border-b border-border/50 last:border-0">
                  <td className="py-2 text-body w-1/2">{item.label}</td>
                  <td className="py-2 text-heading font-semibold text-right">{item.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

const ProductDetail = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [related, setRelated] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeImage, setActiveImage] = useState(0)
  const [galleryPage, setGalleryPage] = useState(0)

  const THUMBS_VISIBLE = 5
  const maxGalleryStart = Math.max((product?.images?.length || 0) - THUMBS_VISIBLE, 0)
  const visibleThumbs = product?.images?.slice(galleryPage, galleryPage + THUMBS_VISIBLE) || []

  useEffect(() => {
    setLoading(true)
    setActiveImage(0)
    setGalleryPage(0)
    getProductById(id).then((data) => {
      if (data && data.id) {
        setProduct(data)
        // fetch related from same category
        getProducts().then((all) => {
          if (Array.isArray(all))
            setRelated(all.filter((p) => p.id !== id && p.category === data.category).slice(0, 3))
        })
      } else {
        setProduct(null)
      }
      setLoading(false)
    })
  }, [id])

  // Auto-scroll main image every 3 seconds
  useEffect(() => {
    if (!product?.images?.length) return
    const timer = setInterval(() => {
      setActiveImage((c) => (c + 1) % product.images.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [product])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-[112px]">
        <div className="w-10 h-10 border-4 border-[#F4B400] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 pt-[112px]">
        <h1 className="font-heading font-black text-heading text-3xl">Product Not Found</h1>
        <Link to="/" className="bg-[#F4B400] text-heading font-heading font-bold px-6 py-3">Back to Home</Link>
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <title>{product.name} — Gariwala Automobiles</title>
        <meta name="description" content={`${product.name} — ${product.category} by Gariwala Automobiles`} />
      </Helmet>

      <main className="bg-white min-h-screen" style={{ paddingTop: '112px' }}>

        {/* Breadcrumb */}
        <div className="border-b border-border bg-surface">
          <Container className="py-3">
            <div className="flex items-center gap-2 text-body-xs text-body font-heading">
              <Link to="/" className="hover:text-[#F4B400] transition-colors">Home</Link>
              <span>›</span>
              <Link to="/" className="hover:text-[#F4B400] transition-colors">Products</Link>
              <span>›</span>
              <span className="text-[#F4B400] font-semibold">{product.name}</span>
            </div>
          </Container>
        </div>

        <Container className="py-10">

          {/* ── Two column: Left info + Right image ── */}
          <div className="flex flex-col lg:flex-row lg:items-stretch gap-10">

            {/* LEFT */}
            <div className="lg:w-[38%] flex flex-col gap-4 lg:h-full">
              <Link to="/" className="inline-flex items-center gap-1.5 text-body-sm text-body hover:text-[#F4B400] transition-colors font-heading font-semibold">
                <ArrowLeft size={15} /> Back to Products
              </Link>

              {/* Name + model */}
              <div>
                <h1 className="font-heading font-black text-heading" style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)' }}>
                  {product.name}
                </h1>
                <p className="text-body text-body-sm mt-1 font-heading font-semibold">{product.model}</p>
              </div>

              {/* Description */}
              <p className="text-body text-body-sm leading-relaxed">{product.overview}</p>

              {/* Badges */}
              <div className="flex items-center gap-3 flex-wrap">
                <span className="bg-[#F4B400] text-heading font-heading font-bold text-body-xs px-4 py-1.5 uppercase tracking-wide">
                  {product.type}
                </span>
                {product.inStock && (
                  <span className="border border-border text-heading font-heading font-semibold text-body-xs px-4 py-1.5">
                    In Stock
                  </span>
                )}
              </div>

              {/* Spec accordion */}
              <div className="border border-border rounded-xl overflow-hidden mt-2 flex-1 overflow-y-auto" style={{ maxHeight: '420px' }}>
                {product.specGroups.map((group, i) => (
                  <SpecGroup key={group.label} group={group} defaultOpen={i === 0} />
                ))}
              </div>
            </div>

            {/* RIGHT */}
            <div className="lg:w-[62%] flex flex-col gap-4">

              {/* Main image */}
              <div className="relative overflow-hidden rounded-2xl border border-border bg-surface">
                <img
                  src={product.images[activeImage]}
                  alt={`${product.name} ${activeImage + 1}`}
                  className="w-full h-[420px] lg:h-[500px] object-cover transition-opacity duration-700"
                />
                {/* Arrows */}
                <button
                  type="button"
                  aria-label="Previous"
                  onClick={() => setActiveImage((c) => (c === 0 ? product.images.length - 1 : c - 1))}
                  className="absolute left-4 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full bg-white/90 border border-white/30 flex items-center justify-center shadow hover:bg-white transition"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  type="button"
                  aria-label="Next"
                  onClick={() => setActiveImage((c) => (c + 1) % product.images.length)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full bg-white/90 border border-white/30 flex items-center justify-center shadow hover:bg-white transition"
                >
                  <ChevronRight size={18} />
                </button>
              </div>

          

              {/* CTA buttons */}
              <div className="flex flex-wrap gap-3 mt-2">
                <Link
                  to="/contact"
                  className="flex items-center gap-2 bg-[#F4B400] text-heading font-heading font-bold text-body-sm px-6 py-3 hover:bg-[#e0a500] transition"
                >
                  <FileText size={16} /> Request Quote
                </Link>
                <Link
                  to="/contact"
                  className="flex items-center gap-2 border border-border text-heading font-heading font-semibold text-body-sm px-6 py-3 hover:border-[#F4B400] transition"
                >
                  <MapPin size={16} /> Find Dealer
                </Link>
                <button
                  type="button"
                  className="flex items-center gap-2 border border-border text-heading font-heading font-semibold text-body-sm px-6 py-3 hover:border-[#F4B400] transition"
                >
                  <Download size={16} /> Download Brochure
                </button>
              </div>
            </div>
          </div>

          {/* ── Product Gallery (full width) ── */}
          <div className="mt-14">
            <div className="mb-6">
              <h2 className="font-heading font-black text-heading text-2xl">Product Gallery</h2>
              <div className="w-12 h-1 bg-[#F4B400] mt-2" />
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setGalleryPage((p) => Math.max(p - 1, 0))}
                disabled={galleryPage === 0}
                className="flex-shrink-0 h-11 w-11 rounded-full bg-white border border-border shadow flex items-center justify-center hover:border-[#F4B400] disabled:opacity-30 transition"
              >
                <ChevronLeft size={18} />
              </button>
              <div className="flex-1 grid grid-cols-5 gap-4">
                {visibleThumbs.map((img, i) => {
                  const idx = galleryPage + i
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => { setActiveImage(idx); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                      className={`overflow-hidden rounded-xl border-2 transition ${idx === activeImage ? 'border-[#F4B400]' : 'border-border hover:border-[#F4B400]/60'}`}
                    >
                      <img src={img} alt={`gallery ${idx + 1}`} className="h-40 w-full object-cover hover:scale-105 transition-transform duration-300" />
                    </button>
                  )
                })}
              </div>
              <button
                type="button"
                onClick={() => setGalleryPage((p) => Math.min(p + 1, maxGalleryStart))}
                disabled={galleryPage >= maxGalleryStart}
                className="flex-shrink-0 h-11 w-11 rounded-full bg-white border border-border shadow flex items-center justify-center hover:border-[#F4B400] disabled:opacity-30 transition"
              >
                <ChevronRight size={18} />
              </button>
            </div>
            {/* Dot pagination */}
            {maxGalleryStart > 0 && (
              <div className="flex justify-center gap-2 mt-5">
                {Array.from({ length: maxGalleryStart + 1 }).map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setGalleryPage(i)}
                    className={`h-2.5 w-2.5 rounded-full transition ${i === galleryPage ? 'bg-[#F4B400]' : 'bg-border hover:bg-[#F4B400]/50'}`}
                    aria-label={`Gallery position ${i + 1}`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* ── Related Vehicles ── */}
          {related.length > 0 && (
            <div className="mt-14">
              <div className="mb-6">
                <h2 className="font-heading font-black text-heading text-2xl">Related Vehicles</h2>
                <div className="w-12 h-1 bg-[#F4B400] mt-2" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {related.map((p) => (
                  <div key={p.id} className="border border-border rounded-xl overflow-hidden hover:border-[#F4B400]/50 transition">
                    <img src={p.image} alt={p.name} className="w-full h-48 object-cover" />
                    <div className="p-5">
                      <p className="text-[#F4B400] font-heading font-bold text-body-sm uppercase tracking-wide mb-1">{p.name}</p>
                      <p className="text-body text-body-xs mb-3">{p.type}</p>
                      <div className="space-y-1 mb-4">
                        {p.specGroups[0]?.items.slice(0, 3).map((item) => (
                          <div key={item.label} className="flex items-center gap-2 text-body-xs text-body">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#F4B400] flex-shrink-0" />
                            {item.label}: <span className="font-semibold text-heading ml-1">{item.value}</span>
                          </div>
                        ))}
                      </div>
                      <Link
                        to={`/product/${p.id}`}
                        className="inline-block border border-[#F4B400] text-[#F4B400] font-heading font-bold text-body-xs px-5 py-2 hover:bg-[#F4B400] hover:text-heading transition"
                      >
                        Learn More
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── Bottom CTA banner ── */}
          <div className="mt-14 bg-[#1a1a1a] rounded-2xl px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full border-2 border-[#F4B400] flex items-center justify-center flex-shrink-0">
                <span className="text-[#F4B400] text-xl">?</span>
              </div>
              <div>
                <p className="font-heading font-black text-white text-lg">Need more information?</p>
                <p className="text-white/60 text-body-sm">Our team is here to help you choose the right vehicle for your business.</p>
              </div>
            </div>
            <Link
              to="/contact"
              className="flex items-center gap-2 bg-transparent border-2 border-[#F4B400] text-[#F4B400] font-heading font-bold px-7 py-3 hover:bg-[#F4B400] hover:text-heading transition whitespace-nowrap"
            >
              Contact Us Now <ChevronRight size={16} />
            </Link>
          </div>

        </Container>
      </main>
    </>
  )
}

export default ProductDetail
