import { cn } from '@/utils/helpers'

const sizeMap = {
  h1: 'text-display-xl',
  h2: 'text-display-lg',
  h3: 'text-display-md',
  h4: 'text-display-sm',
  h5: 'text-body-xl font-semibold',
  h6: 'text-body-lg font-semibold',
}

const Heading = ({ as: Tag = 'h2', children, className, gradient, center, light, id, ...props }) => (
  <Tag
    id={id}
    className={cn(
      'font-heading font-bold leading-tight text-heading',
      sizeMap[Tag],
      gradient && 'text-gradient',
      center   && 'text-center mx-auto max-w-none',
      light    && 'text-white',
      !center  && 'max-w-none',
      className
    )}
    {...props}
  >
    {children}
  </Tag>
)

export default Heading
