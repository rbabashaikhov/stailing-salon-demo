import { Link } from 'react-router-dom';
import { Seo } from '../seo/Seo';

export function NotFoundPage() {
  return (
    <>
      <Seo
        title="Страница не найдена — Stailing"
        description="Запрашиваемая страница сайта салона Stailing не найдена."
        path="/404"
      />
      <div className="section text-center">
        <p className="eyebrow">404</p>
        <h1 className="mt-2 font-heading text-5xl">Страница не найдена</h1>
        <p className="mt-3 text-muted">Проверьте адрес или вернитесь на главную.</p>
        <Link to="/" className="btn-primary mt-8 inline-flex">
          На главную
        </Link>
      </div>
    </>
  );
}
