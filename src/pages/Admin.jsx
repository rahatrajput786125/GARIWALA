import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Plus, Pencil, Trash2, LogOut, Truck, X, Loader2, ChevronDown, ChevronUp, Image, Save, Upload } from 'lucide-react'
import { getProducts, createProduct, updateProduct, deleteProduct, uploadImage } from '@/utils/api'
import { SITE_NAME } from '@/constants'
import BrandIcon from '@/components/BrandIcon'

/* ── Slug generator ── */
const toSlug = (str) =>
  str.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')

/* ── All car types ── */
const ALL_TYPES = [
  'Sedan', 'SUV', 'Hatchback', 'Double Cabin', 'Single Cabin',
  'Crossover', 'Coupe', 'Convertible', 'Minivan', 'MPV',
  'Pickup Truck', 'Van', 'Wagon', 'Electric', 'Hybrid',
  'Luxury Sedan', 'Sports Car', 'Off-Road', 'Compact SUV', 'Full-Size SUV',
]

/* ── Empty product template ── */
const emptyProduct = () => ({
  id: '', name: '', model: '', type: '', category: 'Cars', // id is auto-generated
  inStock: true, image: '', overview: '',
  specs: ['', '', '', ''],
  images: [''],  // starts with 1, grows dynamically
  specGroups: [
    { label: 'Engine',       items: [{ label: '', value: '' }] },
    { label: 'Transmission', items: [{ label: '', value: '' }] },
    { label: 'Suspension',   items: [{ label: '', value: '' }] },
    { label: 'Brakes',       items: [{ label: '', value: '' }] },
    { label: 'Tyres',        items: [{ label: '', value: '' }] },
    { label: 'Dimensions',   items: [{ label: '', value: '' }] },
    { label: 'Capacity',     items: [{ label: '', value: '' }] },
    { label: 'Performance',  items: [{ label: '', value: '' }] },
    { label: 'Warranty',     items: [{ label: '', value: '' }] },
  ],
})

/* ── Input component ── */
const Field = ({ label, children }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs font-heading font-semibold text-white/50 uppercase tracking-wider">{label}</label>
    {children}
  </div>
)

const inp = 'bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm placeholder:text-white/20 outline-none focus:border-[#F4B400] transition-colors w-full'

