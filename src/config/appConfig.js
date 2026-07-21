const normalizeUrl = (value, fallback) => {
  if (!value) return fallback
  return value.replace(/\/+$/, '')
}

const getFrontendBaseUrl = () => {
  if (typeof window !== 'undefined' && window.location?.origin) {
    return window.location.origin
  }
  return 'http://localhost:5173'
}

export const API_BASE_URL = normalizeUrl(
  import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  'http://localhost:5000/api'
)

export const FRONTEND_BASE_URL = normalizeUrl(
  import.meta.env.VITE_FRONTEND_URL || getFrontendBaseUrl(),
  'http://localhost:5173'
)

export const UPLOAD_BASE_URL = normalizeUrl(
  import.meta.env.VITE_UPLOAD_URL || `${API_BASE_URL.replace(/\/api$/, '')}/uploads`,
  'http://localhost:5000/uploads'
)

export const appConfig = {
  apiBaseUrl: API_BASE_URL,
  frontendBaseUrl: FRONTEND_BASE_URL,
  uploadBaseUrl: UPLOAD_BASE_URL,
}
