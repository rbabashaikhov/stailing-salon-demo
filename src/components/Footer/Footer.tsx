import { Link } from 'react-router-dom';
import { salon, formatAddressLine } from '../../data/salon';
import { DemoBadge } from '../DemoBadge/DemoBadge';

export function Footer() {
  return (
    <footer className="bg-dark text-surface">
      <div className="shell grid gap-5 py-8 md:grid-cols-3 md:gap-8 md:py-12 lg:py-16">
        <div>
          <p className="font-heading text-2xl tracking-[0.14em] md:text-3xl">STAILING</p>
          <p className="mt-2 text-sm text-surface/70">{salon.tagline}</p>
          <div className="mt-3">
            <DemoBadge className="border-gold/30 bg-transparent text-surface/60" />
          </div>
        </div>
        <div className="text-sm">
          <p>{formatAddressLine()}</p>
          <p>м. {salon.metro}</p>
          <a className="mt-2 inline-flex min-h-11 items-center text-primary hover:underline" href={salon.phoneHref}>
            {salon.phoneDisplay}
          </a>
        </div>
        <nav className="flex flex-col gap-1 text-sm text-surface/80" aria-label="Подвал">
          <Link to="/booking" className="inline-flex min-h-11 items-center">
            Запись
          </Link>
          <Link to="/privacy" className="inline-flex min-h-11 items-center">
            Политика конфиденциальности
          </Link>
        </nav>
      </div>
    </footer>
  );
}
