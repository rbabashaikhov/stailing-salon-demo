import type { AvailabilitySlot } from './types';

/** Demo clock times only — not a live salon timetable. */
export const DEMO_SLOT_IDS = ['10:00', '11:30', '13:00', '14:30', '16:00', '17:30', '19:00'] as const;

export const AVAILABILITY_DISCLAIMER =
  'В демо показано примерное расписание. В рабочей версии свободное время будет синхронизироваться с актуальным расписанием выбранного мастера.';

function hashSeed(value: string): number {
  let n = 0;
  for (let i = 0; i < value.length; i += 1) n = (n + value.charCodeAt(i) * (i + 1)) % 997;
  return n;
}

/**
 * Stable mock grid: same date+master always yields the same busy slots.
 * Later a CRM provider replaces this with real openings for master+date.
 */
export function buildDemoTimeSlots(date = '', masterId = 'any'): AvailabilitySlot[] {
  const seed = hashSeed(`${date}|${masterId}`);
  const busyA = seed % DEMO_SLOT_IDS.length;
  const busyB = (seed + 4) % DEMO_SLOT_IDS.length;

  return DEMO_SLOT_IDS.map((id, index) => {
    const extraBusy = masterId !== 'any' && (seed + index) % 5 === 0;
    const available = index !== busyA && index !== busyB && !extraBusy;
    return { id, label: id, available };
  });
}
