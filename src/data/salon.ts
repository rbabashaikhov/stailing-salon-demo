export const salon = {
  name: 'Stailing',
  fullName: 'Beauty saloon Stailing',
  h1: 'Салон красоты в Митино',
  tagline: 'Мастера, к которым возвращаются',
  description:
    'Стрижки и окрашивание, ногтевой сервис, косметология и эпиляция рядом с метро Митино.',
  city: 'Москва',
  street: 'Митинская улица, 28к2',
  metro: 'Митино',
  phoneDisplay: '+7 (926) 810-19-00',
  phoneHref: 'tel:+79268101900',
  /** Часы работы не подтверждены — не выводим в UI и не добавляем в JSON-LD. */
  hours: null as string | null,
  mapUrl:
    'https://yandex.ru/maps/?text=%D0%9C%D0%BE%D1%81%D0%BA%D0%B2%D0%B0%2C%20%D0%9C%D0%B8%D1%82%D0%B8%D0%BD%D1%81%D0%BA%D0%B0%D1%8F%20%D1%83%D0%BB%D0%B8%D1%86%D0%B0%2C%2028%D0%BA2',
  mapEmbedUrl:
    'https://yandex.ru/map-widget/v1/?mode=search&text=%D0%9C%D0%BE%D1%81%D0%BA%D0%B2%D0%B0%2C%20%D0%9C%D0%B8%D1%82%D0%B8%D0%BD%D1%81%D0%BA%D0%B0%D1%8F%20%D1%83%D0%BB%D0%B8%D1%86%D0%B0%2C%2028%D0%BA2&z=16',
  yandexReviewsUrl:
    'https://yandex.ru/maps/?text=%D1%81%D0%B0%D0%BB%D0%BE%D0%BD%20%D0%BA%D1%80%D0%B0%D1%81%D0%BE%D1%82%D1%8B%20Stailing%20%D0%9C%D0%B8%D1%82%D0%B8%D0%BD%D1%81%D0%BA%D0%B0%D1%8F%2028%D0%BA2',
  messengers: {
    whatsapp: null as string | null,
    telegram: null as string | null,
  },
  yandexSnapshot: {
    rating: 4.6,
    ratingsCount: 116,
    reviewsCount: 57,
    photosCount: 49,
    note: 'Данные из карточки Яндекс на момент анализа, не обновляются автоматически.',
  },
  seo: {
    homeTitle: 'Салон красоты Stailing в Митино — Москва',
    homeDescription:
      'Салон красоты Stailing рядом с метро Митино: стрижки, ногтевой сервис, косметология и эпиляция.',
    siteUrl: 'https://stailing-demo.apps.leadmeter.ru',
  },
} as const;

export type Salon = typeof salon;

export function formatAddressLine(): string {
  return `${salon.city}, ${salon.street}`;
}

export function formatShortAddress(): string {
  return `Москва, Митинская, 28к2`;
}
