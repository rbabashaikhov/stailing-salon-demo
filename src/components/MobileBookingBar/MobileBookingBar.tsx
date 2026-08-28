import { Link, useLocation } from 'react-router-dom';
import { salon } from '../../data/salon';
import { track } from '../../analytics/events';

export function MobileBookingBar() {
  const { pathname } = useLocation();
  if (pathname === '/booking') return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 w-full max-w-full border-t border-dark/10 bg-surface/95 px-3 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] md:hidden">
      <div className="mx-auto grid w-full min-w-0 max-w-lg grid-cols-[minmax(0,1fr)_minmax(0,1.65fr)] gap-2">
        <a
          className="btn-secondary min-h-11 w-full min-w-0 px-3 text-sm"
          href={salon.phoneHref}
          onClick={() => track('phone_click')}
        >
          Позвонить
        </a>
        <Link
          to="/booking"
          className="btn-primary min-h-11 w-full min-w-0 px-3 text-sm"
          onClick={() => track('booking_open')}
        >
          Записаться
        </Link>
      </div>
    </div>
  );
}
