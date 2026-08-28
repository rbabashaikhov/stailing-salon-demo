import type { ReviewCard as Review } from '../../data/reviews';

export function ReviewCard({ review }: { review: Review }) {
  return (
    <article className="rounded-card border border-dark/10 bg-surface p-4 sm:p-5 lg:p-7">
      <p className="eyebrow">{review.caption}</p>
      <h3 className="mt-2 font-heading text-2xl lg:text-3xl">{review.title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-muted lg:text-base">{review.body}</p>
    </article>
  );
}
