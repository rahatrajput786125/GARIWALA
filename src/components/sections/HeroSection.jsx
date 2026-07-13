import { useEffect, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, ArrowRight, Fuel, Zap, Settings2, Car } from 'lucide-react'
import { getProducts } from '@/utils/api'

const SPEC_ICONS = [<Zap size={13} />, <Settings2 size={13} />, <Fuel size={13} />, <Car size={13} />]

const panelVariants = {
  initial: { opacity: 0, x: 16 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
  exit:    { opacity: 0, x: -16, transition: { duration: 0.2 } },
}

const HeroSection = () => {
  const [products, setProducts] = useState([])
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    const fetch = () => getProducts().then((data) => {
      if (Array.isArray(data) && data.length) setProducts(data)
    })
    fetch()
    const handler = () => fetch()
    window.addEventListener('focus', handler)
    window.addEventListener('products_updated', handler)
    return () => {
      window.removeEventListener('focus', handler)
      window.removeEventListener('products_updated', handler)
    }
  }, [])

  /* auto-loop — depends on products.length so no stale closure */
  useEffect(() => {
    if (!products.length) return
    const t = setInterval(() => setIdx((c) => (c + 1) % products.length), 3000)
    return () => clearInterval(t)
  }, [products.length])

  const prev = useCallback(() => setIdx((c) => (c - 1 + products.length) % products.length), [products.length])
  const next = useCallback(() => setIdx((c) => (c + 1) % products.length), [products.length])

  if (!products.length) {
    return (
      <section className="w-full bg-[#111] flex items-center justify-center" style={{ paddingTop: '112px', minHeight: '500px' }}>
        <div className="w-10 h-10 border-4 border-[#F4B400] border-t-transparent rounded-full animate-spin" />
      </section>
    )
  }

  const p = products[idx]

  /* local paths (/gallery/...) are served by Vite from /public — use as-is */
  const imgSrc = p.image || ''

  return (
    <section className="w-full overflow-hidden bg-white" style={{ paddingTop: '112px' }} aria-labelledby="hero-heading">

      {/* ── SLIDE WRAPPER ── */}
      {/* Mobile: flex-col (image top, panel bottom) | Desktop: fixed height with absolute children */}
      <div className="flex flex-col lg:flex-row lg:h-[540px] xl:h-[580px]">

        {/* ── LEFT: Image ── */}
        <div className="relative w-full h-[260px] lg:h-full lg:flex-1 overflow-hidden bg-[#e8e8e8]">
          <AnimatePresence mode="wait">
            <motion.img
              key={p.id}
              src={imgSrc}
              alt={p.name}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.55 }}
              className="w-full h-full object-cover object-center"
              draggable={false}
            />
          </AnimatePresence>

          {/* right-side gradient blending into dark panel */}
          <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#111]/50 to-transparent hidden lg:block" />

          {/* category badge */}
          <div className="absolute top-4 left-4 z-10">
            <span className="bg-[#F4B400] text-heading text-[11px] font-heading font-black uppercase tracking-[0.15em] px-3 py-1.5 shadow-lg">
              {p.category}
            </span>
          </div>

          {/* watermark top-right */}
          <div className="absolute top-4 right-4 hidden lg:flex flex-col items-end z-10">
            <span className="font-heading font-black text-white text-xs uppercase tracking-widest drop-shadow-lg opacity-75">GARIWALA</span>
            <span className="font-heading font-bold text-white/50 text-[10px] uppercase tracking-[0.2em] drop-shadow-lg">AUTOMOBILES</span>
          </div>

          {/* PREV arrow */}
          <button onClick={prev} aria-label="Previous"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-14 bg-[#F4B400] hover:bg-[#e0a800] flex items-center justify-center transition-colors shadow-lg">
            <ChevronLeft size={20} className="text-heading" />
          </button>

          {/* NEXT arrow — mobile only (desktop arrow is at panel edge) */}
          <button onClick={next} aria-label="Next"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-14 bg-[#F4B400] hover:bg-[#e0a800] flex lg:hidden items-center justify-center transition-colors shadow-lg">
            <ChevronRight size={20} className="text-heading" />
          </button>

          {/* NEXT arrow — desktop: right edge of image, before panel */}
          <button onClick={next} aria-label="Next"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-14 bg-[#F4B400] hover:bg-[#e0a800] hidden lg:flex items-center justify-center transition-colors shadow-lg">
            <ChevronRight size={20} className="text-heading" />
          </button>
        </div>

        {/* ── RIGHT: Dark content panel ── */}
        <div className="relative w-full lg:w-[400px] xl:w-[440px] bg-[#111] flex-shrink-0 flex flex-col justify-center px-8 lg:px-10 py-8 overflow-hidden">

          {/* yellow top accent */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#F4B400]" />

          {/* subtle grid texture */}
          <div className="absolute inset-0 opacity-[0.03]"
            style={{ backgroundImage: 'repeating-linear-gradient(135deg,#F4B400 0,#F4B400 1px,transparent 1px,transparent 48px)' }} />

          <AnimatePresence mode="wait">
            <motion.div
              key={p.id}
              variants={panelVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="relative z-10 flex flex-col gap-4"
            >
              {/* product name */}
              <h1 id="hero-heading" className="font-heading font-black text-white leading-tight"
                style={{ fontSize: 'clamp(1.4rem, 2.4vw, 2rem)' }}>
                {p.name}
              </h1>

              {/* model */}
              <p className="font-heading font-semibold text-white/40 text-[11px] uppercase tracking-widest -mt-2">
                {p.model}
              </p>

              <div className="w-full h-px bg-white/10" />

              {/* type badge */}
              <div>
                <span className="bg-[#F4B400] text-heading font-heading font-black text-xs px-4 py-2 uppercase tracking-wide inline-block">
                  {p.type}
                </span>
              </div>

              {/* quick specs grid */}
              {p.specs?.length > 0 && (
                <div className="grid grid-cols-2 gap-2">
                  {p.specs.slice(0, 4).map((spec, i) => (
                    <div key={i} className="flex items-center gap-2 bg-white/5 rounded-lg px-3 py-2 min-w-0">
                      <span className="text-[#F4B400] flex-shrink-0">{SPEC_ICONS[i]}</span>
                      <span className="text-white/80 text-[11px] font-heading font-semibold leading-tight truncate">{spec}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* stock */}
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full flex-shrink-0 ${p.inStock ? 'bg-green-400' : 'bg-red-400'}`} />
                <span className="text-white/40 text-[11px] font-heading font-semibold uppercase tracking-wider">
                  {p.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>

              {/* CTA */}
              <Link to={`/product/${p.id}`}
                className="inline-flex items-center gap-2 bg-[#F4B400] hover:bg-[#e0a800] text-heading font-heading font-black text-sm px-6 py-3 transition-colors group w-fit">
                View Details
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </Link>

              {/* progress counter */}
              <div className="flex items-center gap-2 mt-1">
                <span className="font-heading font-black text-[#F4B400] text-sm tabular-nums">{String(idx + 1).padStart(2, '0')}</span>
                <div className="w-14 h-px bg-white/10 relative overflow-hidden">
                  <motion.div
                    key={idx}
                    className="absolute inset-y-0 left-0 bg-[#F4B400] h-full"
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 3, ease: 'linear' }}
                  />
                </div>
                <span className="font-heading text-white/25 text-sm tabular-nums">{String(products.length).padStart(2, '0')}</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ── TICKER BAR ── */}
      <div className="w-full bg-white border-t border-border flex items-stretch min-h-[56px]">
        <div className="shrink-0 flex items-center">
          <span className="h-full px-5 bg-[#F4B400] font-heading font-black text-heading text-sm uppercase tracking-wide flex items-center whitespace-nowrap">
            Our Fleet
          </span>
        </div>
        <div className="flex-1 flex items-center px-5 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.p key={idx}
              initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.35 }}
              className="font-heading font-bold text-heading text-sm truncate">
              {p.name.toUpperCase()}
              <span className="text-body font-normal"> — {p.type} · {p.specs?.[0] || p.category}</span>
            </motion.p>
          </AnimatePresence>
        </div>
        <div className="shrink-0 flex items-center pr-4">
          <Link to={`/product/${p.id}`}
            className="h-9 px-5 bg-[#F4B400] hover:bg-[#e0a800] font-heading font-black text-heading text-xs uppercase tracking-wide flex items-center transition-colors whitespace-nowrap">
            View Details
          </Link>
        </div>
      </div>

      {/* ── PAGINATION DOTS ── */}
      <div className="flex items-center justify-center gap-2 py-3 bg-white border-t border-border/40">
        {products.map((_, i) => (
          <button key={i} onClick={() => setIdx(i)} aria-label={`Slide ${i + 1}`}
            className={`rounded-full transition-all duration-300 ${i === idx ? 'w-7 h-2.5 bg-[#F4B400]' : 'w-2.5 h-2.5 bg-border hover:bg-[#F4B400]/50'}`} />
        ))}
      </div>
    </section>
  )
}

export default HeroSection
