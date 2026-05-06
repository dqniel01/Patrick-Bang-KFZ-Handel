import { useTranslation } from 'react-i18next'
import { formatPrice, formatMileage } from '../services/autoscout'

export default function CarCard({ car, featured = false }) {
  const { t } = useTranslation()

  return (
    <a
      href={car.as24Url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group block bg-white border border-gray-100 overflow-hidden hover:border-gray-300 hover:shadow-xl transition-all duration-300 ${
        featured ? 'md:col-span-2 md:row-span-2' : ''
      }`}
    >
      <div className={`overflow-hidden bg-gray-50 ${featured ? 'h-72 md:h-96' : 'h-52'}`}>
        <img
          src={car.image}
          alt={`${car.make} ${car.model}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          loading="lazy"
        />
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-3">
          <div>
            <p className="text-xs font-medium text-gray-400 uppercase tracking-widest">{car.make}</p>
            <h3 className="font-display text-lg font-bold text-gray-900 leading-tight">{car.model}</h3>
            <p className="text-xs text-gray-400 mt-0.5">{car.version}</p>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="font-semibold text-gray-900 text-lg">{formatPrice(car.price)}</p>
            {car.highlight && (
              <span className="inline-block text-[10px] font-medium tracking-widest uppercase text-white bg-gray-900 px-2 py-0.5 mt-1">
                {t('car.highlight')}
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 pt-3 border-t border-gray-100">
          <div className="text-center">
            <p className="text-xs font-medium text-gray-900">{car.year}</p>
            <p className="text-[10px] text-gray-400 mt-0.5">{t('car.year')}</p>
          </div>
          <div className="text-center border-x border-gray-100">
            <p className="text-xs font-medium text-gray-900">{formatMileage(car.mileage)}</p>
            <p className="text-[10px] text-gray-400 mt-0.5">{t('car.mileage')}</p>
          </div>
          <div className="text-center">
            <p className="text-xs font-medium text-gray-900">{car.power} PS</p>
            <p className="text-[10px] text-gray-400 mt-0.5">{t('car.power')}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 mt-3 pt-2">
          <span className="text-[11px] text-gray-400 bg-gray-50 px-2 py-1">{car.fuel}</span>
          <span className="text-[11px] text-gray-400 bg-gray-50 px-2 py-1">{car.transmission}</span>
          <span className="ml-auto flex items-center gap-1 text-xs font-medium text-gray-900 group-hover:gap-2 transition-all">
            {t('car.details')}
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </a>
  )
}
