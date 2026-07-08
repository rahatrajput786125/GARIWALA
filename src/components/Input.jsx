import { forwardRef } from 'react'
import { cn } from '@/utils/helpers'

const Input = forwardRef(
  ({ label, error, hint, className, wrapperClassName, textarea, rows = 4, required, id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined)

    const base = cn(
      'w-full bg-white border rounded-2xl px-5 py-3.5 text-body-md text-heading',
      'placeholder:text-body/40 transition-all duration-200 ease-smooth outline-none',
      'focus:border-primary focus:ring-2 focus:ring-primary/20',
      error
        ? 'border-red-400 ring-2 ring-red-100'
        : 'border-border hover:border-heading/30',
      className
    )

    return (
      <div className={cn('flex flex-col gap-1.5', wrapperClassName)}>
        {label && (
          <label
            htmlFor={inputId}
            className="text-body-sm font-heading font-semibold text-heading"
          >
            {label}
            {required && <span className="text-primary ml-1" aria-hidden="true">*</span>}
          </label>
        )}
        {textarea ? (
          <textarea
            ref={ref}
            id={inputId}
            rows={rows}
            className={cn(base, 'resize-none')}
            aria-invalid={error ? 'true' : undefined}
            aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
            {...props}
          />
        ) : (
          <input
            ref={ref}
            id={inputId}
            className={base}
            aria-invalid={error ? 'true' : undefined}
            aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
            {...props}
          />
        )}
        {error && (
          <p id={`${inputId}-error`} className="text-body-xs text-red-500 flex items-center gap-1" role="alert">
            {error}
          </p>
        )}
        {hint && !error && (
          <p id={`${inputId}-hint`} className="text-body-xs text-body">
            {hint}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
export default Input
