import { Routes, Route, useLocation } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import Layout from '@/components/layout/Layout'
import PageTransition from '@/components/PageTransition'
import Home from '@/pages/Home'
import About from '@/pages/About'
import Services from '@/pages/Services'
import Projects from '@/pages/Projects'
import Gallery from '@/pages/Gallery'
import Contact from '@/pages/Contact'
import NotFound from '@/pages/NotFound'
import ProductDetail from '@/pages/ProductDetail'
import Login from '@/pages/Login'
import Admin from '@/pages/Admin'

const App = () => {
  const location = useLocation()

  return (
    <HelmetProvider>
      <Layout>
        <PageTransition>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </PageTransition>
      </Layout>
    </HelmetProvider>
  )
}

export default App
