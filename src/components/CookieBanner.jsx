import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function CookieBanner() {
  const { t } = useTranslation()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent')
    if (!consent) setVisible(true)
  }, [])

  const accept = () => {
    localStorage.setItem('cookie_consent', 'accepted')
    setVisible(false)
  }

  const decline = () => {
    localStorage.setItem('cookie_consent', 'declined')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] bg-gray-950 border-t border-gray-800 shadow-2xl">
      <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
        <p className="text-sm text-gray-300 leading-relaxed max-w-2xl">
          {t('cookies.text')}{' '}
          <Link to="/datenschutz" className="underline text-gray-400 hover:text-white transition-colors">
            {t('cookies.privacy_link')}
          </Link>
          .
        </p>
        <div className="flex gap-3 flex-shrink-0">
          <button
            onClick={decline}
            className="px-5 py-2 text-sm font-medium text-gray-400 border border-gray-700 hover:border-gray-500 hover:text-white transition-colors"
          >
            {t('cookies.decline')}
          </button>
          <button
            onClick={accept}
            className="px-5 py-2 text-sm font-semibold bg-white text-gray-900 hover:bg-gray-100 transition-colors"
          >
            {t('cookies.accept')}
          </button>
        </div>
      </div>
    </div>
  )
}
