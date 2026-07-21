import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Phone, Clock } from 'lucide-react'
import Section from '@/components/Section'
import Container from '@/components/Container'
import Heading from '@/components/Heading'

const DealerListSection = () => {
  const dealers = [
    {
      id: 1,
      name: 'Main Showroom - Karachi',
      address: 'New M. A. Jinnah Rd, Shikarpur Colony Muslimabad, Karachi, 74400',
      phone: '+92-313-255-3864',
      hours: 'Mon-Sat: 9:00 AM - 7:00 PM',
    },
  ]

  return (
    <Section className="py-16 bg-surface">
      <Container>
        <div className="grid grid-cols-2 gap-8">
          {/* Left: Services and Dealer List */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Heading 
              level={2} 
              className="text-display-md mb-8 text-heading font-bold"
            >
              Services & Dealer List
            </Heading>

            {/* Service heading */}
            <div className="mb-8">
             
            </div>

            {/* Service Information Box */}
            <div className="bg-white p-6 rounded-lg border-2 border-border mb-8">
              <h3 className="text-xl font-heading font-bold text-heading mb-4">
                Services
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span className="text-body-md text-body">Customer Care & Support</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span className="text-body-md text-body">Service Warranty</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span className="text-body-md text-body">Technical Support</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span className="text-body-md text-body">Spare Parts Availability</span>
                </li>
              </ul>
            </div>

            {/* Dealers List */}
            <div className="space-y-4">
              {dealers.map((dealer, idx) => (
                <motion.div
                  key={dealer.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="bg-white p-4 rounded-lg border-2 border-border hover:border-primary transition-all"
                >
                  <h4 className="font-heading font-bold text-heading mb-3">
                    {dealer.name}
                  </h4>
                  <div className="space-y-2 text-body-sm text-body">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>{dealer.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                      <a 
                        href={`tel:${dealer.phone}`}
                        className="hover:text-primary transition-colors"
                      >
                        {dealer.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>{dealer.hours}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Map Area */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center"
          >
            <div className="w-full aspect-square bg-surface rounded-lg border-4 border-border flex items-center justify-center overflow-hidden">
              <iframe
                width="100%"
                height="100%"
                style={{ border: 'none' }}
                loading="lazy"
                allowFullScreen=""
                src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3321.6810065932823!2d74.2831621!3d31.5086933!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3919a45d5d45d45d%3A0x1d1d1d1d1d1d1d1d!2sGhandhara%20Automobiles%20Limited!5e0!3m2!1sen!2spk!4v1234567890`}
              />
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  )
}

export default DealerListSection
