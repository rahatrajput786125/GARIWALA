import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { Mail, Phone, MapPin, CheckCircle, ArrowRight } from 'lucide-react'
import { useGsapReveal } from '@/hooks/useGsapReveal'
import Section from '@/components/Section'
import Container from '@/components/Container'
import Heading from '@/components/Heading'
import Input from '@/components/Input'
import Button from '@/components/Button'
import { SITE_NAME, CONTACT_INFO } from '@/constants'
import { sendContactMessage } from '@/utils/api'

const contactDetails = [
  { icon: Phone,  label: 'Phone',   value: CONTACT_INFO.phone,   color: 'text-amber-500',   bg: 'bg-amber-50' },
  { icon: Mail,   label: 'Email',   value: CONTACT_INFO.email,   color: 'text-blue-500',    bg: 'bg-blue-50' },
  { icon: MapPin, label: 'Address', value: CONTACT_INFO.address, color: 'text-emerald-500', bg: 'bg-emerald-50' },
]

const Contact = () => {
  const heroRef = useGsapReveal()
  const [submitted, setSubmitted] = useState(false)
  const [serverError, setServerError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm()

  const onSubmit = async (data) => {
    setServerError('')
    try {
      await sendContactMessage(data)
      setSubmitted(true)
      reset()
    } catch (err) {
      setServerError(err.message || 'Failed to send message. Please try again.')
    }
  }

  return (
    <>
      <Helmet>
        <title>Contact — {SITE_NAME}</title>
        <meta name="description" content="Get in touch with Gariwala Automobiles Karachi." />
      </Helmet>

      <Section surface navOffset>
        <Container>
          <div ref={heroRef} className="mb-16">
            <span className="eyebrow mb-5 block">Get in Touch</span>
            <Heading as="h1" className="mb-5">
              Let's <span className="text-gradient">Talk</span>
            </Heading>
            <p className="text-body-xl text-body max-w-xl leading-relaxed">
              Interested in a vehicle or need more info? Reach out and we'll get back to you shortly.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact info */}
            <div className="flex flex-col gap-4">
              {contactDetails.map(({ icon: Icon, label, value, color, bg }) => (
                <div
                  key={label}
                  className="p-6 rounded-[1.25rem] bg-white border border-border shadow-card hover:shadow-card-hover hover:-translate-y-1 hover:border-primary/20 transition-all duration-500"
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${bg}`}>
                      <Icon size={18} className={color} />
                    </div>
                    <div>
                      <p className="text-body-xs font-heading font-bold text-body uppercase tracking-[0.12em] mb-1.5">{label}</p>
                      <p className="text-body-md text-heading font-semibold">{value}</p>
                    </div>
                  </div>
                </div>
              ))}

              <div className="p-6 rounded-[1.25rem] bg-heading text-white border border-heading">
                <p className="text-body-xs font-heading font-bold uppercase tracking-[0.12em] text-white/40 mb-4">Working Hours</p>
                <div className="flex flex-col gap-2">
                  {[
                    { day: 'Mon – Fri', hours: '9:00 AM – 7:00 PM' },
                    { day: 'Saturday',  hours: '9:00 AM – 5:00 PM' },
                    { day: 'Sunday',    hours: 'Closed' },
                  ].map(({ day, hours }) => (
                    <div key={day} className="flex items-center justify-between">
                      <span className="text-body-sm text-white/50">{day}</span>
                      <span className="text-body-sm text-white font-heading font-semibold">{hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <div className="p-8 lg:p-10 rounded-[1.25rem] bg-white border border-border shadow-card">
                {submitted ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center gap-5">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                      <CheckCircle size={32} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-heading font-black text-display-sm text-heading mb-2">Message Sent!</h3>
                      <p className="text-body-md text-body max-w-sm">
                        Thank you! Your message has been sent. We'll get back to you within 24 hours.
                      </p>
                    </div>
                    <Button variant="outline" onClick={() => setSubmitted(false)}>Send Another</Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5" noValidate>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <Input
                        label="Full Name" required placeholder="your name"
                        error={errors.name?.message}
                        {...register('name', { required: 'Name is required' })}
                      />
                      <Input
                        label="Email Address" type="email" required placeholder="email@.com"
                        error={errors.email?.message}
                        {...register('email', {
                          required: 'Email is required',
                          pattern: { value: /^\S+@\S+\.\S+$/, message: 'Invalid email address' },
                        })}
                      />
                    </div>
                    <Input
                      label="Phone Number" type="tel" placeholder="0313-2553864"
                      error={errors.phone?.message}
                      {...register('phone')}
                    />
                    <Input
                      label="Subject" required placeholder="Inquiry about JAC S3 SUV"
                      error={errors.subject?.message}
                      {...register('subject', { required: 'Subject is required' })}
                    />
                    <Input
                      label="Message" textarea required rows={5}
                      placeholder="Tell us which vehicle you're interested in..."
                      error={errors.message?.message}
                      {...register('message', {
                        required: 'Message is required',
                        minLength: { value: 10, message: 'Message must be at least 10 characters' },
                      })}
                    />
                    {serverError && (
                      <p className="text-body-sm text-red-500 bg-red-50 border border-red-200 rounded-lg px-4 py-3">{serverError}</p>
                    )}
                    <Button type="submit" size="lg" loading={isSubmitting}>
                      Send Message <ArrowRight size={18} />
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}

export default Contact
