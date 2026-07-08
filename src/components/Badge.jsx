import { cn } from '@/utils/helpers'

const variants = {
  primary: 'bg-primary/10 text-primary-700 border border-primary/25',
  dark:    'bg-dark text-white',
  surface: 'bg-surface text-body border border-border',
  white:   'bg-white text-body border border-border shadow-xs',
  success: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
}

const Badge = ({ children, variant = 'primary', className }) => (
  <span
    className={cn(
      'inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full',
      'text-body-xs font-heading font-bold uppercase tracking-[0.1em]',
      variants[variant],
      className
    )}
  >
    {children}
  </span>
)

export default Badge
