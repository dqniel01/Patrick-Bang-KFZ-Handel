/**
 * Patrick Bang KFZ-Handel – Backend-Server
 *
 * Routen:
 *   GET  /api/listings        → Inserate von AutoScout24 scrapen
 *   GET  /api/gallery         → Liste der Fahrzeughistorie-Bilder
 *   POST /upload              → Bild hochladen (passwortgeschützt)
 *   GET  /uploads/*           → Hochgeladene Bilder ausliefern
 *   GET  /*                   → Frontend aus dist/ ausliefern (Produktion)
 *
 * Starten (Entwicklung):  npm run dev:full
 * Starten (Produktion):   node --env-file=.env server/index.js
 */

import http          from 'http'
import fs            from 'fs'
import path          from 'path'
import busboy        from 'busboy'
import nodemailer    from 'nodemailer'
import { scrapeListings } from './scrape.js'

const PORT         = process.env.PORT ?? 3001
const PASSWORD     = process.env.UPLOAD_PASSWORD
const MAIL_USER    = process.env.MAIL_USER
const MAIL_PASS    = process.env.MAIL_PASS

// Nodemailer – iCloud SMTP
const mailer = nodemailer.createTransport({
  host: 'smtp.mail.me.com',
  port: 587,
  secure: false,
  auth: { user: MAIL_USER, pass: MAIL_PASS },
})
const UPLOADS_DIR  = path.join(import.meta.dirname, 'uploads')
const GALLERY_DIR  = path.join(UPLOADS_DIR, 'gallery')
const DIST_DIR     = path.join(import.meta.dirname, '..', 'dist')

// Verzeichnisse sicherstellen
fs.mkdirSync(GALLERY_DIR, { recursive: true })

// ---------------------------------------------------------------------------
// Hilfsfunktionen
// ---------------------------------------------------------------------------

const MIME = {
  '.html': 'text/html',
  '.js':   'application/javascript',
  '.css':  'text/css',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg':  'image/svg+xml',
  '.ico':  'image/x-icon',
  '.json': 'application/json',
}

function cors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
}

function json(res, status, data) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.writeHead(status)
  res.end(JSON.stringify(data))
}

// Statische Datei aus dist/ ausliefern (Produktion)
function serveStatic(res, filePath) {
  if (!fs.existsSync(filePath)) {
    // SPA-Fallback: alle unbekannten Routen → index.html
    const index = path.join(DIST_DIR, 'index.html')
    if (fs.existsSync(index)) {
      res.setHeader('Content-Type', 'text/html')
      res.writeHead(200)
      fs.createReadStream(index).pipe(res)
    } else {
      res.writeHead(404)
      res.end('Not found')
    }
    return
  }
  const ext  = path.extname(filePath).toLowerCase()
  const mime = MIME[ext] ?? 'application/octet-stream'
  res.setHeader('Content-Type', mime)
  // Statische Assets lange cachen, HTML nie
  res.setHeader('Cache-Control', ext === '.html' ? 'no-cache' : 'public, max-age=31536000, immutable')
  res.writeHead(200)
  fs.createReadStream(filePath).pipe(res)
}

// Bild-Datei aus uploads/ ausliefern
function serveUpload(res, relativePath) {
  const filePath = path.join(UPLOADS_DIR, relativePath)
  // Pfad-Traversal verhindern
  if (!filePath.startsWith(UPLOADS_DIR)) {
    res.writeHead(403); res.end(); return
  }
  if (!fs.existsSync(filePath)) {
    res.writeHead(404); res.end(); return
  }
  const ext  = path.extname(filePath).toLowerCase()
  const mime = MIME[ext] ?? 'application/octet-stream'
  res.setHeader('Content-Type', mime)
  res.setHeader('Cache-Control', 'no-cache')
  res.writeHead(200)
  fs.createReadStream(filePath).pipe(res)
}

// ---------------------------------------------------------------------------
// Handler: POST /upload
// ---------------------------------------------------------------------------

