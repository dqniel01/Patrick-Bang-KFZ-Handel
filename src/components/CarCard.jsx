import { useTranslation } from 'react-i18next'
import { formatPrice, formatMileage } from '../services/autoscout'

export default function CarCard({ car }) {
  const { t } = useTranslation()

  return (
    <a
      href={car.as24Url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block bg-white border border-gray-200 overflow-hidden hover:border-gray-400 hover:shadow-md transition-all duration-200"
    >
      {/* Image */}
      <div className="overflow-hidden bg-gray-100 h-48">
        <img
          src={car.image}
          alt={`${car.make} ${car.model}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </div>

      {/* Info */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-3">
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-widest">{car.make}</p>
            <h3 className="font-semibold text-gray-900 leading-tight">{car.model}</h3>
            {car.version && <p className="text-xs text-gray-400 mt-0.5">{car.version}</p>}
          </div>
          <div className="text-right flex-shrink-0">
            <p className="font-bold text-gray-900">{formatPrice(car.price)}</p>
            {car.highlight && (
              <span className="inline-block text-[10px] font-medium tracking-widest uppercase text-white bg-gray-900 px-2 py-0.5 mt-1">
                {t('car.highlight')}
              </span>
            )}
          </div>
        </div>

        {/* Specs */}
        <div className="flex gap-3 text-xs text-gray-500 pt-3 border-t border-gray-100 flex-wrap">
          <span>{car.year}</span>
          <span>·</span>
          <span>{formatMileage(car.mileage)}</span>
          <span>·</span>
          <span>{car.power} PS</span>
          <span>·</span>
          <span>{car.fuel}</span>
        </div>
      </div>
    </a>
  )
}
