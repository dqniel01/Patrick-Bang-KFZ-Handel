import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function Footer() {
  const { t } = useTranslation()

  const navLinks = [
    ['/', t('nav.home')],
    ['/fahrzeuge', t('nav.vehicles')],
    ['/ueber-uns', t('nav.about')],
    ['/historie', t('nav.history')],
    ['/kontakt', t('nav.contact')],
    ['/impressum', t('footer.imprint')],
    ['/datenschutz', t('footer.privacy')],
  ]

  return (
    <footer className="bg-gray-950 text-gray-400">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand */}
        <div className="md:col-span-2">
          <div className="mb-5">
            <p className="font-display text-xl font-bold text-white">Patrick Bang</p>
            <p className="text-xs tracking-[0.15em] uppercase text-gray-500 mt-0.5">KFZ-Handel</p>
          </div>
          <p className="text-sm leading-relaxed text-gray-500 max-w-xs">{t('footer.desc')}</p>
          <a
            href="https://www.autoscout24.de/haendler/patrick-bang-kfz-handel"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-6 text-xs font-medium text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M10 6V8H5V19H16V14H18V20C18 20.5523 17.5523 21 17 21H4C3.44772 21 3 20.5523 3 20V7C3 6.44772 3.44772 6 4 6H10ZM21 3V11H19V6.413L11.207 14.207L9.793 12.793L17.585 5H13V3H21Z"/>
            </svg>
            {t('footer.view_as24')}
          </a>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-white font-semibold text-xs uppercase tracking-widest mb-5">{t('footer.nav_title')}</h3>
          <ul className="space-y-3 text-sm">
            {navLinks.map(([to, label]) => (
              <li key={to}>
                <Link to={to} className="hover:text-white transition-colors">{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-white font-semibold text-xs uppercase tracking-widest mb-5">{t('footer.contact_title')}</h3>
          <address className="not-italic text-sm space-y-3 text-gray-500">
            <p>
              <a href="tel:+491702972977" className="hover:text-white transition-colors">+49 170 2972977</a>
            </p>
            <p>
              <a href="mailto:patrick.bang@icloud.com" className="hover:text-white transition-colors">patrick.bang@icloud.com</a>
            </p>
            <p>
              <a
                href="https://www.autoscout24.de/haendler/patrick-bang-kfz-handel"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                AutoScout24-Profil
              </a>
            </p>
          </address>
        </div>
      </div>

      <div className="border-t border-gray-900">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-gray-600">
          <p>{t('footer.rights', { year: new Date().getFullYear() })}</p>
          <div className="flex gap-4">
            <Link to="/impressum" className="hover:text-gray-400 transition-colors">{t('footer.imprint')}</Link>
            <Link to="/datenschutz" className="hover:text-gray-400 transition-colors">{t('footer.privacy')}</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
