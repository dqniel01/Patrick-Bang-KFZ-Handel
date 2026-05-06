import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import CarCard from '../components/CarCard'
import { DEALER_LINK } from '../services/autoscout'
import { useListings } from '../hooks/useListings'
import heroAudi from '../assets/hero-audi.png'

const reviews = [
  {
    name: 'GG Rent',
    rating: 5,
    date: 'April 2026',
    text: 'Super Händler. Zuverlässigkeit und Qualität sind hier in erster Linie. Alles problemlos innerhalb von wenigen Tagen abgeschlossen. Patrick ist echt sehr zuvorkommend auch bzgl. der Uhrzeiten.',
    platform: 'AutoScout24',
  },
  {
    name: 'GG Rent',
    rating: 5,
    date: 'März 2026',
    text: 'Sehr zuverlässig, freundlich und seriös. Fahrzeug stand abholbereit am vereinbarten Tag vor. Sehr zu empfehlen, wenn man problemlos ein hochwertiges Fahrzeug kaufen möchte.',
    platform: 'AutoScout24',
  },
  {
    name: 'Valentina D.',
    rating: 5,
    date: 'November 2025',
    text: 'Herr Patrick war ein wahrer Profi, er hat uns in allem geholfen und ist eine zuverlässige und ehrliche Person. Hervorragend – wir empfehlen ihn wärmstens weiter!',
    platform: 'AutoScout24',
  },
]

function StarRating({ rating }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <svg key={i} className={`w-4 h-4 ${i < rating ? 'text-gray-900' : 'text-gray-200'}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export default function Home() {
  const { t } = useTranslation()
  const { listings, loading, fromApi, fromScrape } = useListings()
  const featuredCar = listings.find((c) => c.highlight) ?? listings[0]
  const otherCars = listings.filter((c) => c !== featuredCar).slice(0, 5)

  const stats = [
    { value: '100%', label: t('home.stats.reviews') },
    { value: '10+', label: t('home.stats.experience') },
    { value: 'Top', label: t('home.stats.dealer') },
    { value: '0 km', label: t('home.stats.quality') },
  ]

  const [heroBg, setHeroBg] = useState(heroAudi)
  useEffect(() => {
    fetch('/api/hero')
      .then(r => r.ok ? r.json() : null)
      .then(d => { if (d?.url) setHeroBg(d.url) })
      .catch(() => {})
  }, [])

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-screen flex items-end pb-6 text-white overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBg} alt="Audi" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <div className="w-full">
            <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-bold leading-[1.05] mb-10">
              {t('home.headline')}
            </h1>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/fahrzeuge" className="px-8 py-3.5 bg-white text-gray-900 font-semibold text-sm tracking-wide hover:bg-gray-100 transition-colors">
                {t('home.cta_vehicles')}
              </Link>
              <a
                href={DEALER_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3.5 border border-white/40 text-white font-semibold text-sm tracking-wide hover:border-white hover:bg-white/10 transition-colors"
              >
                {t('home.cta_autoscout')}
              </a>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <svg className="w-5 h-5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-gray-950 text-white py-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map(({ value, label }) => (
            <div key={label}>
              <p className="font-display text-3xl font-bold">{value}</p>
              <p className="text-xs text-gray-500 mt-2 uppercase tracking-widest">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Current Listings */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-2">AutoScout24</p>
              <h2 className="font-display text-4xl font-bold text-gray-900">{t('home.listings_title')}</h2>
            </div>
            <a href={DEALER_LINK} target="_blank" rel="noopener noreferrer" className="hidden sm:flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
              {t('home.listings_all')}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>

          {loading ? (
            <div className="mb-8 p-4 bg-gray-50 border border-gray-100 flex items-center gap-3">
              <div className="w-3 h-3 border border-gray-400 border-t-transparent rounded-full animate-spin flex-shrink-0" />
              <p className="text-xs text-gray-400">{t('home.listings_loading')}</p>
            </div>
          ) : fromApi ? (
            <div className="mb-8 p-4 bg-gray-950 text-white flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-green-400 flex-shrink-0 animate-pulse" />
              <p className="text-xs">{t('home.listings_live', { count: listings.length })}</p>
            </div>
          ) : fromScrape ? (
            <div className="mb-8 p-4 bg-gray-950 text-white flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-blue-400 flex-shrink-0 animate-pulse" />
              <p className="text-xs">
                {t('home.listings_scraped', { count: listings.length })} ·{' '}
                <a href={DEALER_LINK} target="_blank" rel="noopener noreferrer" className="underline opacity-60 hover:opacity-100">
                  AutoScout24
                </a>
              </p>
            </div>
          ) : (
            <div className="mb-8 p-4 bg-gray-50 border border-gray-200 flex items-start gap-3">
              <svg className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-xs text-gray-500">
                {t('home.listings_demo')} ·{' '}
                <a href={DEALER_LINK} target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-900">
                  {t('home.listings_link')}
                </a>
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {featuredCar && <CarCard car={featuredCar} />}
            {otherCars.map((car) => <CarCard key={car.id} car={car} />)}
          </div>

          <div className="text-center mt-12">
            <a
              href={DEALER_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-3.5 border border-gray-900 text-gray-900 font-semibold text-sm hover:bg-gray-900 hover:text-white transition-colors"
            >
              {t('home.all_vehicles')}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-3">{t('home.reviews_sub')}</p>
            <h2 className="font-display text-4xl font-bold text-gray-900">{t('home.reviews_title')}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map(({ name, rating, date, text, platform }) => (
              <div key={name + date} className="bg-gray-50 p-8 relative">
                <div className="absolute top-6 right-6">
                  <svg className="w-8 h-8 text-gray-200" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
                <StarRating rating={rating} />
                <p className="mt-4 text-sm text-gray-600 leading-relaxed">{text}</p>
                <div className="mt-6 pt-4 border-t border-gray-200 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{name}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{date}</p>
                  </div>
                  <span className="text-[10px] font-medium text-gray-400 uppercase tracking-widest">{platform}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <a
              href={DEALER_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-500 hover:text-gray-900 transition-colors underline underline-offset-4"
            >
              {t('home.reviews_link')}
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gray-950 text-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-display text-4xl font-bold mb-4">{t('home.cta_title')}</h2>
          <p className="text-gray-400 mb-10 leading-relaxed">{t('home.cta_text')}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/kontakt" className="px-8 py-3.5 bg-white text-gray-900 font-semibold text-sm hover:bg-gray-100 transition-colors">
              {t('home.cta_contact')}
            </Link>
            <a
              href={DEALER_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 border border-gray-700 text-gray-300 font-semibold text-sm hover:border-gray-500 hover:text-white transition-colors"
            >
              {t('home.cta_open')}
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
