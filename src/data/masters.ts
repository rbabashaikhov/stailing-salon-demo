export type Master = {
  id: string;
  displayName: string;
  role: string;
  specialties: string;
  isPlaceholder: true;
};

export type DemoBookingMaster = Master & {
  categoryId: string;
};

/** Role cards on public pages until the salon confirms named specialists and photos. */
export const masters: Master[] = [
  {
    id: 'demo-hair-1',
    displayName: 'Парикмахер-стилист',
    role: 'Парикмахер-стилист',
    specialties: 'Стрижки · окрашивание · укладки',
    isPlaceholder: true,
  },
  {
    id: 'demo-nails-1',
    displayName: 'Ногтевой сервис',
    role: 'Ногтевой сервис',
    specialties: 'Маникюр · педикюр · покрытие',
    isPlaceholder: true,
  },
  {
    id: 'demo-cosmo-1',
    displayName: 'Косметолог',
    role: 'Косметолог',
    specialties: 'Косметология',
    isPlaceholder: true,
  },
];

/**
 * Демонстрационные специалисты для сценария записи.
 * Имена вымышленные, не сотрудники салона Stailing. Без портретов.
 */
export const demoBookingMasters: DemoBookingMaster[] = [
  {
    id: 'demo-hair-1',
    displayName: 'Анна',
    role: 'Парикмахер-стилист',
    specialties: 'Стрижки · окрашивание · укладки',
    isPlaceholder: true,
    categoryId: 'hair',
  },
  {
    id: 'demo-hair-2',
    displayName: 'Ольга',
    role: 'Парикмахер-стилист',
    specialties: 'Стрижки · окрашивание · укладки',
    isPlaceholder: true,
    categoryId: 'hair',
  },
  {
    id: 'demo-nails-1',
    displayName: 'Мария',
    role: 'Мастер ногтевого сервиса',
    specialties: 'Маникюр · педикюр · покрытие',
    isPlaceholder: true,
    categoryId: 'nails',
  },
  {
    id: 'demo-nails-2',
    displayName: 'Екатерина',
    role: 'Мастер ногтевого сервиса',
    specialties: 'Маникюр · педикюр · покрытие',
    isPlaceholder: true,
    categoryId: 'nails',
  },
  {
    id: 'demo-cosmo-1',
    displayName: 'Елена',
    role: 'Косметолог',
    specialties: 'Косметология · уходовые процедуры',
    isPlaceholder: true,
    categoryId: 'cosmetology',
  },
  {
    id: 'demo-cosmo-2',
    displayName: 'Ирина',
    role: 'Косметолог',
    specialties: 'Косметология · уходовые процедуры',
    isPlaceholder: true,
    categoryId: 'cosmetology',
  },
  {
    id: 'demo-epil-1',
    displayName: 'Светлана',
    role: 'Специалист по эпиляции',
    specialties: 'Эпиляция',
    isPlaceholder: true,
    categoryId: 'epilation',
  },
  {
    id: 'demo-epil-2',
    displayName: 'Наталья',
    role: 'Специалист по эпиляции',
    specialties: 'Эпиляция',
    isPlaceholder: true,
    categoryId: 'epilation',
  },
  {
    id: 'demo-brows-1',
    displayName: 'Дарья',
    role: 'Специалист по бровям и ресницам',
    specialties: 'Оформление бровей · ресницы',
    isPlaceholder: true,
    categoryId: 'brows',
  },
  {
    id: 'demo-brows-2',
    displayName: 'Виктория',
    role: 'Специалист по бровям и ресницам',
    specialties: 'Оформление бровей · ресницы',
    isPlaceholder: true,
    categoryId: 'brows',
  },
  {
    id: 'demo-body-1',
    displayName: 'Татьяна',
    role: 'Специалист по уходу за телом',
    specialties: 'Уход за телом',
    isPlaceholder: true,
    categoryId: 'body',
  },
  {
    id: 'demo-body-2',
    displayName: 'Юлия',
    role: 'Специалист по уходу за телом',
    specialties: 'Уход за телом',
    isPlaceholder: true,
    categoryId: 'body',
  },
  {
    id: 'demo-other-1',
    displayName: 'Алина',
    role: 'Специалист салона',
    specialties: 'Другие услуги',
    isPlaceholder: true,
    categoryId: 'other',
  },
  {
    id: 'demo-other-2',
    displayName: 'Ксения',
    role: 'Специалист салона',
    specialties: 'Другие услуги',
    isPlaceholder: true,
    categoryId: 'other',
  },
];

export const ANY_MASTER_ID = 'any';
