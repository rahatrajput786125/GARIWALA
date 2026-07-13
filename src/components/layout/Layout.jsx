import { useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

const Layout = ({ children }) => {
  const { pathname } = useLocation()
  const isAuth = pathname === '/login' || pathname === '/admin'

  if (isAuth) return <>{children}</>

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  )
}

export default Layout
