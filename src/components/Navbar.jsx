import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import logo from '../assets/Logo.PNG'

const LANGUAGES = [
  { code: 'de', label: 'DE' },
  { code: 'it', label: 'IT' },
  { code: 'fr', label: 'FR' },
  { code: 'es', label: 'ES' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const { t, i18n } = useTranslation()

  const links = [
    { to: '/', label: t('nav.home') },
    { to: '/fahrzeuge', label: t('nav.vehicles') },
    { to: '/ueber-uns', label: t('nav.about') },
    { to: '/historie', label: t('nav.history') },
    { to: '/kontakt', label: t('nav.contact') },
  ]

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [location])

  const isHome = location.pathname === '/'

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-100'
          : isHome
          ? 'bg-transparent'
          : 'bg-white border-b border-gray-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-20">
        {/* Logo / Brand */}
        <Link
          to="/"
          className="flex items-center"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <img
            src={logo}
            alt="Patrick Bang KFZ-Handel"
            className={`h-40 w-auto object-contain transition-all duration-300 ${
              !scrolled && isHome ? 'brightness-0 invert' : ''
            }`}
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`text-sm font-medium tracking-wide transition-colors ${
                location.pathname === to
                  ? !scrolled && isHome ? 'text-white border-b border-white pb-0.5' : 'text-gray-900 border-b border-gray-900 pb-0.5'
                  : !scrolled && isHome
                  ? 'text-gray-300 hover:text-white'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              {label}
            </Link>
          ))}
          <a
            href="https://www.autoscout24.de/haendler/patrick-bang-kfz-handel"
            target="_blank"
            rel="noopener noreferrer"
            className={`ml-2 px-5 py-2 text-sm font-semibold border transition-colors ${
              !scrolled && isHome
                ? 'border-white text-white hover:bg-white hover:text-gray-900'
                : 'border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white'
            }`}
          >
            {t('nav.autoscout')}
          </a>

          {/* WhatsApp */}
          <a
            href="https://wa.me/491702972977"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className={`ml-1 p-2 rounded-full transition-colors ${
              !scrolled && isHome
                ? 'text-gray-300 hover:text-white'
                : 'text-gray-500 hover:text-green-600'
            }`}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </a>

          {/* Language switcher */}
          <div className="flex items-center gap-1 ml-2">
            {LANGUAGES.map(({ code, label }) => (
              <button
                key={code}
                onClick={() => i18n.changeLanguage(code)}
                className={`text-xs font-medium px-2 py-1 transition-colors ${
                  i18n.language === code
                    ? !scrolled && isHome ? 'text-white underline' : 'text-gray-900 underline'
                    : !scrolled && isHome ? 'text-gray-400 hover:text-white' : 'text-gray-400 hover:text-gray-900'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </nav>

        {/* Mobile burger */}
        <button
          className={`md:hidden flex flex-col gap-1.5 p-2 ${!scrolled && isHome ? 'text-white' : 'text-gray-800'}`}
          onClick={() => setOpen(!open)}
          aria-label="Menü öffnen"
        >
          <span className={`block w-6 h-0.5 bg-current transition-transform duration-300 ${open ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-current transition-opacity duration-300 ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-current transition-transform duration-300 ${open ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-100">
          {links.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`block px-6 py-4 text-sm font-medium border-b border-gray-50 ${
                location.pathname === to ? 'text-gray-900' : 'text-gray-500'
              }`}
            >
              {label}
            </Link>
          ))}
          <div className="px-6 py-4">
            <a
              href="https://www.autoscout24.de/haendler/patrick-bang-kfz-handel"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center px-5 py-2.5 border border-gray-900 text-gray-900 text-sm font-semibold"
            >
              {t('nav.autoscout')}
            </a>
          </div>
          {/* Mobile WhatsApp */}
          <a
            href="https://wa.me/491702972977"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-6 py-4 text-sm font-medium text-green-600 border-b border-gray-50"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            WhatsApp
          </a>

          {/* Mobile language switcher */}
          <div className="px-6 py-3 flex gap-3 border-t border-gray-100">
            {LANGUAGES.map(({ code, label }) => (
              <button
                key={code}
                onClick={() => i18n.changeLanguage(code)}
                className={`text-xs font-medium px-2 py-1 ${
                  i18n.language === code ? 'text-gray-900 underline' : 'text-gray-400'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
