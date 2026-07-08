import Navbar from './Navbar'
import Footer from './Footer'

const Layout = ({ children }) => (
  <div className="flex flex-col min-h-screen">
    <Navbar />
    <div className="flex-1">{children}</div>
    <Footer />
  </div>
)

export default Layout
