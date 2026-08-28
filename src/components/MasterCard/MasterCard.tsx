import { Link } from 'react-router-dom';
import type { Master } from '../../data/masters';
import { track } from '../../analytics/events';

export function MasterCard({ master }: { master: Master }) {
  const href = `/booking?master=${master.id}`;
  function onBook() {
    track('booking_open', { master_id: master.id });
  }

  return (
    <article className="flex h-full flex-col rounded-card border border-dark/10 bg-surface p-5 shadow-card sm:p-6 lg:p-7">
      <h3 className="font-heading text-2xl leading-tight lg:text-3xl">{master.role}</h3>
      <p className="mt-2 flex-1 text-sm text-muted lg:text-base">{master.specialties}</p>
      <Link
        to={href}
        className="mt-4 inline-flex min-h-11 items-center text-sm font-semibold text-ink md:hidden"
        onClick={onBook}
      >
        Выбрать специалиста →
      </Link>
      <Link to={href} className="btn-primary mt-6 hidden w-full md:inline-flex" onClick={onBook}>
        Записаться
      </Link>
    </article>
  );
}
