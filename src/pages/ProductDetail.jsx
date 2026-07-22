import { useEffect, useState, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { ArrowLeft, ChevronLeft, ChevronRight, ChevronDown, FileText, MapPin, Download, Loader2 } from 'lucide-react'
import Container from '@/components/Container'
import { getProductById, getProducts } from '@/utils/api'
import { getProductSlug } from '@/utils/searchUtils'
import { API_BASE_URL } from '@/config/appConfig'
import jsPDF from 'jspdf'

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
  const [downloading, setDownloading] = useState(false)

  const THUMBS_VISIBLE = 5
  // Use images[] array directly; fallback to product.image if images is empty
  const allImages = product
    ? (product.images && product.images.length > 0
        ? product.images
        : [product.image]
      ).filter(Boolean)
    : []
  const maxGalleryStart = Math.max(allImages.length - THUMBS_VISIBLE, 0)
  const visibleThumbs = allImages.slice(galleryPage, galleryPage + THUMBS_VISIBLE)

  useEffect(() => {
    setLoading(true)
    setActiveImage(0)
    setGalleryPage(0)
    getProductById(id).then((data) => {
      if (data && data.id) {
        setProduct(data)
        getProducts().then((all) => {
          if (Array.isArray(all)) {
            const currentSlug = getProductSlug(data)
            const sameCategory = all.filter((p) => {
              const pSlug = getProductSlug(p)
              return pSlug !== currentSlug && p.category === data.category
            })
            setRelated(sameCategory.slice(0, 3))
          }
        })
      } else {
        setProduct(null)
      }
      setLoading(false)
    })
  }, [id])

  const handleDownloadBrochure = async () => {
    if (!product) return
    setDownloading(true)
    try {
      const PROXY = `${API_BASE_URL}/proxy-image?url=`

      // Fetch image → base64 via proxy
      const fetchB64 = async (url) => {
        try {
          const res = await fetch(PROXY + encodeURIComponent(url))
          if (!res.ok) return null
          const blob = await res.blob()
          return await new Promise((resolve) => {
            const r = new FileReader()
            r.onloadend = () => resolve(r.result)
            r.readAsDataURL(blob)
          })
        } catch { return null }
      }

      // Load base64 → HTMLImageElement
      const loadImg = (src) => new Promise((resolve) => {
        const img = new Image()
        img.onload = () => resolve(img)
        img.onerror = () => resolve(null)
        img.src = src
      })

      // Crop image to exact box (object-fit: cover) using offscreen canvas
      // boxWpx / boxHpx = target pixel dimensions on canvas
      const cropCover = (img, boxWpx, boxHpx) => {
        const c = document.createElement('canvas')
        c.width  = boxWpx
        c.height = boxHpx
        const ctx = c.getContext('2d')
        const srcAspect = img.naturalWidth / img.naturalHeight
        const boxAspect = boxWpx / boxHpx
        let sx = 0, sy = 0, sw = img.naturalWidth, sh = img.naturalHeight
        if (srcAspect > boxAspect) {
          // image wider than box → crop sides
          sw = img.naturalHeight * boxAspect
          sx = (img.naturalWidth - sw) / 2
        } else {
          // image taller than box → crop top/bottom
          sh = img.naturalWidth / boxAspect
          sy = (img.naturalHeight - sh) / 2
        }
        ctx.drawImage(img, sx, sy, sw, sh, 0, 0, boxWpx, boxHpx)
        return c.toDataURL('image/jpeg', 0.92)
      }

      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
      const PW = 210
      const PH = 297
      const ML = 14
      const MR = 14
      const CW = PW - ML - MR   // 182mm
      const FOOTER_H = 10
      const SAFE_BOTTOM = PH - FOOTER_H - 4  // last safe Y before footer
      let y = 0

      // Add new page and reset y to top margin
      const newPage = () => {
        drawFooter(pdf.internal.getNumberOfPages())
        pdf.addPage()
        y = 14
      }

      // Ensure `needed` mm fits before footer; if not, new page
      const need = (needed) => { if (y + needed > SAFE_BOTTOM) newPage() }

      // Draw footer for a specific page (called before addPage)
      const drawFooter = (pageNum) => {
        pdf.setPage(pageNum)
        pdf.setFillColor(17, 17, 17)
        pdf.rect(0, PH - FOOTER_H, PW, FOOTER_H, 'F')
        pdf.setFont('helvetica', 'bold')
        pdf.setFontSize(7)
        pdf.setTextColor(244, 180, 0)
        pdf.text('GARIWALA AUTOMOBILES', ML, PH - 3.5)
        pdf.setFont('helvetica', 'normal')
        pdf.setTextColor(150, 150, 150)
        pdf.text('info@gariwala.com  ·  0313-2553864  ·  gariwala.com', PW / 2, PH - 3.5, { align: 'center' })
      }

      // ── HEADER (yellow bar) ──
      pdf.setFillColor(244, 180, 0)
      pdf.rect(0, 0, PW, 22, 'F')
      pdf.setFont('helvetica', 'bold')
      pdf.setFontSize(14)
      pdf.setTextColor(17, 17, 17)
      pdf.text('GARIWALA AUTOMOBILES', ML, 10)
      pdf.setFont('helvetica', 'normal')
      pdf.setFontSize(7)
      pdf.setTextColor(60, 60, 60)
      pdf.text('New M. A. Jinnah Rd, Karachi, 74400  ·  0313-2553864  ·  info@gariwala.com', ML, 16)
      const dateStr = new Date().toLocaleDateString('en-PK', { year: 'numeric', month: 'long', day: 'numeric' })
      pdf.setFontSize(7)
      pdf.text('Product Brochure  ·  ' + dateStr, PW - MR, 10, { align: 'right' })
      y = 26

      // ── HERO IMAGE ──
      const heroUrl = allImages[0] || product.image
      const heroB64 = await fetchB64(heroUrl)
      if (heroB64) {
        const heroImg = await loadImg(heroB64)
        if (heroImg) {
          // Fixed hero box: full content width, 16:9 ratio
          const heroBoxW = Math.round(CW * 3.7795)   // mm → px at 96dpi
          const heroBoxH = Math.round(heroBoxW * 9 / 16)
          const heroMM_H = CW * 9 / 16               // height in mm
          const cropped = cropCover(heroImg, heroBoxW, heroBoxH)
          pdf.addImage(cropped, 'JPEG', ML, y, CW, heroMM_H)
          // Dark gradient overlay
          pdf.setFillColor(0, 0, 0)
          pdf.setGState(new pdf.GState({ opacity: 0.45 }))
          pdf.rect(ML, y + heroMM_H - 28, CW, 28, 'F')
          pdf.setGState(new pdf.GState({ opacity: 1 }))
          pdf.setFont('helvetica', 'bold')
          pdf.setFontSize(18)
          pdf.setTextColor(255, 255, 255)
          pdf.text(product.name, ML + 4, y + heroMM_H - 14)
          pdf.setFont('helvetica', 'normal')
          pdf.setFontSize(9)
          pdf.setTextColor(200, 200, 200)
          pdf.text(`${product.model || ''}  ·  ${product.type || ''}`, ML + 4, y + heroMM_H - 6)
          y += heroMM_H + 8
        }
      } else {
        pdf.setFont('helvetica', 'bold')
        pdf.setFontSize(20)
        pdf.setTextColor(17, 17, 17)
        pdf.text(product.name, ML, y + 10)
        y += 18
      }

      // ── OVERVIEW ──
      if (product.overview) {
        need(20)
        pdf.setDrawColor(244, 180, 0)
        pdf.setLineWidth(0.8)
        pdf.line(ML, y, ML, y + 4)
        pdf.setFont('helvetica', 'bold')
        pdf.setFontSize(8)
        pdf.setTextColor(244, 180, 0)
        pdf.text('OVERVIEW', ML + 3, y + 3)
        y += 7
        pdf.setFont('helvetica', 'normal')
        pdf.setFontSize(9)
        pdf.setTextColor(55, 65, 81)
        const lines = pdf.splitTextToSize(product.overview, CW)
        lines.forEach((line) => {
          need(5)
          pdf.text(line, ML, y)
          y += 4.5
        })
        y += 4
      }

      // ── QUICK SPECS BADGES ──
      if (product.specs?.length > 0) {
        need(14)
        pdf.setFillColor(249, 250, 251)
        pdf.rect(ML, y, CW, 12, 'F')
        let bx = ML + 3
        product.specs.forEach((spec) => {
          const tw = pdf.getTextWidth(spec) + 6
          if (bx + tw > PW - MR - 3) return
          pdf.setFillColor(244, 180, 0)
          pdf.rect(bx, y + 2, tw, 8, 'F')
          pdf.setFont('helvetica', 'bold')
          pdf.setFontSize(7)
          pdf.setTextColor(17, 17, 17)
          pdf.text(spec, bx + 3, y + 7.5)
          bx += tw + 4
        })
        y += 16
      }

      // ── TECHNICAL SPECIFICATIONS ──
      if (product.specGroups?.length > 0) {
        need(16)
        pdf.setFont('helvetica', 'bold')
        pdf.setFontSize(8)
        pdf.setTextColor(244, 180, 0)
        pdf.text('TECHNICAL SPECIFICATIONS', ML, y)
        pdf.setDrawColor(244, 180, 0)
        pdf.setLineWidth(0.4)
        pdf.line(ML, y + 1.5, PW - MR, y + 1.5)
        y += 7

        const colW = (CW - 6) / 2
        const ROW_H = 5.5
        const GROUP_LABEL_H = 7

        // Lay out groups in 2 columns, tracking each column's Y independently
        // When a column overflows the page, start a new page and reset both cols
        let colY = [y, y]
        let col = 0

        const flushPage = () => {
          drawFooter(pdf.internal.getNumberOfPages())
          pdf.addPage()
          y = 14
          colY = [y, y]
          col = 0
        }

        product.specGroups.forEach((group) => {
          const groupH = GROUP_LABEL_H + group.items.length * ROW_H + 4
          const cx = col === 0 ? ML : ML + colW + 6
          let gy = colY[col]

          // If this group doesn't fit in current column
          if (gy + groupH > SAFE_BOTTOM) {
            if (col === 0) {
              // Try right column
              col = 1
              gy = colY[1]
              if (gy + groupH > SAFE_BOTTOM) flushPage()
            } else {
              flushPage()
            }
          }

          const finalCx = col === 0 ? ML : ML + colW + 6
          gy = colY[col]

          // Group header bar
          pdf.setFillColor(244, 180, 0)
          pdf.rect(finalCx, gy, colW, 6, 'F')
          pdf.setFont('helvetica', 'bold')
          pdf.setFontSize(7)
          pdf.setTextColor(17, 17, 17)
          pdf.text(group.label.toUpperCase(), finalCx + 2, gy + 4.2)
          gy += GROUP_LABEL_H

          // Rows
          group.items.forEach((item, ii) => {
            if (ii % 2 === 0) {
              pdf.setFillColor(249, 250, 251)
              pdf.rect(finalCx, gy - 1, colW, ROW_H, 'F')
            }
            pdf.setFont('helvetica', 'normal')
            pdf.setFontSize(7.5)
            pdf.setTextColor(107, 114, 128)
            pdf.text(item.label, finalCx + 2, gy + 3)
            pdf.setFont('helvetica', 'bold')
            pdf.setTextColor(17, 17, 17)
            pdf.text(String(item.value), finalCx + colW - 2, gy + 3, { align: 'right' })
            gy += ROW_H
          })

          gy += 4
          colY[col] = gy
          col = col === 0 ? 1 : 0  // alternate columns
        })

        y = Math.max(colY[0], colY[1]) + 6
      }

      // ── GALLERY ──
      if (allImages.length > 0) {
        need(20)
        pdf.setFont('helvetica', 'bold')
        pdf.setFontSize(8)
        pdf.setTextColor(244, 180, 0)
        pdf.text('PRODUCT GALLERY', ML, y)
        pdf.setDrawColor(244, 180, 0)
        pdf.setLineWidth(0.4)
        pdf.line(ML, y + 1.5, PW - MR, y + 1.5)
        y += 7

        const COLS = 3
        const GAP = 3
        const imgW = (CW - GAP * (COLS - 1)) / COLS   // ~57.3mm
        const imgH = Math.round(imgW * 2 / 3 * 10) / 10  // 3:2 ratio ~38.2mm
        const PX_W = 480
        const PX_H = Math.round(PX_W * 2 / 3)           // 320px

        // Fetch + crop all gallery images in parallel
        const galleryImgs = await Promise.all(
          allImages.map(async (url) => {
            const b64 = await fetchB64(url)
            if (!b64) return null
            const img = await loadImg(b64)
            return img ? cropCover(img, PX_W, PX_H) : null
          })
        )

        for (let i = 0; i < galleryImgs.length; i++) {
          const col = i % COLS

          // Start of a new row
          if (col === 0) {
            need(imgH + 4)   // ensure full row fits before drawing anything
          }

          const gx = ML + col * (imgW + GAP)
          const cropped = galleryImgs[i]

          if (cropped) {
            pdf.addImage(cropped, 'JPEG', gx, y, imgW, imgH)
          } else {
            pdf.setFillColor(240, 240, 240)
            pdf.rect(gx, y, imgW, imgH, 'F')
          }

          // Number badge
          pdf.setFillColor(244, 180, 0)
          pdf.rect(gx, y + imgH - 5, 10, 5, 'F')
          pdf.setFont('helvetica', 'bold')
          pdf.setFontSize(6)
          pdf.setTextColor(17, 17, 17)
          pdf.text(`${i + 1}`, gx + 5, y + imgH - 1.5, { align: 'center' })

          // Advance Y only after completing a full row (or last image)
          const isLastInRow = col === COLS - 1
          const isLastImage = i === galleryImgs.length - 1
          if (isLastInRow || isLastImage) {
            y += imgH + GAP
          }
        }
        y += 6
      }

      // ── FOOTER on all pages ──
      const totalPages = pdf.internal.getNumberOfPages()
      for (let p = 1; p <= totalPages; p++) {
        drawFooter(p)
        pdf.setPage(p)
        pdf.setFont('helvetica', 'normal')
        pdf.setFontSize(7)
        pdf.setTextColor(150, 150, 150)
        pdf.text(`Page ${p} of ${totalPages}`, PW - MR, PH - 3.5, { align: 'right' })
      }

      pdf.save(`${product.name.replace(/\s+/g, '-')}-Brochure.pdf`)
    } catch (e) {
      console.error('PDF error:', e)
    } finally {
      setDownloading(false)
    }
  }

  // Auto-scroll main image every 3 seconds
  useEffect(() => {
    if (!allImages.length) return
    const timer = setInterval(() => {
      setActiveImage((c) => (c + 1) % allImages.length)
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
                  src={allImages[activeImage] || product.image}
                  alt={`${product.name} ${activeImage + 1}`}
                  className="w-full h-[420px] lg:h-[500px] object-cover transition-opacity duration-700"
                />
                {/* Arrows */}
                <button
                  type="button"
                  aria-label="Previous"
                  onClick={() => setActiveImage((c) => (c === 0 ? allImages.length - 1 : c - 1))}
                  className="absolute left-4 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full bg-white/90 border border-white/30 flex items-center justify-center shadow hover:bg-white transition"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  type="button"
                  aria-label="Next"
                  onClick={() => setActiveImage((c) => (c + 1) % allImages.length)}
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
                  onClick={handleDownloadBrochure}
                  disabled={downloading}
                  className="flex items-center gap-2 border border-border text-heading font-heading font-semibold text-body-sm px-6 py-3 hover:border-[#F4B400] transition disabled:opacity-60"
                >
                  {downloading ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
                  {downloading ? 'Generating...' : 'Download Brochure'}
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
