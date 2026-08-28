export type Master = {
  id: string;
  displayName: string;
  role: string;
  specialties: string;
  isPlaceholder: true;
};

/** Role cards until the salon provides named specialists and photos. */
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

export const ANY_MASTER_ID = 'any';
