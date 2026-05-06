import { useState, useRef } from 'react'

function UploadZone({ type, label, description, onSuccess }) {
  const [password, setPassword]   = useState('')
  const [preview, setPreview]     = useState(null)
  const [file, setFile]           = useState(null)
  const [status, setStatus]       = useState(null)  // null | 'loading' | 'ok' | 'error'
  const [message, setMessage]     = useState('')
  const inputRef                  = useRef()

  function handleFile(f) {
    if (!f) return
    setFile(f)
    setPreview(URL.createObjectURL(f))
    setStatus(null)
    setMessage('')
  }

  function handleDrop(e) {
    e.preventDefault()
    handleFile(e.dataTransfer.files[0])
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!file) return setMessage('Bitte zuerst ein Bild auswählen.')
    if (!password) return setMessage('Bitte das Passwort eingeben.')

    setStatus('loading')
    setMessage('')

    const fd = new FormData()
    fd.append('type', type)
    fd.append('password', password)
    fd.append('file', file)

    try {
      const res  = await fetch('/api/upload', { method: 'POST', body: fd })
      const data = await res.json()
      if (!res.ok) {
        setStatus('error')
        setMessage(data.error ?? 'Unbekannter Fehler.')
      } else {
        setStatus('ok')
        setMessage(type === 'hero'
          ? 'Hero-Bild wurde aktualisiert. Beim nächsten Seitenaufruf ist es live.'
          : 'Bild wurde zur Fahrzeughistorie hinzugefügt.')
        setFile(null)
        if (onSuccess) onSuccess(data.url)
      }
    } catch {
      setStatus('error')
      setMessage('Server nicht erreichbar. Ist der Server gestartet?')
    }
  }

  return (
    <div className="bg-white border border-gray-100 p-8">
      <h2 className="font-display text-2xl font-bold text-gray-900 mb-1">{label}</h2>
      <p className="text-sm text-gray-400 mb-6">{description}</p>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Dropzone */}
        <div
          onClick={() => inputRef.current.click()}
          onDrop={handleDrop}
          onDragOver={e => e.preventDefault()}
          className="border-2 border-dashed border-gray-200 hover:border-gray-400 transition-colors cursor-pointer rounded-sm overflow-hidden"
        >
          {preview ? (
            <div className="relative">
              <img src={preview} alt="Vorschau" className="w-full max-h-72 object-cover" />
              <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors flex items-center justify-center">
                <span className="opacity-0 hover:opacity-100 text-white text-xs font-medium bg-black/60 px-3 py-1">
                  Anderes Bild wählen
                </span>
              </div>
            </div>
          ) : (
            <div className="py-14 flex flex-col items-center gap-3 text-gray-400">
              <svg className="w-10 h-10 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-sm">Bild hierher ziehen oder klicken</p>
              <p className="text-xs text-gray-300">JPG, PNG, WEBP · max. 15 MB</p>
            </div>
          )}
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={e => handleFile(e.target.files[0])}
          />
        </div>

        {/* Passwort */}
        <div>
          <label className="block text-xs font-medium text-gray-500 uppercase tracking-widest mb-1.5">
            Passwort
          </label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full px-4 py-2.5 border border-gray-200 text-sm focus:outline-none focus:border-gray-900 transition-colors"
          />
        </div>

        {/* Status */}
        {message && (
          <div className={`p-3 text-xs flex items-start gap-2 ${
            status === 'ok'    ? 'bg-gray-950 text-white' :
            status === 'error' ? 'bg-red-50 text-red-700 border border-red-200' :
            'text-gray-500'
          }`}>
            {status === 'ok' && (
              <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            )}
            {message}
          </div>
        )}

        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full py-3 bg-gray-900 text-white font-semibold text-sm hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {status === 'loading' ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Wird hochgeladen …
            </>
          ) : (
            type === 'hero' ? 'Hero-Bild hochladen' : 'Zur Historie hinzufügen'
          )}
        </button>
      </form>
    </div>
  )
}

export default function Upload() {
  const [galleryCount, setGalleryCount] = useState(null)

  return (
    <>
      <section className="pt-32 pb-16 bg-gray-950 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-widest mb-3">Interner Bereich</p>
          <h1 className="font-display text-5xl font-bold">Bilder verwalten</h1>
          <p className="mt-3 text-gray-400 text-sm">Diese Seite ist nur für dich – das Passwort steht in der .env Datei.</p>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 space-y-8">
          <UploadZone
            type="hero"
            label="Dashboard-Hintergrundbild"
            description="Ersetzt das große Bild auf der Startseite. Empfohlen: Querformat, mindestens 1920 × 1080 px."
          />
          <UploadZone
            type="gallery"
            label="Fahrzeughistorie – Bild hinzufügen"
            description="Fügt ein Bild zur Kollage auf der Historien-Seite hinzu. Beliebig viele möglich."
            onSuccess={() => setGalleryCount(c => (c ?? 0) + 1)}
          />
          {galleryCount > 0 && (
            <p className="text-center text-xs text-gray-400">
              {galleryCount} Bild{galleryCount > 1 ? 'er' : ''} in dieser Sitzung hinzugefügt ·{' '}
              <a href="/historie" className="underline hover:text-gray-600">Fahrzeughistorie ansehen</a>
            </p>
          )}
        </div>
      </section>
    </>
  )
}
