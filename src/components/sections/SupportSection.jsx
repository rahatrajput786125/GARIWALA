import { motion } from 'framer-motion'
import { Phone, MapPin } from 'lucide-react'
import Section from '@/components/Section'
import Container from '@/components/Container'
import Heading from '@/components/Heading'

const SupportSection = () => {
  return (
    <Section className="py-16 bg-white">
      <Container>
        <div className="text-center mb-12">
          <Heading 
            level={2} 
            className="text-display-md mb-4 text-heading font-bold"
          >
            We provide a 24/7 customer support
          </Heading>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-4 mb-12"
        >
          <Phone className="w-8 h-8 text-primary" />
          <a 
            href="tel:+923000442552"
            className="text-2xl font-heading font-bold text-primary hover:text-primary/80 transition-colors"
          >
            +92-300 0442552
          </a>
        </motion.div>

        <div className="grid grid-cols-3 gap-8 mb-12">
          {/* Discover Range */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center"
          >
            <h3 className="text-xl font-heading font-bold text-primary mb-4">
              Discover Range
            </h3>
            <p className="text-body-md text-body">
              Explore our complete lineup of quality vehicles and services
            </p>
          </motion.div>

          {/* Contact Support */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center"
          >
            <h3 className="text-xl font-heading font-bold text-primary mb-4">
              Contact Support
            </h3>
            <p className="text-body-md text-body">
              Our team is ready to help you 24 hours a day, 7 days a week
            </p>
          </motion.div>

          {/* Schedule Service */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center"
          >
            <h3 className="text-xl font-heading font-bold text-primary mb-4">
              Schedule Service
            </h3>
            <p className="text-body-md text-body">
              Book your service appointment online in just a few clicks
            </p>
          </motion.div>
        </div>
      </Container>
    </Section>
  )
}

export default SupportSection
