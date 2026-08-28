export type ServiceCategoryId =
  | 'hair'
  | 'nails'
  | 'cosmetology'
  | 'brows'
  | 'epilation'
  | 'body'
  | 'other';

export type PriceDisplay =
  | { kind: 'range'; from: number; to: number; currency: 'RUB' }
  | { kind: 'inquire'; label: string };

export type ServiceItem = {
  id: string;
  categoryId: ServiceCategoryId;
  name: string;
  short: string;
  price: PriceDisplay;
};

export type ServiceCategory = {
  id: ServiceCategoryId;
  name: string;
  caption: string;
  href: string;
  pageTitle?: string;
  pageDescription?: string;
};

export const serviceCategories: ServiceCategory[] = [
  {
    id: 'hair',
    name: 'Волосы',
    caption: 'Стрижки · окрашивание · укладки',
    href: '/services/hair',
    pageTitle: 'Стрижки и окрашивание в Митино — Stailing',
    pageDescription:
      'Парикмахерские услуги в салоне Stailing рядом с метро Митино: стрижки, окрашивание и укладки.',
  },
  {
    id: 'nails',
    name: 'Ногти',
    caption: 'Маникюр · педикюр · покрытие',
    href: '/services/nails',
    pageTitle: 'Маникюр и педикюр в Митино — Stailing',
    pageDescription: 'Ногтевой сервис в салоне Stailing на Митинской улице, 28к2.',
  },
  {
    id: 'cosmetology',
    name: 'Косметология',
    caption: 'Уход за лицом в салоне',
    href: '/services/cosmetology',
    pageTitle: 'Косметология в Митино — Stailing',
    pageDescription: 'Косметологические услуги в салоне Stailing рядом с метро Митино.',
  },
  {
    id: 'brows',
    name: 'Брови и ресницы',
    caption: 'Оформление бровей и ресниц',
    href: '/services#brows',
  },
  {
    id: 'epilation',
    name: 'Эпиляция',
    caption: 'Эпиляция в салоне',
    href: '/services/epilation',
    pageTitle: 'Эпиляция в Митино — Stailing',
    pageDescription: 'Эпиляция в салоне Stailing рядом с метро Митино.',
  },
  {
    id: 'body',
    name: 'Уход за телом',
    caption: 'Смежные beauty-услуги',
    href: '/services#body',
  },
];

export const inquirePrice: PriceDisplay = {
  kind: 'inquire',
  label: 'Уточнить стоимость',
};

export const services: ServiceItem[] = [
  {
    id: 'hair-cut-women',
    categoryId: 'hair',
    name: 'Женская стрижка',
    short: 'Стоимость по карточке салона',
    price: { kind: 'range', from: 750, to: 1100, currency: 'RUB' },
  },
  {
    id: 'hair-cut-men',
    categoryId: 'hair',
    name: 'Мужская стрижка',
    short: 'Стоимость по карточке салона',
    price: { kind: 'range', from: 200, to: 800, currency: 'RUB' },
  },
  {
    id: 'hair-color',
    categoryId: 'hair',
    name: 'Окрашивание',
    short: 'Стоимость зависит от длины и техники',
    price: inquirePrice,
  },
  {
    id: 'hair-style',
    categoryId: 'hair',
    name: 'Укладка',
    short: 'Стоимость уточняется при записи',
    price: inquirePrice,
  },
  {
    id: 'nails-manicure',
    categoryId: 'nails',
    name: 'Маникюр',
    short: 'Стоимость уточняется при записи',
    price: inquirePrice,
  },
  {
    id: 'nails-pedicure',
    categoryId: 'nails',
    name: 'Педикюр',
    short: 'Стоимость уточняется при записи',
    price: inquirePrice,
  },
  {
    id: 'nails-cover',
    categoryId: 'nails',
    name: 'Покрытие',
    short: 'Стоимость уточняется при записи',
    price: inquirePrice,
  },
  {
    id: 'cosmo-care',
    categoryId: 'cosmetology',
    name: 'Уходовая процедура',
    short: 'Стоимость уточняется при записи',
    price: inquirePrice,
  },
  {
    id: 'brows-shape',
    categoryId: 'brows',
    name: 'Оформление бровей',
    short: 'Стоимость уточняется при записи',
    price: inquirePrice,
  },
  {
    id: 'epil-demo',
    categoryId: 'epilation',
    name: 'Эпиляция',
    short: 'Стоимость уточняется при записи',
    price: inquirePrice,
  },
  {
    id: 'body-care',
    categoryId: 'body',
    name: 'Уход за телом',
    short: 'Стоимость уточняется при записи',
    price: inquirePrice,
  },
];

export const bookingCategories: Array<{
  id: ServiceCategoryId;
  name: string;
}> = [
  { id: 'hair', name: 'Волосы' },
  { id: 'nails', name: 'Ногти' },
  { id: 'cosmetology', name: 'Косметология' },
  { id: 'epilation', name: 'Эпиляция' },
  { id: 'other', name: 'Другое' },
];

export const otherBookingServices: ServiceItem[] = [
  {
    id: 'other-request',
    categoryId: 'other',
    name: 'Другая услуга',
    short: 'Опишите пожелание в комментарии',
    price: inquirePrice,
  },
];

export function getCategoryById(id: string): ServiceCategory | undefined {
  return serviceCategories.find((c) => c.id === id);
}

export function getServicesByCategory(id: ServiceCategoryId): ServiceItem[] {
  if (id === 'other') return otherBookingServices;
  return services.filter((s) => s.categoryId === id);
}

export function formatPrice(price: PriceDisplay): string {
  if (price.kind === 'inquire') return price.label;
  return `${price.from}–${price.to} ₽`;
}

export const popularServiceIds = ['hair-cut-women', 'hair-cut-men', 'nails-manicure', 'cosmo-care'];
