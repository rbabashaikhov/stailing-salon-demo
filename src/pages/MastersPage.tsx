import { MasterCard } from '../components/MasterCard/MasterCard';
import { Seo } from '../seo/Seo';
import { masters } from '../data/masters';

export function MastersPage() {
  return (
    <>
      <Seo
        title="Мастера салона Stailing в Митино"
        description="Направления специалистов салона Stailing рядом с метро Митино: волосы, ногти и косметология."
        path="/masters"
      />
      <div className="section">
        <p className="eyebrow">Специалисты</p>
        <h1 className="mt-2 font-heading text-5xl lg:text-6xl">Мастера Stailing</h1>
        <p className="mt-3 max-w-2xl text-muted lg:text-lg">
          Выберите направление — администратор поможет записаться к специалисту.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-3 lg:gap-5">
          {masters.map((m) => (
            <MasterCard key={m.id} master={m} />
          ))}
        </div>
      </div>
    </>
  );
}
