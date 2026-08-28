import { salon } from '../../data/salon';
import { track } from '../../analytics/events';

export function ContactActions({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`flex flex-wrap gap-3 ${compact ? '' : 'mt-6'}`}>
      <a
        className="btn-primary"
        href={salon.phoneHref}
        onClick={() => track('phone_click')}
      >
        Позвонить
      </a>
      <a
        className="btn-secondary"
        href={salon.mapUrl}
        target="_blank"
        rel="noreferrer"
        onClick={() => track('route_click')}
      >
        Построить маршрут
      </a>
    </div>
  );
}
