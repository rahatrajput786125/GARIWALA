import { cn } from '@/utils/helpers'

const Container = ({ children, className, narrow, wide, fluid }) => (
  <div
    className={cn(
      'w-full mx-auto',
      /* Responsive horizontal padding — safe-area aware on mobile */
      'px-5 xs:px-6 sm:px-8 lg:px-10 xl:px-12 2xl:px-14',
      fluid  ? 'max-w-none' :
      narrow ? 'max-w-3xl'  :
      wide   ? 'max-w-screen-2xl' :
               'max-w-7xl',
      className
    )}
  >
    {children}
  </div>
)

export default Container
