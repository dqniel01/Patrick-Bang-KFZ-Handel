import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function About() {
  const { t } = useTranslation()

  const values = [
    { key: 'transparency' },
    { key: 'quality' },
    { key: 'contact' },
    { key: 'price' },
  ]

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-black">
        <div className="max-w-7xl mx-auto px-6 text-white">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-3">{t('about.sub')}</p>
          <h1 className="font-display text-5xl font-bold">{t('about.title')}</h1>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-3">{t('about.values_sub')}</p>
            <h2 className="font-display text-4xl font-bold text-gray-900">{t('about.values_title')}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map(({ key }) => (
              <div key={key} className="bg-white p-8 border border-gray-100 hover:border-gray-300 transition-colors">
                <div className="w-8 h-px bg-gray-900 mb-5" />
                <h3 className="font-display text-xl font-bold text-gray-900 mb-3">{t(`about.values.${key}.title`)}</h3>
                <p className="text-gray-500 leading-relaxed text-sm">{t(`about.values.${key}.desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AutoScout24 presence */}
      <section className="py-24 bg-gray-950 text-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-widest mb-4">{t('about.as24_sub')}</p>
            <h2 className="font-display text-3xl font-bold mb-5 leading-tight">{t('about.as24_title')}</h2>
            <p className="text-gray-400 leading-relaxed text-sm mb-8">{t('about.as24_desc')}</p>
            <a
              href="https://www.autoscout24.de/haendler/patrick-bang-kfz-handel"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-3.5 bg-white text-gray-900 font-semibold text-sm hover:bg-gray-100 transition-colors"
            >
              {t('about.as24_button')}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
          <div className="flex-shrink-0 md:w-64">
            <div className="bg-white/5 border border-white/10 p-8 text-center">
              <p className="font-display text-5xl font-bold text-white">4,99</p>
              <div className="flex justify-center gap-1 mt-2">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-1">52 {t('about.ratings')}</p>
              <p className="text-xs text-gray-600 mt-2 uppercase tracking-widest">AutoScout24</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-display text-3xl font-bold text-gray-900 mb-4">{t('about.cta_title')}</h2>
          <p className="text-gray-500 mb-8 text-sm leading-relaxed">{t('about.cta_desc')}</p>
          <Link to="/kontakt" className="inline-block px-8 py-3.5 bg-gray-900 text-white font-semibold text-sm hover:bg-gray-800 transition-colors">
            {t('about.cta_button')}
          </Link>
        </div>
      </section>
    </>
  )
}
