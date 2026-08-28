import { salon } from '../../data/salon';
import { track } from '../../analytics/events';

export function MapEmbed({ className = '' }: { className?: string }) {
  return (
    <div className={`min-w-0 overflow-hidden rounded-card border border-dark/10 bg-bg ${className}`}>
      <iframe
        title="Салон Stailing на карте"
        src={salon.mapEmbedUrl}
        className="h-[280px] w-full min-w-0 max-w-full border-0 md:h-auto md:min-h-[240px] md:aspect-[4/3] lg:aspect-[5/4] lg:min-h-[320px]"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
      <a
        href={salon.mapUrl}
        target="_blank"
        rel="noreferrer"
        className="block px-4 py-3 text-sm text-muted hover:text-ink lg:text-base"
        onClick={() => track('route_click')}
      >
        Открыть в Яндекс Картах
      </a>
    </div>
  );
}
