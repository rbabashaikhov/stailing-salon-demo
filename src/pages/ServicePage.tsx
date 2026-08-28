import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Seo } from '../seo/Seo';
import { buildServiceJsonLd } from '../seo/schema';
import { getCategoryById, getServicesByCategory, formatPrice, type ServiceCategoryId } from '../data/services';
import { NotFoundPage } from './NotFoundPage';
import { track } from '../analytics/events';

const PAGE_IDS = ['hair', 'nails', 'cosmetology', 'epilation'] as const;

export function ServicePage() {
  const { categoryId } = useParams();
  const category = categoryId ? getCategoryById(categoryId) : undefined;
  const allowed = PAGE_IDS.includes(categoryId as (typeof PAGE_IDS)[number]);

  useEffect(() => {
    if (categoryId) track('service_view', { service_category: categoryId });
  }, [categoryId]);

  if (!category || !allowed) {
    return <NotFoundPage />;
  }

  const items = getServicesByCategory(category.id as ServiceCategoryId);
  const jsonLd = buildServiceJsonLd(category.id);

  return (
    <>
      <Seo
        title={category.pageTitle ?? `${category.name} — Stailing`}
        description={category.pageDescription ?? salonFallback(category.name)}
        path={`/services/${category.id}`}
        jsonLd={jsonLd ?? undefined}
      />
      <div className="section">
        <p className="eyebrow">Услуги</p>
        <h1 className="mt-2 font-heading text-5xl lg:text-6xl">{category.name}</h1>
        <p className="mt-3 max-w-2xl text-muted lg:text-lg">{category.caption}</p>
        <ul className="mt-8 divide-y border-y border-dark/10">
          {items.map((s) => (
            <li key={s.id} className="flex justify-between gap-4 py-4">
              <div>
                <p className="font-medium">{s.name}</p>
                <p className="text-sm text-muted">{s.short}</p>
              </div>
              <span className="text-sm">{formatPrice(s.price)}</span>
            </li>
          ))}
        </ul>
        <Link to="/booking" className="btn-primary mt-8">
          Записаться
        </Link>
      </div>
    </>
  );
}

function salonFallback(name: string) {
  return `${name} в салоне Stailing рядом с метро Митино.`;
}
