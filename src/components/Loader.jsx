import { cn } from '@/utils/helpers'

const sizeMap = {
  sm: 'w-5 h-5 border-2',
  md: 'w-9 h-9 border-2',
  lg: 'w-14 h-14 border-[3px]',
  xl: 'w-20 h-20 border-4',
}

const Loader = ({ fullScreen, size = 'md', className }) => {
  const spinner = (
    <span
      className={cn(
        'rounded-full border-primary border-t-transparent animate-spin inline-block',
        sizeMap[size],
        className
      )}
    />
  )

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
        {spinner}
      </div>
    )
  }

  return <div className="flex items-center justify-center p-10">{spinner}</div>
}

export default Loader
