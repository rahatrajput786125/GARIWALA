import { cn } from '@/utils/helpers'

const Card = ({ children, className, hover = true, dark, padding = true, flat, as: Tag = 'div' }) => (
  <Tag
    className={cn(
      'rounded-[1.25rem] transition-all duration-500 ease-smooth',
      padding && 'p-7 lg:p-8',
      dark
        ? 'bg-dark-200 text-white border border-white/[0.07]'
        : flat
        ? 'bg-surface border border-border'
        : 'bg-white border border-border shadow-card',
      hover && !dark && 'hover:shadow-card-hover hover:-translate-y-1.5 hover:border-primary/25 will-change-transform cursor-default',
      hover && dark  && 'hover:border-white/[0.12] hover:-translate-y-1 will-change-transform cursor-default',
      className
    )}
  >
    {children}
  </Tag>
)

export default Card
