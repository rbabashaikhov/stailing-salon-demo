import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Seo } from '../seo/Seo';
import { services, formatPrice } from '../data/services';
import { track } from '../analytics/events';

export function PricesPage() {
  useEffect(() => {
    track('price_view');
  }, []);

  return (
    <>
      <Seo
        title="Цены салона Stailing в Митино"
        description="Подтверждённые цены на стрижки в Stailing. Остальные позиции — уточнить стоимость."
        path="/prices"
      />
      <div className="section">
        <p className="eyebrow">Прайс</p>
        <h1 className="mt-2 font-heading text-5xl lg:text-6xl">Цены</h1>
        <p className="mt-3 max-w-2xl text-muted lg:text-lg">
          Для стрижек указан диапазон из карточки салона. По остальным услугам стоимость уточним при
          записи.
        </p>
        <ul className="mt-8 divide-y border-y border-dark/10">
          {services.map((s) => (
            <li key={s.id} className="flex justify-between gap-4 py-4">
              <div>
                <p className="font-medium">{s.name}</p>
                <p className="text-sm text-muted">{s.short}</p>
              </div>
              <span className="shrink-0 text-sm">{formatPrice(s.price)}</span>
            </li>
          ))}
        </ul>
        <Link to="/booking" className="btn-primary mt-8">
          Уточнить и записаться
        </Link>
      </div>
    </>
  );
}
