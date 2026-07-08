import { Link } from 'react-router-dom'
import { ArrowRight, Phone } from 'lucide-react'
import { motion } from 'framer-motion'
import Container from '@/components/Container'
import Button from '@/components/Button'

const CtaSection = () => (
  <section className="py-section bg-white" aria-labelledby="cta-heading">
    <Container>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative rounded-[2rem] bg-[#111111] overflow-hidden"
      >
        {/* Background layers */}
        <div className="absolute inset-0 bg-dot-pattern opacity-[0.18]" aria-hidden="true" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/[0.08] rounded-full blur-[100px] pointer-events-none" aria-hidden="true" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary/[0.05] rounded-full blur-[80px] pointer-events-none" aria-hidden="true" />

        {/* Top accent bar */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-primary/0 via-primary to-primary/0" aria-hidden="true" />

        {/* Side accent */}
        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-primary/0 via-primary/60 to-primary/0" aria-hidden="true" />

        <div className="relative z-10 px-8 py-16 md:px-16 md:py-20 lg:px-24 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12">
          <div className="max-w-xl">
            <span className="eyebrow mb-6 block text-primary">
              Start Your Project
            </span>
            <h2
              id="cta-heading"
              className="font-heading font-black text-display-lg text-white leading-[1.08] tracking-tight mb-5"
            >
              Ready to Transform
              <br />
              Your Vehicle?
            </h2>
            <p className="text-body-lg text-white/45 leading-relaxed">
              Get in touch today and let our experts craft the perfect solution for your automotive needs.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 shrink-0">
            <Button as={Link} to="/contact" size="lg">
              Contact Us
              <ArrowRight size={18} aria-hidden="true" />
            </Button>
            <Button
              as={Link}
              to="/services"
              variant="outline"
              size="lg"
              className="border-white/20 text-white hover:bg-white hover:text-heading hover:border-white"
            >
              <Phone size={16} aria-hidden="true" />
              Our Services
            </Button>
          </div>
        </div>
      </motion.div>
    </Container>
  </section>
)

export default CtaSection
