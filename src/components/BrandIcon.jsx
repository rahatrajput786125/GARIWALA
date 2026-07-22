const BrandIcon = ({ className = '', sizeClassName = 'w-12 h-12', alt = 'Gariwala' }) => (
  <div className={`overflow-hidden rounded-xl border border-black/5 bg-white shadow-sm flex items-center justify-center ${sizeClassName} ${className}`.trim()}>
    <img src="/assets/gariwala-DlxujE9s.jpeg" alt={alt} className="w-full h-full object-cover" loading="eager" />
  </div>
)

export default BrandIcon
