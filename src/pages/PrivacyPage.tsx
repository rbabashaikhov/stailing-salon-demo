import { Link } from 'react-router-dom';
import { Seo } from '../seo/Seo';
import { salon } from '../data/salon';

export function PrivacyPage() {
  return (
    <>
      <Seo
        title="Политика конфиденциальности — Stailing (черновик демо)"
        description="Черновик политики обработки персональных данных для демонстрационной версии сайта Stailing."
        path="/privacy"
      />
      <article className="section max-w-3xl">
        <p className="eyebrow">Черновик</p>
        <h1 className="mt-2 font-heading text-5xl">Политика конфиденциальности</h1>
        <p className="mt-4 text-muted">
          Это черновая формулировка для демонстрационного сайта. Реквизиты оператора персональных
          данных не указаны: они появятся после юридических данных от владельца салона.
        </p>
        <h2 className="mt-8 font-heading text-3xl">Какие данные собираются в демо</h2>
        <p className="mt-3">
          В форме записи пользователь может указать имя, телефон и комментарий. В демонстрационном
          режиме заявка не создаёт реальную запись в салоне и не запускает SMS, email или CRM.
        </p>
        <h2 className="mt-8 font-heading text-3xl">Цель обработки</h2>
        <p className="mt-3">
          На рабочем сайте эти данные потребуются, чтобы связаться с клиентом и подтвердить время
          визита. На preview они сохраняются только как демо-заявка.
        </p>
        <h2 className="mt-8 font-heading text-3xl">Контакты</h2>
        <p className="mt-3">
          По вопросам, связанным с сайтом-демо, используйте телефон салона:{' '}
          <a href={salon.phoneHref}>{salon.phoneDisplay}</a>.
        </p>
        <Link to="/" className="btn-secondary mt-8 inline-flex">
          На главную
        </Link>
      </article>
    </>
  );
}
