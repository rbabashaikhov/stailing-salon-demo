import type { Availability, BookingMaster, BookingService, PreferredTime } from './types.js';

export const TIME_SLOTS: Array<{ id: PreferredTime; label: string }> = [
  { id: 'morning', label: 'Утро' },
  { id: 'afternoon', label: 'День' },
  { id: 'evening', label: 'Вечер' },
];

export const AVAILABILITY_DISCLAIMER =
  'Показаны предпочтительные промежутки, а не реальные свободные окна. Реальная доступность будет получаться из системы записи салона.';

export const services: BookingService[] = [
  { id: 'hair-cut-women', categoryId: 'hair', name: 'Женская стрижка', short: 'По карточке салона', priceLabel: '750–1100 ₽' },
  { id: 'hair-cut-men', categoryId: 'hair', name: 'Мужская стрижка', short: 'По карточке салона', priceLabel: '200–800 ₽' },
  { id: 'hair-color', categoryId: 'hair', name: 'Окрашивание', short: 'Стоимость зависит от длины и техники', priceLabel: 'Уточнить стоимость' },
  { id: 'hair-style', categoryId: 'hair', name: 'Укладка', short: 'Стоимость уточняется при записи', priceLabel: 'Уточнить стоимость' },
  { id: 'nails-manicure', categoryId: 'nails', name: 'Маникюр', short: 'Стоимость уточняется при записи', priceLabel: 'Уточнить стоимость' },
  { id: 'nails-pedicure', categoryId: 'nails', name: 'Педикюр', short: 'Стоимость уточняется при записи', priceLabel: 'Уточнить стоимость' },
  { id: 'nails-cover', categoryId: 'nails', name: 'Покрытие', short: 'Стоимость уточняется при записи', priceLabel: 'Уточнить стоимость' },
  { id: 'cosmo-care', categoryId: 'cosmetology', name: 'Уходовая процедура', short: 'Стоимость уточняется при записи', priceLabel: 'Уточнить стоимость' },
  { id: 'brows-shape', categoryId: 'brows', name: 'Оформление бровей', short: 'Стоимость уточняется при записи', priceLabel: 'Уточнить стоимость' },
  { id: 'epil-demo', categoryId: 'epilation', name: 'Эпиляция', short: 'Стоимость уточняется при записи', priceLabel: 'Уточнить стоимость' },
  { id: 'body-care', categoryId: 'body', name: 'Уход за телом', short: 'Стоимость уточняется при записи', priceLabel: 'Уточнить стоимость' },
  { id: 'other-request', categoryId: 'other', name: 'Другая услуга', short: 'Опишите в комментарии', priceLabel: 'Уточнить стоимость' },
];

export const masters: BookingMaster[] = [
  { id: 'demo-hair-1', displayName: 'Парикмахер-стилист', role: 'Парикмахер-стилист', specialties: 'Стрижки · окрашивание · укладки', isPlaceholder: true },
  { id: 'demo-nails-1', displayName: 'Ногтевой сервис', role: 'Ногтевой сервис', specialties: 'Маникюр · педикюр · покрытие', isPlaceholder: true },
  { id: 'demo-cosmo-1', displayName: 'Косметолог', role: 'Косметолог', specialties: 'Косметология', isPlaceholder: true },
];

export function buildAvailabilityDays(from = new Date(), count = 14): Availability['days'] {
  const days: Availability['days'] = [];
  for (let i = 0; i < count; i += 1) {
    const d = new Date(from);
    d.setDate(from.getDate() + i);
    days.push({
      date: d.toISOString().slice(0, 10),
      label: new Intl.DateTimeFormat('ru-RU', { weekday: 'short', day: 'numeric', month: 'short' }).format(d),
    });
  }
  return days;
}
