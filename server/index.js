import express from 'express'
import cors from 'cors'
import { createClient } from '@supabase/supabase-js'

const app = express()
app.use(cors())
app.use(express.json())

// Supabase config
const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_KEY = process.env.SUPABASE_KEY
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

function isEmail(val) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)
}

// Submissions endpoint
app.post('/api/submit', async (req, res) => {
  const { artist, song, email, notes } = req.body || {}
  if (!artist || !song || !email) {
    return res.status(400).json({ error: 'artist, song and email required' })
  }
  if (!isEmail(email)) {
    return res.status(400).json({ error: 'invalid email' })
  }

  const { data, error } = await supabase
    .from('submissions')
    .insert([{ artist, song, email, notes }])

  if (error) return res.status(500).json({ error: error.message })
  res.json({ ok: true, data })
})

// Contact endpoint
app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body || {}
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'name, email and message required' })
  }
  if (!isEmail(email)) {
    return res.status(400).json({ error: 'invalid email' })
  }

  const { data, error } = await supabase
    .from('contacts')
    .insert([{ name, email, subject, message }])

  if (error) return res.status(500).json({ error: error.message })
  res.json({ ok: true, data })
})

export default app
