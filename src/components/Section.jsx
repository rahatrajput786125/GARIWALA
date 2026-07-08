import { cn } from '@/utils/helpers'

const Section = ({
  children,
  className,
  dark,
  surface,
  navOffset,
  id,
  role = 'region',
  'aria-labelledby': ariaLabelledby,
  'aria-label': ariaLabel,
  divider,
}) => (
  <section
    id={id}
    role={role}
    aria-labelledby={ariaLabelledby}
    aria-label={!ariaLabelledby ? ariaLabel : undefined}
    data-dark={dark ? '' : undefined}
    className={cn(
      'section-padding relative',
      navOffset && 'nav-offset',
      dark    && 'bg-dark text-white',
      surface && 'bg-surface',
      !dark && !surface && 'bg-white',
      divider && 'section-wave',
      className
    )}
  >
    {children}
  </section>
)

export default Section
