import { useState, useEffect } from 'react'
import {
  fetchListings,
  fetchScrapedListings,
  SAMPLE_LISTINGS,
  isApiConfigured,
} from '../services/autoscout'

/**
 * Lädt Inserate mit folgender Priorität:
 *   1. AutoScout24 Dealer-API  (wenn .env konfiguriert)
 *   2. Web-Scraping via lokalem Proxy  (wenn Scraper-Server läuft)
 *   3. SAMPLE_LISTINGS als statischer Fallback
 *
 * `source` gibt an woher die Daten kommen: 'api' | 'scrape' | 'sample'
 */
export function useListings() {
  const [listings, setListings] = useState([])
  const [loading, setLoading]   = useState(true)
  const [source, setSource]     = useState(null)   // 'api' | 'scrape' | 'sample'
  const [error, setError]       = useState(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      setLoading(true)
      setError(null)

      // --- 1. Offizielle API ---
      if (isApiConfigured) {
        try {
          const data = await fetchListings()
          if (!cancelled && data.length > 0) {
            setListings(data)
            setSource('api')
            setLoading(false)
            return
          }
        } catch (err) {
          console.warn('[useListings] API nicht erreichbar:', err.message)
        }
      }

      // --- 2. Scraping via lokalen Proxy ---
      try {
        const data = await fetchScrapedListings()
        if (!cancelled && data.length > 0) {
          setListings(data)
          setSource('scrape')
          setLoading(false)
          return
        }
      } catch (err) {
        console.info('[useListings] Scraper nicht erreichbar (normal wenn nur "npm run dev" läuft):', err.message)
        if (!cancelled) setError(err.message)
      }

      // --- 3. Sample-Daten ---
      if (!cancelled) {
        setListings(SAMPLE_LISTINGS)
        setSource('sample')
        setLoading(false)
      }
    }

    load()
    return () => { cancelled = true }
  }, [])

  return {
    listings,
    loading,
    source,
    error,
    fromApi:    source === 'api',
    fromScrape: source === 'scrape',
    fromSample: source === 'sample',
  }
}
