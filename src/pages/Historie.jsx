import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { DEALER_LINK } from '../services/autoscout'

export default function Historie() {
  const { t } = useTranslation()
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/gallery')
      .then(r => r.ok ? r.json() : { images: [] })
      .then(d => { setImages(d.images ?? []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  return (
    <>
      <section className="relative pt-32 pb-16 bg-gray-950 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-widest mb-3">{t('history.sub')}</p>
          <h1 className="font-display text-5xl font-bold">{t('history.title')}</h1>
          <p className="mt-4 text-gray-400 max-w-xl leading-relaxed text-sm">{t('history.desc')}</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {loading && (
            <div className="flex justify-center items-center py-32 text-gray-400 gap-3">
              <div className="w-4 h-4 border border-gray-300 border-t-transparent rounded-full animate-spin" />
              <span className="text-sm">{t('history.loading')}</span>
            </div>
          )}

          {!loading && images.length === 0 && (
            <div className="text-center py-32">
              <div className="w-16 h-16 bg-gray-100 flex items-center justify-center mx-auto mb-5">
                <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-gray-400 text-sm mb-2">{t('history.empty')}</p>
              <p className="text-gray-300 text-xs">
                {t('history.empty_hint', { link: <a href="/upload" className="underline hover:text-gray-600">/upload</a> })}
              </p>
            </div>
          )}

          {!loading && images.length > 0 && (
            <>
              <p className="text-xs text-gray-400 mb-8">{t('history.count', { count: images.length })}</p>
              <div className="columns-2 sm:columns-3 lg:columns-4 gap-3 space-y-3">
                {images.map(({ url, name }) => (
                  <div key={name} className="break-inside-avoid overflow-hidden group relative bg-gray-100">
                    <img src={url} alt={name} loading="lazy" className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <section className="py-16 bg-gray-50 border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-gray-500 text-sm mb-6">{t('history.cta_text')}</p>
          <a
            href={DEALER_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-gray-900 text-white font-semibold text-sm hover:bg-gray-800 transition-colors"
          >
            {t('history.cta_button')}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </section>
    </>
  )
}
