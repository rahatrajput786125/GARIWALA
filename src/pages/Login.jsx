import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Lock, Mail, Loader2 } from 'lucide-react'
import { SITE_NAME } from '@/constants'
import { login } from '@/utils/api'
import BrandIcon from '@/components/BrandIcon'

const Login = () => {
  const navigate = useNavigate()
  const [show, setShow]       = useState(false)
  const [email, setEmail]     = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]     = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await login(email, password)
      if (res.token) {
        localStorage.setItem('token', res.token)
        navigate('/admin')
      } else {
        setError(res.message || 'Invalid credentials')
      }
    } catch {
      setError('Server error. Make sure backend is running.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Helmet><title>Login — {SITE_NAME}</title></Helmet>

      <div className="min-h-screen bg-[#111] flex items-center justify-center px-4">
        <div className="w-full max-w-md">

          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="mb-4">
              <BrandIcon sizeClassName="w-16 h-16" />
            </div>
            <h1 className="font-heading font-black text-white text-2xl uppercase tracking-tight">{SITE_NAME}</h1>
            <p className="text-white/40 text-sm font-heading mt-1 tracking-widest uppercase">Admin Panel</p>
          </div>

          {/* Form */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
            <h2 className="font-heading font-black text-white text-xl mb-1">Welcome back</h2>
            <p className="text-white/40 text-sm mb-8">Sign in to your account</p>

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-xl px-4 py-3 mb-5">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-white/60 text-xs font-heading font-semibold uppercase tracking-wider">Email Address</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                  <input
                    type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@gmail.com"
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white text-sm placeholder:text-white/20 outline-none focus:border-[#F4B400] transition-colors"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-white/60 text-xs font-heading font-semibold uppercase tracking-wider">Password</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                  <input
                    type={show ? 'text' : 'password'} required value={password} onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-11 py-3 text-white text-sm placeholder:text-white/20 outline-none focus:border-[#F4B400] transition-colors"
                  />
                  <button type="button" onClick={() => setShow((v) => !v)} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors">
                    {show ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button
                type="submit" disabled={loading}
                className="w-full bg-[#F4B400] hover:bg-[#e0a500] disabled:opacity-60 text-[#111] font-heading font-black text-sm uppercase tracking-wider py-3.5 rounded-xl transition-colors mt-2 flex items-center justify-center gap-2"
              >
                {loading && <Loader2 size={16} className="animate-spin" />}
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>
          </div>

          <p className="text-center text-white/30 text-xs mt-6">
            <Link to="/" className="hover:text-[#F4B400] transition-colors">← Back to website</Link>
          </p>
        </div>
      </div>
    </>
  )
}

export default Login
