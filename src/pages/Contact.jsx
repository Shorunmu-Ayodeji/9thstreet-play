import React, { useState } from 'react'
import { validateForm, contactFormSchema } from '../utils/formValidation'

function Contact() {
  const endpoint = import.meta.env.VITE_FORMSPREE_CONTACT_ENDPOINT || 'https://formspree.io/f/maqyvqgo'
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    
    // Run custom validation first
    const newErrors = validateForm(formData, contactFormSchema)
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // Clear previous errors
    setErrors({})
    setLoading(true)

    try {
      // Check if using Formspree or local API
      const useFormspree = endpoint.includes('formspree.io')
      
      let res
      if (useFormspree) {
        // Submit to Formspree using FormData
        const formDataToSend = new FormData()
        Object.keys(formData).forEach((key) => {
          if (formData[key]) {
            formDataToSend.append(key, formData[key])
          }
        })
        res = await fetch(endpoint, {
          method: 'POST',
          headers: { Accept: 'application/json' },
          body: formDataToSend,
        })
      } else {
        // Fallback to local API
        const apiBase = import.meta.env.VITE_API_BASE_URL || '/api'
        res = await fetch(`${apiBase}/contact`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        })
      }

      const json = await res.json().catch(() => ({}))

      if (useFormspree) {
        // Check for Formspree errors
        if (json.errors && json.errors.length > 0) {
          throw new Error(json.errors.map((e) => e.message || e).join(', '))
        }
        if (json.error) {
          throw new Error(json.error)
        }
        // Success if we get here
      } else {
        // Local API error handling
        if (!res.ok) {
          throw new Error(json.error || `Server error: ${res.status}`)
        }
      }

      setSubmitted(true)
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (err) {
      setErrors({ form: err.message || 'Could not send message. Please check your connection and try again.' })
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="bg-ink text-paper">
        <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
          <div className="space-y-4 border border-green-500/30 bg-green-900/20 p-6 text-center text-green-100">
            <p className="text-lg font-semibold">Message sent successfully!</p>
            <p className="text-sm">Thanks for reaching out. We'll be in touch within 2 business days.</p>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="bg-ink text-paper">
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <p className="text-xs uppercase tracking-[0.5em] text-paper/60">Reach Out</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight">Contact</h1>
        <p className="mt-4 max-w-2xl text-paper/70">
          Collaborations, press kits, residency ideas—drop a line. We respond within two business days.
        </p>
        <form onSubmit={onSubmit} className="mt-10 space-y-6 border border-paper/20 bg-ink/60 p-6 backdrop-blur" aria-label="Contact form">
          {errors.form && <p className="text-sm text-red-300">{errors.form}</p>}
          {[
            { label: 'Name', name: 'name', type: 'text' },
            { label: 'Email', name: 'email', type: 'email' },
            { label: 'Subject', name: 'subject', type: 'text' },
          ].map((field) => (
            <label key={field.name} className="block text-sm uppercase tracking-[0.4em]">
              {field.label}
              <input
                type={field.type}
                name={field.name}
                aria-label={field.label}
                value={formData[field.name]}
                onChange={handleChange}
                className={`mt-3 w-full bg-transparent px-4 py-3 text-base text-paper focus:outline-none focus:ring-2 ${
                  errors[field.name]
                    ? 'border border-red-400 focus:ring-red-400'
                    : 'border border-paper/60 focus:ring-paper'
                }`}
              />
              {errors[field.name] && <p className="mt-1 text-xs text-red-300">{errors[field.name]}</p>}
            </label>
          ))}
          <label className="block text-sm uppercase tracking-[0.4em]">
            Message
            <textarea
              name="message"
              aria-label="Message"
              value={formData.message}
              onChange={handleChange}
              rows={5}
              className={`mt-3 w-full bg-transparent px-4 py-3 text-base text-paper focus:outline-none focus:ring-2 ${
                errors.message
                  ? 'border border-red-400 focus:ring-red-400'
                  : 'border border-paper/60 focus:ring-paper'
              }`}
            />
            {errors.message && <p className="mt-1 text-xs text-red-300">{errors.message}</p>}
          </label>
          <button
            type="submit"
            disabled={loading}
            className="w-full border border-paper bg-paper py-3 text-sm uppercase tracking-[0.4em] text-ink transition disabled:opacity-50 hover:bg-transparent hover:text-paper"
          >
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </section>
    </div>
  )
}

export default Contact

