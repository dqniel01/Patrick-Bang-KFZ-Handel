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
        <Link to="/" className="flex items-center">
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