/* ── Type Selector — single select, searchable, auto-close ── */
const TypeSelector = ({ value, onChange }) => {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')

  const filtered = ALL_TYPES.filter((t) =>
    t.toLowerCase().includes(search.toLowerCase())
  )

  const select = (type) => {
    onChange(type)
    setOpen(false)
    setSearch('')
  }

  return (
    <Field label="Type">
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className={`${inp} text-left flex items-center justify-between`}
        >
          <span className={value ? 'text-white' : 'text-white/20'}>
            {value || 'Select a type...'}
          </span>
          <ChevronDown size={14} className="text-white/30 flex-shrink-0 ml-2" />
        </button>

        {open && (
          <div className="absolute z-50 top-full left-0 right-0 mt-1 bg-[#1a1a1a] border border-white/20 rounded-xl overflow-hidden shadow-2xl">
            <div className="p-2 border-b border-white/10">
              <input
                autoFocus
                className={`${inp} text-sm`}
                placeholder="Search type..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="max-h-52 overflow-y-auto">
              {filtered.length === 0 ? (
                <p className="text-white/30 text-xs text-center py-4">No match</p>
              ) : (
                filtered.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => select(type)}
                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                      value === type
                        ? 'bg-[#F4B400]/10 text-[#F4B400] font-semibold'
                        : 'text-white/80 hover:bg-white/5'
                    }`}
                  >
                    {type}
                  </button>
                ))
              )}
            </div>
            {value && (
              <div className="p-2 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => { onChange(''); setOpen(false) }}
                  className="text-xs text-red-400/70 hover:text-red-400 font-heading font-semibold"
                >
                  Clear
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </Field>
  )
}

/* ── Image Input with upload option ── */
const ImageField = ({ label, value, onChange, required }) => {
  const [uploading, setUploading] = useState(false)

  const handleFile = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    const res = await uploadImage(file)
    if (res.url) onChange(res.url)
    setUploading(false)
  }

  return (
    <Field label={label}>
      <div className="flex gap-2">
        <input className={inp} placeholder="https://... or upload →" value={value} onChange={(e) => onChange(e.target.value)} required={required} />
        <label className="flex-shrink-0 flex items-center gap-1.5 cursor-pointer bg-white/5 border border-white/10 hover:border-[#F4B400] text-white/50 hover:text-[#F4B400] text-xs font-heading font-semibold px-3 rounded-lg transition-colors whitespace-nowrap">
          {uploading ? <Loader2 size={13} className="animate-spin" /> : <Upload size={13} />}
          {uploading ? '' : 'Upload'}
          <input type="file" accept="image/*" className="hidden" onChange={handleFile} disabled={uploading} />
        </label>
      </div>
      {value && <img src={value} alt="preview" className="mt-2 h-28 w-full object-cover rounded-lg border border-white/10" onError={(e) => e.target.style.display='none'} />}
    </Field>
  )
}

/* ── Product Form Modal ── */
const ProductForm = ({ initial, onSave, onClose, saving, existingSlugs }) => {
  const [form, setForm] = useState(initial || emptyProduct())
  const [openGroup, setOpenGroup] = useState(0)

  useEffect(() => {
    if (!initial) {
      setForm(emptyProduct())
      return
    }

    setForm({
      ...emptyProduct(),
      ...initial,
      specs: Array.from({ length: 4 }, (_, i) => initial.specs?.[i] || ''),
      images: (() => {
        const existing = initial.images?.filter(Boolean) || []
        return [...existing, ''] // one empty at end for adding more
      })(),
      specGroups: Array.isArray(initial.specGroups) && initial.specGroups.length > 0
        ? initial.specGroups
        : emptyProduct().specGroups,
    })
  }, [initial])

  const [slugError, setSlugError] = useState('')

  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }))

  /* Auto-generate slug — append suffix if duplicate */
  const handleNameChange = (name) => {
    const base = toSlug(name)
    const otherSlugs = existingSlugs.filter((s) => s !== initial?.id)
    let slug = base
    let counter = 2
    while (otherSlugs.includes(slug)) {
      slug = `${base}-${counter}`
      counter++
    }
    setSlugError('')
    setForm((f) => ({ ...f, name, id: slug }))
  }

  const setSpec = (i, val) => {
    const arr = [...form.specs]; arr[i] = val; set('specs', arr)
  }
  const setImage = (i, val) => {
    const arr = [...form.images]
    arr[i] = val
    // if last field is now filled, append a new empty one
    const allFilled = arr.every((v) => v.trim() !== '')
    if (allFilled) arr.push('')
    set('images', arr)
  }

  const removeImage = (i) => {
    const arr = form.images.filter((_, idx) => idx !== i)
    // always keep at least one empty slot
    if (arr.length === 0 || arr.every((v) => v.trim() !== '')) arr.push('')
    set('images', arr)
  }
  const setGroupItem = (gi, ii, key, val) => {
    const groups = form.specGroups.map((g, gIdx) => {
      if (gIdx !== gi) return g
      return { ...g, items: g.items.map((item, iIdx) => iIdx === ii ? { ...item, [key]: val } : item) }
    })
    set('specGroups', groups)
  }
  const addGroupItem = (gi) => {
    const groups = form.specGroups.map((g, gIdx) =>
      gIdx === gi ? { ...g, items: [...g.items, { label: '', value: '' }] } : g
    )
    set('specGroups', groups)
  }
  const removeGroupItem = (gi, ii) => {
    const groups = form.specGroups.map((g, gIdx) =>
      gIdx === gi ? { ...g, items: g.items.filter((_, iIdx) => iIdx !== ii) } : g
    )
    set('specGroups', groups)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (slugError) return
    const cleaned = {
      ...form,
      specs:  form.specs.filter(Boolean),
      images: form.images.filter(Boolean),
      specGroups: form.specGroups.map((g) => ({
        ...g, items: g.items.filter((i) => i.label && i.value),
      })).filter((g) => g.items.length > 0),
    }
    onSave(cleaned)
  }


  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-start justify-center overflow-y-auto py-8 px-4">
      <div className="w-full max-w-3xl bg-[#1a1a1a] border border-white/10 rounded-2xl overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#111]">
          <h2 className="font-heading font-black text-white text-lg">
            {initial ? 'Edit Product' : 'Add New Product'}
          </h2>
          <button onClick={onClose} className="text-white/40 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-6">

          {/* Basic Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Name">
              <input
                className={inp}
                placeholder="Toyota Hilux Revo"
                value={form.name}
                onChange={(e) => handleNameChange(e.target.value)}
                required
              />
            </Field>
            <Field label="Auto Slug">
              <div className="flex items-center gap-2">
                <input className={`${inp} opacity-50 cursor-not-allowed`} value={form.id} readOnly />
              </div>
              {slugError && <p className="text-red-400 text-xs mt-1">{slugError}</p>}
            </Field>
            <Field label="Model Code">
              <input className={inp} placeholder="ZRE172-AEXNKW" value={form.model} onChange={(e) => set('model', e.target.value)} required />
            </Field>
            <Field label="Category">
              <input className={inp} placeholder="Cars" value={form.category} onChange={(e) => set('category', e.target.value)} required />
            </Field>
          </div>
          <TypeSelector value={form.type} onChange={(v) => set('type', v)} />

          {/* In Stock */}
          <div className="flex items-center gap-3">
            <input type="checkbox" id="inStock" checked={form.inStock} onChange={(e) => set('inStock', e.target.checked)}
              className="w-4 h-4 accent-[#F4B400]" />
            <label htmlFor="inStock" className="text-white/70 text-sm font-heading font-semibold">In Stock</label>
          </div>

          {/* Overview */}
          <Field label="Overview / Description">
            <textarea className={`${inp} resize-none`} rows={3} placeholder="Write a detailed product description..."
              value={form.overview} onChange={(e) => set('overview', e.target.value)} required />
          </Field>

          {/* Main Image */}
          <ImageField label="Main Thumbnail Image" value={form.image} onChange={(v) => set('image', v)} required />

          {/* Quick Specs */}
          <div>
            <p className="text-xs font-heading font-semibold text-white/50 uppercase tracking-wider mb-3">Quick Specs (4 badges)</p>
            <div className="grid grid-cols-2 gap-3">
              {form.specs.map((s, i) => (
                <input key={i} className={inp} placeholder={`Spec ${i + 1} e.g. Engine: 1.8L`} value={s} onChange={(e) => setSpec(i, e.target.value)} />
              ))}
            </div>
          </div>

          {/* Gallery Images — dynamic, infinite */}
          <div>
            <p className="text-xs font-heading font-semibold text-white/50 uppercase tracking-wider mb-3">
              Gallery Images <span className="text-white/20 normal-case font-normal">(fill last field to add more)</span>
            </p>
            <div className="flex flex-col gap-3">
              {form.images.map((img, i) => (
                <div key={i} className="flex gap-2 items-start">
                  <div className="flex-1">
                    <ImageField
                      label={`Image ${i + 1}${i === form.images.length - 1 ? ' (fill to add more)' : ''}`}
                      value={img}
                      onChange={(v) => setImage(i, v)}
                    />
                  </div>
                  {form.images.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeImage(i)}
                      className="mt-7 flex-shrink-0 text-red-400/50 hover:text-red-400 transition-colors"
                      aria-label="Remove image"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Spec Groups Accordion */}
          <div>
            <p className="text-xs font-heading font-semibold text-white/50 uppercase tracking-wider mb-3">Technical Specifications</p>
            <div className="border border-white/10 rounded-xl overflow-hidden">
              {form.specGroups.map((group, gi) => (
                <div key={gi} className="border-b border-white/10 last:border-0">
                  <button type="button" onClick={() => setOpenGroup(openGroup === gi ? -1 : gi)}
                    className="w-full flex items-center justify-between px-4 py-3 bg-white/5 hover:bg-white/8 transition-colors">
                    <span className="font-heading font-bold text-white text-sm">{group.label}</span>
                    {openGroup === gi ? <ChevronUp size={15} className="text-white/40" /> : <ChevronDown size={15} className="text-white/40" />}
                  </button>
                  {openGroup === gi && (
                    <div className="px-4 py-3 flex flex-col gap-2">
                      {group.items.map((item, ii) => (
                        <div key={ii} className="flex gap-2 items-center">
                          <input className={inp} placeholder="Label e.g. Type" value={item.label} onChange={(e) => setGroupItem(gi, ii, 'label', e.target.value)} />
                          <input className={inp} placeholder="Value e.g. 1.8L VVT-i" value={item.value} onChange={(e) => setGroupItem(gi, ii, 'value', e.target.value)} />
                          <button type="button" onClick={() => removeGroupItem(gi, ii)} className="text-red-400/60 hover:text-red-400 transition-colors flex-shrink-0">
                            <X size={15} />
                          </button>
                        </div>
                      ))}
                      <button type="button" onClick={() => addGroupItem(gi)}
                        className="text-[#F4B400] text-xs font-heading font-semibold hover:underline text-left mt-1">
                        + Add row
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={saving}
              className="flex items-center gap-2 bg-[#F4B400] hover:bg-[#e0a500] disabled:opacity-60 text-[#111] font-heading font-black text-sm uppercase tracking-wider px-6 py-3 rounded-xl transition-colors">
              {saving ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
              {saving ? 'Saving...' : 'Save Product'}
            </button>
            <button type="button" onClick={onClose}
              className="px-6 py-3 border border-white/10 text-white/60 hover:text-white font-heading font-semibold text-sm rounded-xl transition-colors">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

/* ── Main Admin Page ── */
const Admin = () => {
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [loading, setLoading]   = useState(true)
  const [saving, setSaving]     = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing]   = useState(null)
  const [deleting, setDeleting] = useState(null)
  const [activeFilter, setActiveFilter] = useState('All')

  // Auth guard
  useEffect(() => {
    if (!localStorage.getItem('token')) navigate('/login')
  }, [navigate])

  // Load products
  const load = async () => {
    setLoading(true)
    const data = await getProducts()
    setProducts(Array.isArray(data) ? data : [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  const handleSave = async (data) => {
    setSaving(true)
    try {
      if (editing) {
        await updateProduct(editing.id, data)
      } else {
        await createProduct(data)
      }
      await load()
      setShowForm(false)
      setEditing(null)
      // signal other pages to re-fetch
      localStorage.setItem('products_updated', Date.now().toString())
      window.dispatchEvent(new CustomEvent('products_updated'))
    } catch (err) {
      alert('Error saving product')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return
    setDeleting(id)
    await deleteProduct(id)
    await load()
    setDeleting(null)
    // signal other pages to re-fetch
    localStorage.setItem('products_updated', Date.now().toString())
    window.dispatchEvent(new CustomEvent('products_updated'))
  }

  return (
    <>
      <Helmet><title>Admin — {SITE_NAME}</title></Helmet>

      <div className="min-h-screen bg-[#111] text-white">

        {/* Top bar */}
        <div className="bg-[#1a1a1a] border-b border-white/10 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BrandIcon sizeClassName="w-9 h-9" />
            <div>
              <p className="font-heading font-black text-white text-base uppercase tracking-tight leading-none">{SITE_NAME}</p>
              <p className="text-white/30 text-[10px] font-heading uppercase tracking-widest mt-0.5">Admin Panel</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => { setEditing(null); setShowForm(true) }}
              className="flex items-center gap-2 bg-[#F4B400] hover:bg-[#e0a500] text-[#111] font-heading font-black text-xs uppercase tracking-wider px-4 py-2.5 rounded-xl transition-colors">
              <Plus size={15} /> Add Product
            </button>
            <button onClick={handleLogout}
              className="flex items-center gap-2 border border-white/10 text-white/50 hover:text-white hover:border-white/30 font-heading font-semibold text-xs px-4 py-2.5 rounded-xl transition-colors">
              <LogOut size={14} /> Logout
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="font-heading font-black text-white text-2xl">Products</h1>
              <p className="text-white/30 text-sm mt-1">{products.length} cars listed</p>
            </div>
          </div>

          {/* Search + Filter */}
          {!loading && products.length > 0 && (
            <div className="flex flex-col gap-3 mb-6">
              {/* Search by name */}
              <input
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder:text-white/20 outline-none focus:border-[#F4B400] transition-colors w-full max-w-sm"
                placeholder="Search by name e.g. Toyota Hilux Revo..."
                value={activeFilter.startsWith('__search:') ? activeFilter.slice(9) : ''}
                onChange={(e) => setActiveFilter(e.target.value ? `__search:${e.target.value}` : 'All')}
              />
              {/* Category/type tabs */}
              <div className="flex flex-wrap gap-2">
                {['All', ...new Set(products.flatMap((p) => [p.category, p.type].filter(Boolean)))].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveFilter(cat)}
                    className={`px-5 py-2.5 text-xs font-heading font-semibold transition-all duration-200 ${
                      activeFilter === cat
                        ? 'bg-[#F4B400] text-[#111]'
                        : 'bg-white/5 text-white/50 border border-white/10 hover:border-[#F4B400]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          )}

          {loading ? (
            <div className="flex items-center justify-center py-24">
              <Loader2 size={32} className="animate-spin text-[#F4B400]" />
            </div>
          ) : products.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center">
                <Truck size={28} className="text-white/20" />
              </div>
              <p className="text-white/30 font-heading font-semibold">No products yet</p>
              <button onClick={() => { setEditing(null); setShowForm(true) }}
                className="flex items-center gap-2 bg-[#F4B400] text-[#111] font-heading font-black text-sm px-5 py-2.5 rounded-xl">
                <Plus size={15} /> Add First Product
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {(activeFilter === 'All'
                ? products
                : activeFilter.startsWith('__search:')
                  ? products.filter((p) => p.name.toLowerCase().includes(activeFilter.slice(9).toLowerCase()))
                  : products.filter((p) => p.category === activeFilter || p.type === activeFilter)
              ).map((p) => (
                <div key={p.id} className="bg-[#1a1a1a] border border-white/10 rounded-2xl overflow-hidden hover:border-[#F4B400]/40 transition-colors group">
                  {/* Image */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-white/5">
                    {p.image ? (
                      <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Truck size={32} className="text-white/10" />
                      </div>
                    )}
                    <div className={`absolute top-2 right-2 text-[10px] font-heading font-bold px-2 py-0.5 rounded-full ${p.inStock ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                      {p.inStock ? 'In Stock' : 'Out of Stock'}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-4">
                    <p className="text-[#F4B400] font-heading font-black text-sm leading-tight">{p.name}</p>
                    <p className="text-white/30 text-xs font-heading mt-0.5">{p.model}</p>
                    <p className="text-white/20 text-xs mt-1">{p.type}</p>

                    {/* Actions */}
                    <div className="flex gap-2 mt-4">
                      <button onClick={() => { setEditing(p); setShowForm(true) }}
                        className="flex-1 flex items-center justify-center gap-1.5 border border-white/10 hover:border-[#F4B400] text-white/60 hover:text-[#F4B400] text-xs font-heading font-semibold py-2 rounded-lg transition-colors">
                        <Pencil size={12} /> Edit
                      </button>
                      <button onClick={() => handleDelete(p.id)} disabled={deleting === p.id}
                        className="flex-1 flex items-center justify-center gap-1.5 border border-white/10 hover:border-red-500/50 text-white/60 hover:text-red-400 text-xs font-heading font-semibold py-2 rounded-lg transition-colors disabled:opacity-40">
                        {deleting === p.id ? <Loader2 size={12} className="animate-spin" /> : <Trash2 size={12} />}
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Form Modal */}
      {showForm && (
        <ProductForm
          initial={editing}
          onSave={handleSave}
          onClose={() => { setShowForm(false); setEditing(null) }}
          saving={saving}
          existingSlugs={products.map((p) => p.id)}
        />
      )}
    </>
  )
}

export default Admin
