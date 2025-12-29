import express from 'express'
import cors from 'cors'
import fs from 'fs/promises'
import path from 'path'

const app = express()
app.use(cors())
app.use(express.json())

const DATA_DIR = path.resolve('./server/data')
const SUBMISSIONS_FILE = path.join(DATA_DIR, 'submissions.json')
const CONTACTS_FILE = path.join(DATA_DIR, 'contacts.json')

async function ensureDataFiles() {
  await fs.mkdir(DATA_DIR, { recursive: true })
  try {
    await fs.access(SUBMISSIONS_FILE)
  } catch {
    await fs.writeFile(SUBMISSIONS_FILE, '[]')
  }
  try {
    await fs.access(CONTACTS_FILE)
  } catch {
    await fs.writeFile(CONTACTS_FILE, '[]')
  }
}

async function appendJson(file, obj) {
  const raw = await fs.readFile(file, 'utf8').catch(() => '[]')
  const arr = JSON.parse(raw || '[]')
  arr.push(obj)
  await fs.writeFile(file, JSON.stringify(arr, null, 2))
}

function isEmail(val) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)
}

app.post('/api/submit', async (req, res) => {
  const { artist, song, email, notes } = req.body || {}
  if (!artist || !song || !email) {
    return res.status(400).json({ error: 'artist, song and email required' })
  }
  if (!isEmail(email)) {
    return res.status(400).json({ error: 'invalid email' })
  }

  try {
    await ensureDataFiles()
    await appendJson(SUBMISSIONS_FILE, { artist, song, email, notes, createdAt: new Date().toISOString() })
    return res.json({ ok: true })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'failed to save' })
  }
})

app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body || {}
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'name, email and message required' })
  }
  if (!isEmail(email)) {
    return res.status(400).json({ error: 'invalid email' })
  }

  try {
    await ensureDataFiles()
    await appendJson(CONTACTS_FILE, { name, email, subject, message, createdAt: new Date().toISOString() })
    return res.json({ ok: true })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'failed to save' })
  }
})

const port = process.env.PORT || 4000
app.listen(port, () => console.log(`Server listening on http://localhost:${port}`))
