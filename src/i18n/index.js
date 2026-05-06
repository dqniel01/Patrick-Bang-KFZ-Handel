import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import de from './de.json'
import it from './it.json'
import fr from './fr.json'
import es from './es.json'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: { de: { translation: de }, it: { translation: it }, fr: { translation: fr }, es: { translation: es } },
    fallbackLng: 'de',
    supportedLngs: ['de', 'it', 'fr', 'es'],
    interpolation: { escapeValue: false },
    detection: { order: ['navigator', 'localStorage'], caches: ['localStorage'] },
  })

export default i18n
