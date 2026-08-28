import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { BrandMark, DemoBadge } from '../DemoBadge/DemoBadge';
import { track } from '../../analytics/events';

const nav = [
  { to: '/services', label: 'Услуги' },
  { to: '/prices', label: 'Цены' },
  { to: '/masters', label: 'Мастера' },
  { to: '/#reviews', label: 'Отзывы' },
  { to: '/contacts', label: 'Контакты' },
];

export function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <header className="sticky top-0 left-0 z-50 w-full max-w-full border-b border-dark/10 bg-bg">
      <div className="shell flex h-14 w-full min-w-0 items-center gap-2 lg:h-[4.25rem] lg:gap-3">
        <div className="flex min-w-0 flex-1 flex-col items-start justify-center gap-0.5 sm:flex-row sm:items-center sm:gap-2">
          <BrandMark />
          <DemoBadge className="max-[359px]:hidden" />
          <DemoBadge className="hidden max-[359px]:inline-flex">Demo</DemoBadge>
        </div>
        <nav className="ml-6 hidden min-w-0 shrink items-center gap-6 xl:flex" aria-label="Основное меню">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className="text-sm text-muted hover:text-ink lg:text-base"
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="ml-auto flex shrink-0 items-center gap-2">
          <Link
            to="/booking"
            className="btn-primary hidden md:inline-flex"
            onClick={() => track('booking_open', { page_path: window.location.pathname })}
          >
            Записаться
          </Link>
          <button
            type="button"
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-btn border border-dark/15 xl:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Меню</span>
            <span aria-hidden className="flex flex-col gap-1.5">
              <span className="block h-0.5 w-5 bg-ink" />
              <span className="block h-0.5 w-5 bg-ink" />
              <span className="block h-0.5 w-5 bg-ink" />
            </span>
          </button>
        </div>
      </div>
      {open ? (
        <div
          id="mobile-menu"
          className="w-full max-w-full border-t border-dark/10 bg-surface px-4 py-3 xl:hidden"
        >
          <nav className="flex flex-col gap-1" aria-label="Мобильное меню">
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className="flex min-h-11 items-center rounded-card px-3 py-2 text-base"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
            <Link
              to="/booking"
              className="flex min-h-11 items-center rounded-card px-3 py-2 text-base font-semibold"
              onClick={() => {
                setOpen(false);
                track('booking_open', { page_path: window.location.pathname });
              }}
            >
              Записаться
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