function handleUpload(req, res) {
  if (!PASSWORD) {
    req.resume()
    return json(res, 500, { error: 'UPLOAD_PASSWORD ist nicht in .env gesetzt.' })
  }

  const bb = busboy({ headers: req.headers, limits: { fileSize: 15 * 1024 * 1024 } })
  let uploadType   = null
  let providedPass = null
  let mimeType_    = null
  let tempPath     = null
  let fileExt      = '.jpg'
  let sizeError    = false
  let mimeError    = false
  let fileWriteDone = false
  let bbFinished    = false

  function respond() {
    // Only respond once both busboy AND the file write stream have finished,
    // so the entire request body has been consumed (prevents EPIPE in Vite proxy).
    if (!fileWriteDone || !bbFinished) return

    if (mimeError) {
      return json(res, 400, { error: 'Nur JPEG, PNG oder WEBP erlaubt.' })
    }
    if (!tempPath) {
      return json(res, 400, { error: 'Keine Datei empfangen.' })
    }
    if (sizeError) {
      fs.existsSync(tempPath) && fs.unlinkSync(tempPath)
      return json(res, 400, { error: 'Datei zu groß (max. 15 MB).' })
    }
    if (providedPass !== PASSWORD) {
      fs.existsSync(tempPath) && fs.unlinkSync(tempPath)
      return json(res, 401, { error: 'Falsches Passwort.' })
    }

    if (uploadType === 'hero') {
      const savedFile = path.join(UPLOADS_DIR, `hero${fileExt}`)
      for (const f of fs.readdirSync(UPLOADS_DIR)) {
        if (f.startsWith('hero.') && path.join(UPLOADS_DIR, f) !== savedFile) {
          fs.unlinkSync(path.join(UPLOADS_DIR, f))
        }
      }
      fs.renameSync(tempPath, savedFile)
      console.log(`[Upload] Neues Hero-Bild: ${savedFile}`)
      return json(res, 200, { ok: true, type: 'hero', url: `/uploads/hero${fileExt}` })

    } else if (uploadType === 'gallery') {
      const savedFile = path.join(GALLERY_DIR, `${Date.now()}${fileExt}`)
      fs.renameSync(tempPath, savedFile)
      console.log(`[Upload] Neues Galerie-Bild: ${savedFile}`)
      return json(res, 200, { ok: true, type: 'gallery', url: `/uploads/gallery/${path.basename(savedFile)}` })

    } else {
      fs.existsSync(tempPath) && fs.unlinkSync(tempPath)
      return json(res, 400, { error: 'type muss "hero" oder "gallery" sein.' })
    }
  }

  bb.on('field', (name, val) => {
    if (name === 'password') providedPass = val
    if (name === 'type')     uploadType   = val
  })

  bb.on('file', (fieldname, fileStream, { filename, mimeType }) => {
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(mimeType)) {
      mimeError = true
      fileStream.resume()
      fileWriteDone = true  // no file to wait for
      respond()
      return
    }

    fileExt  = path.extname(filename).toLowerCase() || '.jpg'
    tempPath = path.join(UPLOADS_DIR, `_tmp_${Date.now()}${fileExt}`)
    const ws = fs.createWriteStream(tempPath)

    fileStream.on('limit', () => { sizeError = true })
    fileStream.pipe(ws)

    ws.on('close', () => {
      fileWriteDone = true
      respond()
    })
  })

  bb.on('finish', () => {
    bbFinished = true
    if (!tempPath && !mimeError) fileWriteDone = true  // no file part at all
    respond()
  })

  bb.on('error', (err) => {
    console.error('[Upload] Fehler:', err)
    if (!res.headersSent) json(res, 500, { error: 'Upload fehlgeschlagen.' })
  })

  req.pipe(bb)
}

// ---------------------------------------------------------------------------
// Handler: POST /api/contact
// ---------------------------------------------------------------------------

