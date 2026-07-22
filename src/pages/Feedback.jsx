import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Star, CheckCircle, ArrowRight, MessageSquare, Car, Wrench, Users, ThumbsUp } from 'lucide-react'
import Section from '@/components/Section'
import Container from '@/components/Container'
import Heading from '@/components/Heading'
import Input from '@/components/Input'
import Button from '@/components/Button'
import { SITE_NAME } from '@/constants'
import { sendFeedback } from '@/utils/api'

const CATEGORIES = ['Vehicle Purchase', 'After-Sales Service', 'Test Drive', 'Staff Behavior', 'Showroom Experience', 'General']

const WHY_ITEMS = [
  { icon: Car,         title: 'Vehicle Quality',    desc: 'Share your experience with our vehicles and their performance.' },
  { icon: Wrench,      title: 'Service Excellence', desc: 'Help us improve our after-sales and maintenance services.' },
  { icon: Users,       title: 'Team Behavior',      desc: 'Rate the professionalism and helpfulness of our staff.' },
  { icon: ThumbsUp,    title: 'Overall Experience', desc: 'Tell us about your overall journey with Gariwala.' },
]

const StarRating = ({ value, onChange }) => (
  <div className="flex items-center gap-1">
    {[1, 2, 3, 4, 5].map((star) => (
      <button
        key={star}
        type="button"
        onClick={() => onChange(star)}
        className="transition-transform hover:scale-110 focus:outline-none"
        aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
      >
        <Star
          size={32}
          className={`transition-colors ${star <= value ? 'fill-[#F4B400] text-[#F4B400]' : 'text-border hover:text-[#F4B400]/50'}`}
        />
      </button>
    ))}
    {value > 0 && (
      <span className="ml-2 text-body-sm font-heading font-semibold text-body">
        {['', 'Very Poor', 'Poor', 'Average', 'Good', 'Excellent'][value]}
      </span>
    )}
  </div>
)

const Feedback = () => {
  const [submitted, setSubmitted] = useState(false)
  const [serverError, setServerError] = useState('')
  const [rating, setRating] = useState(0)
  const [ratingError, setRatingError] = useState('')
  const [category, setCategory] = useState('')

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm()

  const onSubmit = async (data) => {
    if (!rating) { setRatingError('Please select a rating'); return }
    setRatingError('')
    setServerError('')
    try {
      await sendFeedback({ ...data, rating, category: category || 'General' })
      setSubmitted(true)
      reset()
      setRating(0)
      setCategory('')
    } catch (err) {
      setServerError(err.message || 'Failed to submit feedback. Please try again.')
    }
  }

  return (
    <>
      <Helmet>
        <title>Feedback — {SITE_NAME}</title>
        <meta name="description" content="Share your experience with Gariwala Automobiles. Your feedback helps us serve you better." />
      </Helmet>

      {/* Hero */}
      <Section surface navOffset>
        <Container>
          <div className="mb-14">
            <span className="eyebrow mb-5 block">Your Opinion Matters</span>
            <Heading as="h1" className="mb-5">
              Share Your <span className="text-gradient">Experience</span>
            </Heading>
            <p className="text-body-xl text-body max-w-xl leading-relaxed">
              At Gariwala Automobiles, we constantly strive to improve. Your honest feedback helps us deliver a better experience for every customer.
            </p>
          </div>

          {/* Why feedback cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
            {WHY_ITEMS.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="p-6 rounded-[1.25rem] bg-white border border-border shadow-card hover:shadow-card-hover hover:-translate-y-1 hover:border-primary/20 transition-all duration-500">
                <div className="w-11 h-11 rounded-2xl bg-amber-50 flex items-center justify-center mb-4">
                  <Icon size={18} className="text-amber-500" />
                </div>
                <p className="font-heading font-bold text-heading text-body-md mb-1">{title}</p>
                <p className="text-body text-body-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="max-w-2xl mx-auto">
            <div className="p-8 lg:p-10 rounded-[1.25rem] bg-white border border-border shadow-card">

              {submitted ? (
                <div className="flex flex-col items-center justify-center py-16 text-center gap-5">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <CheckCircle size={32} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading font-black text-display-sm text-heading mb-2">Thank You!</h3>
                    <p className="text-body-md text-body max-w-sm">
                      Your feedback has been submitted. We appreciate you helping us improve our services.
                    </p>
                  </div>
                  <Button variant="outline" onClick={() => setSubmitted(false)}>Submit Another</Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6" noValidate>

                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
                      <MessageSquare size={18} className="text-amber-500" />
                    </div>
                    <div>
                      <p className="font-heading font-bold text-heading text-body-md">Feedback Form</p>
                      <p className="text-body text-body-xs">All fields marked * are required</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Input
                      label="Full Name" required placeholder="Your name"
                      error={errors.name?.message}
                      {...register('name', { required: 'Name is required' })}
                    />
                    <Input
                      label="Email Address" type="email" required placeholder="email@example.com"
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
                    label="Vehicle (if applicable)" placeholder="e.g. Honda Civic, JAC S3, Toyota Hilux"
                    error={errors.vehicle?.message}
                    {...register('vehicle')}
                  />

                  {/* Category */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-body-xs font-heading font-bold text-body uppercase tracking-[0.12em]">
                      Feedback Category
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {CATEGORIES.map((cat) => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => setCategory(cat)}
                          className={`px-4 py-2 text-body-xs font-heading font-semibold rounded-lg border transition-all duration-200 ${
                            category === cat
                              ? 'bg-[#F4B400] border-[#F4B400] text-heading'
                              : 'bg-white border-border text-body hover:border-[#F4B400] hover:text-heading'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Star Rating */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-body-xs font-heading font-bold text-body uppercase tracking-[0.12em]">
                      Overall Rating <span className="text-red-500">*</span>
                    </label>
                    <StarRating value={rating} onChange={(v) => { setRating(v); setRatingError('') }} />
                    {ratingError && <p className="text-body-sm text-red-500 mt-1">{ratingError}</p>}
                  </div>

                  <Input
                    label="Your Feedback" textarea required rows={5}
                    placeholder="Tell us about your experience with Gariwala Automobiles..."
                    error={errors.message?.message}
                    {...register('message', {
                      required: 'Feedback is required',
                      minLength: { value: 10, message: 'Please write at least 10 characters' },
                    })}
                  />

                  {serverError && (
                    <p className="text-body-sm text-red-500 bg-red-50 border border-red-200 rounded-lg px-4 py-3">{serverError}</p>
                  )}

                  <Button type="submit" size="lg" loading={isSubmitting}>
                    Submit Feedback <ArrowRight size={18} />
                  </Button>
                </form>
              )}
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}

export default Feedback
