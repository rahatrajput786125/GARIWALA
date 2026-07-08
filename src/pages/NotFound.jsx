import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Home } from 'lucide-react'
import Container from '@/components/Container'
import Heading from '@/components/Heading'
import Button from '@/components/Button'
import { SITE_NAME } from '@/constants'

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>404 Not Found — {SITE_NAME}</title>
      </Helmet>
      <div className="min-h-screen bg-surface flex items-center pt-24">
        <Container>
          <div className="text-center max-w-lg mx-auto">
            <p className="font-heading font-black text-[8rem] leading-none text-primary/10 select-none">
              404
            </p>
            <Heading as="h1" className="-mt-4 mb-4">
              Page Not Found
            </Heading>
            <p className="text-body-lg text-gray mb-8">
              The page you're looking for doesn't exist or has been moved.
            </p>
            <Button as={Link} to="/" size="lg">
              <Home size={18} />
              Back to Home
            </Button>
          </div>
        </Container>
      </div>
    </>
  )
}

export default NotFound
