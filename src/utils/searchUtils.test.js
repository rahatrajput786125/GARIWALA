import test from 'node:test'
import assert from 'node:assert/strict'
import { searchProducts, getProductSlug } from './searchUtils.js'

test('searchProducts prioritizes exact name matches and latest items first', () => {
  const products = [
    { id: 'honda-civic-2016', name: 'Honda Civic 2016', model: 'Civic', createdAt: '2023-01-01T00:00:00.000Z' },
    { id: 'honda-civic-2026', name: 'Honda Civic 2026', model: 'Civic', createdAt: '2025-01-01T00:00:00.000Z' },
    { id: 'honda-city', name: 'Honda City', model: 'City', createdAt: '2024-01-01T00:00:00.000Z' },
  ]

  const results = searchProducts(products, 'Honda Civic')

  assert.equal(results[0].id, 'honda-civic-2026')
  assert.equal(results[1].id, 'honda-civic-2016')
  assert.equal(results[2].id, 'honda-city')
})

test('searchProducts returns similar products when no exact match exists', () => {
  const products = [
    { id: 'honda-city', name: 'Honda City', model: 'City', createdAt: '2024-01-01T00:00:00.000Z' },
    { id: 'toyota-corolla', name: 'Toyota Corolla', model: 'Corolla', createdAt: '2024-01-01T00:00:00.000Z' },
  ]

  const results = searchProducts(products, 'Honda Civic')

  assert.equal(results.length, 1)
  assert.equal(results[0].id, 'honda-city')
})

test('searchProducts also matches engine and model-code style fields', () => {
  const products = [
    {
      id: 'civic-rs',
      name: 'Honda Civic RS',
      model: 'RS',
      modelCode: 'M-2026',
      category: 'Cars',
      type: 'Sedan',
      specGroups: [{ label: 'Engine', items: [{ label: 'Type', value: '1.5L VTEC Turbo' }] }],
      createdAt: '2025-01-01T00:00:00.000Z',
    },
    {
      id: 'city-ex',
      name: 'Honda City EX',
      model: 'EX',
      category: 'Cars',
      type: 'Sedan',
      specGroups: [{ label: 'Engine', items: [{ label: 'Type', value: '1.2L i-VTEC' }] }],
      createdAt: '2024-01-01T00:00:00.000Z',
    },
  ]

  const results = searchProducts(products, 'M-2026 VTEC')

  assert.equal(results[0].id, 'civic-rs')
})

test('getProductSlug uses a stable slug from id or name', () => {
  assert.equal(getProductSlug({ id: 'honda-civic-2026' }), 'honda-civic-2026')
  assert.equal(getProductSlug({ name: 'Honda Civic 2026' }), 'honda-civic-2026')
})
