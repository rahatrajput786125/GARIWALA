export const cn = (...classes) => classes.filter(Boolean).join(' ')

export const formatDate = (date) =>
  new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date))

export const truncate = (str, length = 100) =>
  str.length > length ? `${str.slice(0, length)}...` : str

export const slugify = (str) =>
  str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
