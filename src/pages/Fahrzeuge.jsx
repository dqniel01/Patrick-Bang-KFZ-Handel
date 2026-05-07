import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import CarCard from '../components/CarCard'
import { DEALER_LINK, EMBED_URL } from '../services/autoscout'
import { useListings } from '../hooks/useListings'

export default function Fahrzeuge() {
  const { t } = useTranslation()
  const { listings, loading, fromApi, fromScrape } = useListings()
  const [fuel, setFuel] = useState('Alle')
  const [make, setMake] = useState('Alle')
  const [view, setView] = useState('embed')
  const [cookieConsent, setCookieConsent] = useState(localStorage.getItem('cookie_consent'))

  useEffect(() => {
    const handler = () => setCookieConsent(localStorage.getItem('cookie_consent'))
    window.addEventListener('storage', handler)
    return () => window.removeEventListener('storage', handler)
  }, [])

  const FUEL_OPTIONS = [
    { key: 'all', value: 'Alle' },
    { key: 'benzin', value: 'Benzin' },
    { key: 'diesel', value: 'Diesel' },
    { key: 'elektro', value: 'Elektro' },
    { key: 'hybrid', value: 'Hybrid' },
  ]

  const makes = ['Alle', ...new Set(listings.map((c) => c.make))].sort()

  const filtered = listings.filter((c) => {
    if (fuel !== 'Alle' && c.fuel !== fuel) return false
    if (make !== 'Alle' && c.make !== make) return false
    return true
  })

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 bg-gray-950 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-widest mb-3">{t('vehicles.sub')}</p>
          <h1 className="font-display text-5xl font-bold">{t('vehicles.title')}</h1>
          <p className="mt-4 text-gray-400 max-w-xl leading-relaxed">{t('vehicles.desc')}</p>
        </div>
      </section>

      {/* Toolbar */}
      <section className="bg-white border-b border-gray-100 sticky top-20 z-40">
        <div className="max-w-7xl mx-auto px-6 py-3 flex flex-wrap gap-4 items-center">
          <div className="flex border border-gray-200 overflow-hidden">
            <button
              onClick={() => setView('cards')}
              className={`px-4 py-2 text-xs font-medium flex items-center gap-1.5 transition-colors ${view === 'cards' ? 'bg-gray-900 text-white' : 'text-gray-500 hover:bg-gray-50'}`}
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
              {t('vehicles.card_view')}
            </button>
            <button
              onClick={() => setView('embed')}
              className={`px-4 py-2 text-xs font-medium flex items-center gap-1.5 border-l border-gray-200 transition-colors ${view === 'embed' ? 'bg-gray-900 text-white' : 'text-gray-500 hover:bg-gray-50'}`}
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M10 6V8H5V19H16V14H18V20C18 20.5523 17.5523 21 17 21H4C3.44772 21 3 20.5523 3 20V7C3 6.44772 3.44772 6 4 6H10ZM21 3V11H19V6.413L11.207 14.207L9.793 12.793L17.585 5H13V3H21Z"/>
              </svg>
              {t('vehicles.as24_view')}
            </button>
          </div>

          {view === 'cards' && (
            <>
              <div className="flex items-center gap-2">
                <label className="text-xs font-medium text-gray-500 uppercase tracking-widest">{t('vehicles.fuel_label')}</label>
                <div className="flex gap-1">
                  {FUEL_OPTIONS.map(({ key, value }) => (
                    <button
                      key={value}
                      onClick={() => setFuel(value)}
                      className={`px-3 py-1.5 text-xs font-medium transition-colors ${fuel === value ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                    >
                      {t(`vehicles.fuel.${key}`)}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <label className="text-xs font-medium text-gray-500 uppercase tracking-widest">{t('vehicles.make_label')}</label>
                <div className="flex gap-1 flex-wrap">
                  {makes.map((m) => (
                    <button
                      key={m}
                      onClick={() => setMake(m)}
                      className={`px-3 py-1.5 text-xs font-medium transition-colors ${make === m ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                    >
                      {m === 'Alle' ? t('vehicles.fuel.all') : m}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          <a
            href={DEALER_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-gray-900 transition-colors"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M10 6V8H5V19H16V14H18V20C18 20.5523 17.5523 21 17 21H4C3.44772 21 3 20.5523 3 20V7C3 6.44772 3.44772 6 4 6H10ZM21 3V11H19V6.413L11.207 14.207L9.793 12.793L17.585 5H13V3H21Z"/>
            </svg>
            {t('vehicles.open_as24')}
          </a>
        </div>
      </section>

      {/* Kartenansicht */}
      {view === 'cards' && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            {loading ? (
              <div className="flex items-center justify-center py-24 gap-3 text-gray-400">
                <div className="w-4 h-4 border border-gray-400 border-t-transparent rounded-full animate-spin" />
                <span className="text-sm">{t('vehicles.loading')}</span>
              </div>
            ) : fromApi ? (
              <div className="mb-6 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <p className="text-xs text-gray-500">{t('vehicles.live', { count: listings.length })}</p>
              </div>
            ) : fromScrape ? (
              <div className="mb-6 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                <p className="text-xs text-gray-500">
                  {t('vehicles.scraped', { count: listings.length })} ·{' '}
                  <a href={DEALER_LINK} target="_blank" rel="noopener noreferrer" className="underline">AutoScout24</a>
                </p>
              </div>
            ) : (
              <p className="text-xs text-gray-400 mb-6">
                {t('vehicles.demo')} ·{' '}
                <a href={DEALER_LINK} target="_blank" rel="noopener noreferrer" className="underline">
                  {t('vehicles.all_link')}
                </a>
              </p>
            )}

            {!loading && (
              filtered.length === 0 ? (
                <div className="text-center py-24">
                  <p className="text-gray-400 mb-4">{t('vehicles.none_found')}</p>
                  <button
                    onClick={() => { setFuel('Alle'); setMake('Alle') }}
                    className="text-sm font-medium text-gray-900 underline underline-offset-4"
                  >
                    {t('vehicles.reset_filter')}
                  </button>
                </div>
              ) : (
                <>
                  <p className="text-xs text-gray-400 mb-6">{t('vehicles.count', { count: filtered.length })}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {filtered.map((car) => <CarCard key={car.id} car={car} />)}
                  </div>
                </>
              )
            )}

            <div className="mt-16 bg-gray-950 text-white p-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-widest mb-2">AutoScout24</p>
                <h3 className="font-display text-2xl font-bold">{t('vehicles.cta_title')}</h3>
                <p className="text-gray-400 text-sm mt-2">{t('vehicles.cta_desc')}</p>
              </div>
              <a
                href={DEALER_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 px-8 py-3.5 bg-white text-gray-900 font-semibold text-sm hover:bg-gray-100 transition-colors"
              >
                {t('vehicles.cta_button')}
              </a>
            </div>
          </div>
        </section>
      )}

      {/* AutoScout24 Embed */}
      {view === 'embed' && (
        <section className="bg-gray-50 py-8">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-6 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <p className="text-xs text-gray-500">{t('vehicles.embed_live')}</p>
            </div>

            {cookieConsent === 'accepted' ? (
              <>
                <div className="bg-white border border-gray-100 overflow-hidden">
                  <iframe
                    src={EMBED_URL}
                    title="Fahrzeuge von Patrick Bang KFZ-Handel auf AutoScout24"
                    width="100%"
                    height="1200"
                    frameBorder="0"
                    scrolling="auto"
                    loading="lazy"
                    className="w-full"
                  />
                </div>
                <p className="mt-3 text-xs text-gray-400 text-center">
                  {t('vehicles.embed_source')}{' '}
                  <a href={DEALER_LINK} target="_blank" rel="noopener noreferrer" className="underline">autoscout24.de</a>
                </p>
              </>
            ) : (
              <div className="bg-white border border-gray-200 p-12 text-center">
                <p className="text-gray-500 text-sm mb-4">{t('cookies.iframe_blocked')}</p>
                <a
                  href={DEALER_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-gray-900 text-white text-sm font-semibold hover:bg-gray-700 transition-colors"
                >
                  {t('vehicles.open_as24')}
                </a>
              </div>
            )}
          </div>
        </section>
      )}
    </>
  )
}
