import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

const getPortFromUrl = (value, fallback = 5173) => {
  if (!value) return fallback

  try {
    const parsed = new URL(value)
    return parsed.port ? Number(parsed.port) : fallback
  } catch {
    const match = value.match(/:(\d{2,5})(?:\/|$)/)
    return match ? Number(match[1]) : fallback
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const port = getPortFromUrl(env.VITE_FRONTEND_URL, 5173)

  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      port,
      strictPort: true,
    },
    preview: {
      port,
      strictPort: true,
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom', 'react-router-dom'],
            'motion': ['framer-motion'],
            'gsap': ['gsap'],
            'swiper': ['swiper'],
            'forms': ['react-hook-form'],
            'ui': ['lucide-react', 'react-helmet-async', 'axios'],
          },
        },
      },
    },
  }
})
