import { useEffect } from 'react';
import { ServiceCard } from '../components/ServiceCard/ServiceCard';
import { Seo } from '../seo/Seo';
import { serviceCategories, services, formatPrice } from '../data/services';
import { track } from '../analytics/events';

export function ServicesPage() {
  useEffect(() => {
    track('service_view', { service_category: 'all' });
  }, []);

  return (
    <>
      <Seo
        title="Услуги салона Stailing в Митино"
        description="Направления салона Stailing: волосы, ногти, косметология, эпиляция и смежные beauty-услуги."
        path="/services"
      />
      <div className="section">
        <p className="eyebrow">Каталог</p>
        <h1 className="mt-2 font-heading text-5xl lg:text-6xl">Услуги</h1>
        <p className="mt-3 max-w-2xl text-muted lg:text-lg">
          Волосы, ногти, косметология, эпиляция и смежные услуги рядом с метро Митино.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {serviceCategories.map((c) => (
            <div key={c.id} id={c.id} className="scroll-mt-24">
              <ServiceCard category={c} />
            </div>
          ))}
        </div>
        <ul className="mt-10 divide-y border-y border-dark/10">
          {services.map((s) => (
            <li key={s.id} className="flex justify-between gap-4 py-4">
              <span>{s.name}</span>
              <span className="text-sm text-muted">{formatPrice(s.price)}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
