const BASE = 'http://localhost:5000/api'

const getToken = () => localStorage.getItem('token')

const headers = (auth = false) => ({
  'Content-Type': 'application/json',
  ...(auth && { Authorization: `Bearer ${getToken()}` }),
})

export const login = (email, password) =>
  fetch(`${BASE}/auth/login`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({ email, password }),
  }).then((r) => r.json())

export const getProducts = () =>
  fetch(`${BASE}/products`, { headers: headers() }).then((r) => r.json())

export const getProductById = (id) =>
  fetch(`${BASE}/products/${id}`, { headers: headers() }).then((r) => r.json())

export const createProduct = (data) =>
  fetch(`${BASE}/products`, {
    method: 'POST',
    headers: headers(true),
    body: JSON.stringify(data),
  }).then((r) => r.json())

export const updateProduct = (id, data) =>
  fetch(`${BASE}/products/${id}`, {
    method: 'PUT',
    headers: headers(true),
    body: JSON.stringify(data),
  }).then((r) => r.json())

export const deleteProduct = (id) =>
  fetch(`${BASE}/products/${id}`, {
    method: 'DELETE',
    headers: headers(true),
  }).then((r) => r.json())

export const uploadImage = (file) => {
  const fd = new FormData()
  fd.append('image', file)
  return fetch(`${BASE}/upload`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${getToken()}` },
    body: fd,
  }).then((r) => r.json())
}
