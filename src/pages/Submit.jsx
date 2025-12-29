import React, { useState } from 'react'
import { validateForm, submitFormSchema } from '../utils/formValidation'

function Submit() {
  const endpoint = import.meta.env.VITE_FORMSPREE_SUBMIT_ENDPOINT || 'https://formspree.io/f/xqeknejb'
  const [formData, setFormData] = useState({ artist: '', song: '', email: '', notes: '' })
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
    const newErrors = validateForm(formData, submitFormSchema)
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
        res = await fetch(`${apiBase}/submit`, {
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
      setFormData({ artist: '', song: '', email: '', notes: '' })
    } catch (err) {
      setErrors({ form: err.message || 'Submission failed. Please check your connection and try again.' })
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="bg-paper text-ink">
        <section className="border-b border-ink/10 bg-ink text-paper">
          <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
            <p className="text-xs uppercase tracking-[0.5em] text-paper/60">Contribute</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight">Submit Your Music</h1>
          </div>
        </section>
        <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
          <div className="space-y-4 border border-green-500/30 bg-green-50 p-6 text-center text-green-900">
            <p className="text-lg font-semibold">Thank you for your submission!</p>
            <p className="text-sm">We'll review your music and get back to you within 2 weeks.</p>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="bg-paper text-ink">
      <section className="border-b border-ink/10 bg-ink text-paper">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
          <p className="text-xs uppercase tracking-[0.5em] text-paper/60">Contribute</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight">Submit Your Music</h1>
          <p className="mt-4 text-paper/70">
            Send us the sounds that deserve a monochrome spotlight. We curate weekly.
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <form onSubmit={onSubmit} className="space-y-6 border border-ink/10 bg-paper p-6" aria-label="Submit music form">
          {errors.form && <p className="text-sm text-red-500">{errors.form}</p>}
          {[
            { label: 'Artist Name', name: 'artist', type: 'text', placeholder: 'Your stage or group name' },
            { label: 'Song Link', name: 'song', type: 'url', placeholder: 'Streaming or download link' },
            { label: 'Email', name: 'email', type: 'email', placeholder: 'you@email.com' },
          ].map((field) => (
            <label key={field.name} className="block text-sm uppercase tracking-[0.4em]">
              {field.label}
              <input
                type={field.type}
                name={field.name}
                aria-label={field.label}
                value={formData[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder}
                className={`mt-3 w-full border px-4 py-3 text-base tracking-tight text-ink focus:outline-none focus:ring-2 ${
                  errors[field.name] ? 'border-red-500 focus:ring-red-500' : 'border-ink focus:ring-ink'
                }`}
              />
              {errors[field.name] && <p className="mt-1 text-xs text-red-500">{errors[field.name]}</p>}
            </label>
          ))}
          <label className="block text-sm uppercase tracking-[0.4em]">
            Notes
            <textarea
              name="notes"
              aria-label="Notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Context, collaborators, mood, release date."
              rows={5}
              className="mt-3 w-full border border-ink px-4 py-3 text-base tracking-tight text-ink focus:outline-none focus:ring-2 focus:ring-ink"
            />
          </label>
          <button
            type="submit"
            disabled={loading}
            className="w-full border border-ink bg-ink py-3 text-sm uppercase tracking-[0.4em] text-paper transition disabled:opacity-50 hover:bg-paper hover:text-ink"
          >
            {loading ? 'Submitting...' : 'Submit For Review'}
          </button>
        </form>
      </section>
    </div>
  )
}

export default Submit