function handleContact(req, res) {
  if (!MAIL_USER || !MAIL_PASS) {
    return json(res, 500, { error: 'E-Mail nicht konfiguriert. MAIL_USER und MAIL_PASS in .env setzen.' })
  }

  let body = ''
  req.on('data', chunk => { body += chunk })
  req.on('end', async () => {
    try {
      const { name, email, telefon, fahrzeug, nachricht } = JSON.parse(body)

      if (!name || !email || !nachricht) {
        return json(res, 400, { error: 'Name, E-Mail und Nachricht sind Pflichtfelder.' })
      }

      await mailer.sendMail({
        from: `"Patrick Bang KFZ-Handel" <${MAIL_USER}>`,
        to: MAIL_USER,
        replyTo: email,
        subject: fahrzeug
          ? `Anfrage zu: ${fahrzeug} – von ${name}`
          : `Kontaktanfrage von ${name}`,
        text: [
          `Name:      ${name}`,
          `E-Mail:    ${email}`,
          `Telefon:   ${telefon || '–'}`,
          `Fahrzeug:  ${fahrzeug || '–'}`,
          '',
          'Nachricht:',
          nachricht,
        ].join('\n'),
        html: `
          <table style="font-family:sans-serif;font-size:14px;color:#222;border-collapse:collapse">
            <tr><td style="padding:4px 12px 4px 0;color:#888">Name</td><td><strong>${name}</strong></td></tr>
            <tr><td style="padding:4px 12px 4px 0;color:#888">E-Mail</td><td><a href="mailto:${email}">${email}</a></td></tr>
            <tr><td style="padding:4px 12px 4px 0;color:#888">Telefon</td><td>${telefon || '–'}</td></tr>
            <tr><td style="padding:4px 12px 4px 0;color:#888">Fahrzeug</td><td>${fahrzeug || '–'}</td></tr>
          </table>
          <hr style="margin:16px 0;border:none;border-top:1px solid #eee"/>
          <p style="font-family:sans-serif;font-size:14px;white-space:pre-wrap">${nachricht.replace(/</g,'&lt;')}</p>
        `,
      })

      console.log(`[Kontakt] E-Mail von ${name} <${email}> gesendet.`)
      json(res, 200, { ok: true })
    } catch (err) {
      console.error('[Kontakt] Fehler:', err.message)
      json(res, 500, { error: 'E-Mail konnte nicht gesendet werden.' })
    }
  })
}

// ---------------------------------------------------------------------------
// Handler: GET /api/gallery
// ---------------------------------------------------------------------------

function handleGallery(res) {
  const files = fs.existsSync(GALLERY_DIR)
    ? fs.readdirSync(GALLERY_DIR)
        .filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f))
        .sort()
        .map(f => ({ url: `/uploads/gallery/${f}`, name: f }))
    : []
  json(res, 200, { images: files })
}

// ---------------------------------------------------------------------------
// Handler: GET /api/hero
// – liefert die URL des aktuellen Hero-Bildes (falls hochgeladen)
// ---------------------------------------------------------------------------

function handleHero(res) {
  const file = fs.readdirSync(UPLOADS_DIR)
    .find(f => /^hero\.(jpg|jpeg|png|webp)$/i.test(f))
  if (file) {
    json(res, 200, { url: `/uploads/${file}` })
  } else {
    json(res, 404, { url: null })
  }
}

// ---------------------------------------------------------------------------
// HTTP Server
// ---------------------------------------------------------------------------

const server = http.createServer(async (req, res) => {
  res.on('error', () => {})
  cors(res)

  if (req.method === 'OPTIONS') { res.writeHead(204); res.end(); return }

  const url = new URL(req.url, `http://localhost:${PORT}`)
  const p   = url.pathname

  // --- API ---
  if (p === '/api/listings' && req.method === 'GET') {
    console.log('[Scraper] Fetching AS24 …')
    try {
      const listings = await scrapeListings()
      console.log(`[Scraper] ${listings.length} Inserate`)
      return json(res, 200, { listings, source: 'scrape' })
    } catch (err) {
      console.error('[Scraper]', err.message)
      return json(res, 500, { error: err.message })
    }
  }

  if (p === '/api/contact' && req.method === 'POST') {
    return handleContact(req, res)
  }

  if (p === '/api/gallery' && req.method === 'GET') {
    return handleGallery(res)
  }

  if (p === '/api/hero' && req.method === 'GET') {
    return handleHero(res)
  }

  if (p === '/api/upload' && req.method === 'POST') {
    return handleUpload(req, res)
  }

  // --- Uploads-Verzeichnis ---
  if (p.startsWith('/uploads/')) {
    return serveUpload(res, p.replace('/uploads/', ''))
  }

  // --- Frontend (Produktion: dist/) ---
  const staticPath = path.join(DIST_DIR, p === '/' ? 'index.html' : p)
  serveStatic(res, staticPath)
})

server.listen(PORT, () => {
  console.log(`\n[Server] http://localhost:${PORT}`)
  console.log(`[Server] Upload-Passwort: ${PASSWORD ? '✓ gesetzt' : '✗ UPLOAD_PASSWORD fehlt in .env!'}`)
  console.log(`[Server] Uploads-Ordner:  ${UPLOADS_DIR}\n`)
})
