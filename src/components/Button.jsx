import { forwardRef } from 'react'
import { cn } from '@/utils/helpers'

const variants = {
  primary:
    'bg-primary text-heading hover:bg-primary-500 shadow-primary hover:shadow-primary-lg active:scale-[0.97] focus-visible:ring-offset-white',
  dark:
    'bg-dark text-white hover:bg-dark-50 active:scale-[0.97] focus-visible:ring-offset-[#1A1A1A]',
  outline:
    'border-2 border-heading text-heading hover:bg-heading hover:text-white active:scale-[0.97] focus-visible:ring-offset-white',
  'outline-primary':
    'border-2 border-primary text-heading hover:bg-primary active:scale-[0.97] focus-visible:ring-offset-white',
  ghost:
    'text-heading hover:bg-surface active:scale-[0.97] focus-visible:ring-offset-white',
  white:
    'bg-white text-heading hover:bg-surface shadow-card hover:shadow-card-md active:scale-[0.97] focus-visible:ring-offset-[#111111]',
}

const sizes = {
  sm: 'h-10 px-5 text-body-sm gap-1.5',
  md: 'h-12 px-7 text-body-md gap-2',
  lg: 'h-14 px-9 text-body-lg gap-2',
  xl: 'h-16 px-11 text-body-xl gap-2.5',
}

const Button = forwardRef(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      className,
      disabled,
      loading,
      fullWidth,
      as: Tag = 'button',
      type = 'button',
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading

    return (
      <Tag
        ref={ref}
        type={Tag === 'button' ? type : undefined}
        disabled={Tag === 'button' ? isDisabled : undefined}
        aria-disabled={Tag !== 'button' && isDisabled ? 'true' : undefined}
        aria-busy={loading ? 'true' : undefined}
        className={cn(
          'inline-flex items-center justify-center font-heading font-semibold rounded-full',
          'tracking-[0.01em] transition-all duration-300 ease-smooth cursor-pointer select-none whitespace-nowrap',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2',
          'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
          'will-change-transform',
          variants[variant],
          sizes[size],
          fullWidth && 'w-full',
          isDisabled && Tag !== 'button' && 'opacity-50 cursor-not-allowed pointer-events-none',
          className
        )}
        {...props}
      >
        {loading && (
          <span
            className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin shrink-0"
            aria-hidden="true"
          />
        )}
        {children}
      </Tag>
    )
  }
)

Button.displayName = 'Button'
export default Button
