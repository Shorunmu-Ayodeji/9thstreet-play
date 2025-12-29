export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validateUrl = (url) => {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

export const validateForm = (data, schema) => {
  const errors = {}

  for (const [field, rules] of Object.entries(schema)) {
    const value = data[field] || ''

    if (rules.required && !value.trim()) {
      errors[field] = `${field} is required`
      continue
    }

    if (rules.minLength && value.length < rules.minLength) {
      errors[field] = `${field} must be at least ${rules.minLength} characters`
      continue
    }

    if (rules.type === 'email' && value && !validateEmail(value)) {
      errors[field] = 'Please enter a valid email'
      continue
    }

    if (rules.type === 'url' && value && !validateUrl(value)) {
      errors[field] = 'Please enter a valid URL'
      continue
    }
  }

  return errors
}

export const submitFormSchema = {
  artist: { required: true, minLength: 2 },
  song: { required: true, type: 'url' },
  email: { required: true, type: 'email' },
  notes: { minLength: 0 },
}

export const contactFormSchema = {
  name: { required: true, minLength: 2 },
  email: { required: true, type: 'email' },
  subject: { required: true, minLength: 5 },
  message: { required: true, minLength: 10 },
}
