const normalizeText = (value = '') =>
  String(value)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

const getProductScore = (product, query) => {
  const normalizedQuery = normalizeText(query)
  const name = normalizeText(product.name)
  const model = normalizeText(product.model)
  const category = normalizeText(product.category)
  const type = normalizeText(product.type)
  const modelCode = normalizeText(product.modelCode || product.code || product.model_code || product.variantCode || product.variant_code)
  const engineText = normalizeText(
    [
      product.engine,
      product.engineType,
      product.engine_type,
      product.engineCapacity,
      product.engine_capacity,
      product.power,
      product.transmission,
      product.drive,
      ...(product.specGroups || []).flatMap((group) => group.items.map((item) => item.value)),
      ...(product.specs || []),
    ]
      .filter(Boolean)
      .join(' ')
  )
  const haystack = [name, model, category, type, modelCode, engineText].filter(Boolean).join(' ').trim()

  if (!normalizedQuery) return 0

  if (name === normalizedQuery) return 1000
  if (modelCode && modelCode === normalizedQuery) return 950
  if (haystack.includes(normalizedQuery)) return 800

  const queryWords = normalizedQuery.split(' ')
  const matches = queryWords.filter((word) => haystack.includes(word)).length
  const overlap = matches / Math.max(queryWords.length, 1)

  if (matches > 0) return 500 + overlap * 100
  return 0
}

export const getProductSlug = (product) => {
  const base = product?.id || product?.name || ''
  const slug = String(base)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')

  return slug || 'product'
}

export const searchProducts = (products = [], query = '') => {
  const trimmedQuery = String(query || '').trim()

  const scored = (products || [])
    .map((product) => ({
      ...product,
      score: getProductScore(product, trimmedQuery),
      createdAtValue: product.createdAt || product.created_at || product.updatedAt || product.updated_at || '',
    }))
    .filter((product) => trimmedQuery ? product.score > 0 : true)

  return scored
    .sort((left, right) => {
      if (right.score !== left.score) return right.score - left.score
      const leftTime = left.createdAtValue ? new Date(left.createdAtValue).getTime() : 0
      const rightTime = right.createdAtValue ? new Date(right.createdAtValue).getTime() : 0
      return rightTime - leftTime
    })
    .map(({ score, createdAtValue, ...product }) => product)
}
