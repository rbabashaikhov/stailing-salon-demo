import type { Availability, BookingMaster, BookingService } from './types.js';

export const DEMO_SLOT_IDS = ['10:00', '11:30', '13:00', '14:30', '16:00', '17:30', '19:00'] as const;

export const AVAILABILITY_DISCLAIMER =
  'В демо показано примерное расписание. В рабочей версии свободное время будет синхронизироваться с актуальным расписанием выбранного мастера.';

function hashSeed(value: string): number {
  let n = 0;
  for (let i = 0; i < value.length; i += 1) n = (n + value.charCodeAt(i) * (i + 1)) % 997;
  return n;
}

export function buildDemoTimeSlots(date = '', masterId = 'any'): Availability['times'] {
  const seed = hashSeed(`${date}|${masterId}`);
  const busyA = seed % DEMO_SLOT_IDS.length;
  const busyB = (seed + 4) % DEMO_SLOT_IDS.length;
  return DEMO_SLOT_IDS.map((id, index) => {
    const extraBusy = masterId !== 'any' && (seed + index) % 5 === 0;
    const available = index !== busyA && index !== busyB && !extraBusy;
    return { id, label: id, available };
  });
}

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

/** Demo names only — not Stailing staff. No portraits. */
export const masters: BookingMaster[] = [
  { id: 'demo-hair-1', displayName: 'Анна', role: 'Парикмахер-стилист', specialties: 'Стрижки · окрашивание · укладки', isPlaceholder: true, categoryId: 'hair' },
  { id: 'demo-hair-2', displayName: 'Ольга', role: 'Парикмахер-стилист', specialties: 'Стрижки · окрашивание · укладки', isPlaceholder: true, categoryId: 'hair' },
  { id: 'demo-nails-1', displayName: 'Мария', role: 'Мастер ногтевого сервиса', specialties: 'Маникюр · педикюр · покрытие', isPlaceholder: true, categoryId: 'nails' },
  { id: 'demo-nails-2', displayName: 'Екатерина', role: 'Мастер ногтевого сервиса', specialties: 'Маникюр · педикюр · покрытие', isPlaceholder: true, categoryId: 'nails' },
  { id: 'demo-cosmo-1', displayName: 'Елена', role: 'Косметолог', specialties: 'Косметология · уходовые процедуры', isPlaceholder: true, categoryId: 'cosmetology' },
  { id: 'demo-cosmo-2', displayName: 'Ирина', role: 'Косметолог', specialties: 'Косметология · уходовые процедуры', isPlaceholder: true, categoryId: 'cosmetology' },
  { id: 'demo-epil-1', displayName: 'Светлана', role: 'Специалист по эпиляции', specialties: 'Эпиляция', isPlaceholder: true, categoryId: 'epilation' },
  { id: 'demo-epil-2', displayName: 'Наталья', role: 'Специалист по эпиляции', specialties: 'Эпиляция', isPlaceholder: true, categoryId: 'epilation' },
  { id: 'demo-brows-1', displayName: 'Дарья', role: 'Специалист по бровям и ресницам', specialties: 'Оформление бровей · ресницы', isPlaceholder: true, categoryId: 'brows' },
  { id: 'demo-brows-2', displayName: 'Виктория', role: 'Специалист по бровям и ресницам', specialties: 'Оформление бровей · ресницы', isPlaceholder: true, categoryId: 'brows' },
  { id: 'demo-body-1', displayName: 'Татьяна', role: 'Специалист по уходу за телом', specialties: 'Уход за телом', isPlaceholder: true, categoryId: 'body' },
  { id: 'demo-body-2', displayName: 'Юлия', role: 'Специалист по уходу за телом', specialties: 'Уход за телом', isPlaceholder: true, categoryId: 'body' },
  { id: 'demo-other-1', displayName: 'Алина', role: 'Специалист салона', specialties: 'Другие услуги', isPlaceholder: true, categoryId: 'other' },
  { id: 'demo-other-2', displayName: 'Ксения', role: 'Специалист салона', specialties: 'Другие услуги', isPlaceholder: true, categoryId: 'other' },
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
