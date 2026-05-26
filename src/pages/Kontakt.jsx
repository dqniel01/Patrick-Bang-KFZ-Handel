import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { DEALER_LINK } from '../services/autoscout'

export default function Kontakt() {
  const { t } = useTranslation()
  const [form, setForm] = useState({ name: '', telefon: '', email: '', fahrzeug: '', nachricht: '', datenschutz: false })
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)
    setError(null)
    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          'form-name': 'contact',
          name: form.name,
          email: form.email,
          telefon: form.telefon,
          fahrzeug: form.fahrzeug,
          nachricht: form.nachricht,
        }).toString(),
      })
      if (!res.ok) throw new Error('Senden fehlgeschlagen')
      setSubmitted(true)
    } catch (err) {
      setError(err.message)
    } finally {
      setSending(false)
    }
  }

  return (
    <>
      <section className="relative pt-32 pb-16 bg-gray-950 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-widest mb-3">{t('contact.sub')}</p>
          <h1 className="font-display text-5xl font-bold">{t('contact.title')}</h1>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20">
          {/* Info */}
          <div>
            <h2 className="font-display text-3xl font-bold text-gray-900 mb-8">{t('contact.reach_title')}</h2>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-gray-100 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{t('contact.phone_label')}</p>
                  <a href="tel:+491702972977" className="text-gray-700 text-sm hover:text-gray-900 transition-colors block mt-0.5">+49 170 2972977</a>
                  <a href="mailto:patrick.bang@icloud.com" className="text-gray-500 text-sm hover:text-gray-900 transition-colors block mt-0.5">patrick.bang@icloud.com</a>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 bg-gray-100 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{t('contact.online_label')}</p>
                  <a href={DEALER_LINK} target="_blank" rel="noopener noreferrer" className="text-gray-500 text-sm hover:text-gray-900 transition-colors mt-0.5 block">
                    AutoScout24 →
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-12 bg-gray-950 text-white p-7">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-widest mb-3">{t('contact.as24_sub')}</p>
              <p className="font-display text-xl font-bold mb-3">{t('contact.as24_title')}</p>
              <p className="text-gray-400 text-sm leading-relaxed mb-5">{t('contact.as24_desc')}</p>
              <a
                href={DEALER_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-white text-gray-900 font-semibold text-sm hover:bg-gray-100 transition-colors"
              >
                {t('contact.as24_button')}
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>

          {/* Form */}
          <div className="bg-gray-50 p-8">
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-16">
                <div className="w-14 h-14 bg-gray-900 flex items-center justify-center mb-5">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-display text-2xl font-bold text-gray-900 mb-2">{t('contact.success_title')}</h3>
                <p className="text-gray-500 text-sm leading-relaxed max-w-xs">{t('contact.success_text')}</p>
              </div>
            ) : (
              <>
                <h2 className="font-display text-2xl font-bold text-gray-900 mb-6">{t('contact.form_title')}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-500 uppercase tracking-widest mb-1.5">{t('contact.name')} *</label>
                      <input type="text" name="name" required value={form.name} onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-200 bg-white text-sm focus:outline-none focus:border-gray-900 transition-colors"
                        placeholder={t('contact.name')} />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 uppercase tracking-widest mb-1.5">{t('contact.phone')}</label>
                      <input type="tel" name="telefon" value={form.telefon} onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-200 bg-white text-sm focus:outline-none focus:border-gray-900 transition-colors"
                        placeholder="+49 ..." />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 uppercase tracking-widest mb-1.5">{t('contact.email')} *</label>
                    <input type="email" name="email" required value={form.email} onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-gray-200 bg-white text-sm focus:outline-none focus:border-gray-900 transition-colors"
                      placeholder="ihre@email.de" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 uppercase tracking-widest mb-1.5">{t('contact.vehicle')}</label>
                    <input type="text" name="fahrzeug" value={form.fahrzeug} onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-gray-200 bg-white text-sm focus:outline-none focus:border-gray-900 transition-colors"
                      placeholder={t('contact.vehicle_placeholder')} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 uppercase tracking-widest mb-1.5">{t('contact.message')} *</label>
                    <textarea name="nachricht" required rows={5} value={form.nachricht} onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-gray-200 bg-white text-sm focus:outline-none focus:border-gray-900 transition-colors resize-none"
                      placeholder={t('contact.message_placeholder')} />
                  </div>
                  <div className="flex items-start gap-3">
                    <input type="checkbox" name="datenschutz" id="datenschutz" required checked={form.datenschutz} onChange={handleChange} className="mt-1" />
                    <label htmlFor="datenschutz" className="text-xs text-gray-500 leading-relaxed">
                      {t('contact.privacy_text', {
                        link: <a href="/datenschutz" className="text-gray-900 underline underline-offset-2">{t('contact.privacy_link')}</a>
                      })}
                    </label>
                  </div>
                  {error && (
                    <p className="text-red-600 text-xs bg-red-50 border border-red-200 px-4 py-2">
                      {error}
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full py-3 bg-gray-900 text-white font-semibold text-sm hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {sending && <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
                    {sending ? '...' : t('contact.submit')}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
