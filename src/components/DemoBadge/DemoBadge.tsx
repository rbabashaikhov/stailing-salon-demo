import { Link } from 'react-router-dom';
import { DEMO_MODE } from '../../config/env';

export function DemoBadge({
  className = '',
  children = 'Демо-версия',
}: {
  className?: string;
  children?: string;
}) {
  if (!DEMO_MODE) return null;
  return (
    <span
      className={`inline-flex max-w-full items-center rounded-btn border border-gold/25 px-1.5 py-px text-[8px] font-medium tracking-wide text-muted/70 ${className}`}
    >
      {children}
    </span>
  );
}

export function BrandMark() {
  return (
    <Link to="/" className="flex min-w-0 max-w-full items-center text-ink no-underline">
      <span className="font-heading text-lg font-semibold leading-none tracking-[0.12em] sm:text-2xl sm:tracking-[0.14em] lg:text-[1.75rem]">
        STAILING
      </span>
    </Link>
  );
}
