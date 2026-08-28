import { Link } from 'react-router-dom';
import type { ServiceCategory } from '../../data/services';

export function ServiceCard({ category }: { category: ServiceCategory }) {
  return (
    <Link
      to={category.href}
      className="group flex h-full min-h-[6.75rem] flex-col justify-between rounded-card border border-dark/10 bg-surface p-3 shadow-card transition-colors hover:border-primary focus-visible:border-primary sm:min-h-[7.5rem] sm:p-5 lg:min-h-[9rem] lg:p-7"
    >
      <span className="flex items-start justify-between gap-2">
        <span className="font-heading text-lg leading-tight sm:text-2xl lg:text-3xl">{category.name}</span>
        <span aria-hidden className="mt-1 text-gold/80 transition-transform group-hover:translate-x-0.5">
          →
        </span>
      </span>
      <span className="mt-2 line-clamp-2 text-xs leading-snug text-muted sm:text-sm lg:text-base">
        {category.caption}
      </span>
    </Link>
  );
}
