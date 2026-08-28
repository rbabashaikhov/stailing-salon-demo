import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getBookingProvider } from '../../booking/HttpBookingProvider';
import type {
  Availability,
  BookingMaster,
  BookingProvider,
  BookingService,
  PreferredTime,
} from '../../booking/types';
import { ANY_MASTER_ID } from '../../data/masters';
import { bookingCategories } from '../../data/services';
import { track } from '../../analytics/events';
import { readStoredUtm } from '../../analytics/utm';

const STEPS = [
  'Направление',
  'Услуга',
  'Мастер',
  'Дата',
  'Время',
  'Контакты',
  'Готово',
] as const;

type Props = {
  provider?: BookingProvider;
};

const PHONE_RE = /^\+?[0-9()\s-]{10,18}$/;

export function BookingFlow({ provider: injected }: Props) {
  const provider = injected ?? getBookingProvider();
  const [params] = useSearchParams();
  const [step, setStep] = useState(1);
  const [services, setServices] = useState<BookingService[]>([]);
  const [masters, setMasters] = useState<BookingMaster[]>([]);
  const [availability, setAvailability] = useState<Availability | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const [category, setCategory] = useState(params.get('category') ?? '');
  const [serviceId, setServiceId] = useState('');
  const [masterId, setMasterId] = useState(params.get('master') ?? ANY_MASTER_ID);
  const [date, setDate] = useState('');
  const [time, setTime] = useState<PreferredTime | ''>('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [comment, setComment] = useState('');
  const [consent, setConsent] = useState(false);

  useEffect(() => {
    track('booking_open');
    let cancelled = false;
    Promise.all([provider.getServices(), provider.getMasters(), provider.getAvailability()])
      .then(([s, m, a]) => {
        if (cancelled) return;
        setServices(s);
        setMasters(m);
        setAvailability(a);
      })
      .catch(() => setError('Не удалось загрузить форму записи. Попробуйте ещё раз.'))
      .finally(() => setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [provider]);

  useEffect(() => {
    track('booking_step', { booking_step: step });
  }, [step]);

  const filteredServices = useMemo(
    () => services.filter((s) => s.categoryId === category),
    [services, category],
  );

  const filteredMasters = useMemo(() => {
    const selected = services.find((s) => s.id === serviceId);
    const categoryId = selected?.categoryId ?? category;
    return masters.filter((m) => m.categoryId === categoryId);
  }, [masters, services, serviceId, category]);

  function nextFrom(current: number) {
    setError(null);
    if (current === 1 && !category) return setError('Выберите направление');
    if (current === 2 && !serviceId) return setError('Выберите услугу');
    if (current === 3 && !masterId) return setError('Выберите мастера');
    if (current === 4 && !date) return setError('Выберите дату');
    if (current === 5 && !time) return setError('Выберите время');
    setStep(current + 1);
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!name.trim()) return setError('Укажите имя');
    if (!PHONE_RE.test(phone.trim())) return setError('Укажите телефон');
    if (!consent) return setError('Нужно согласие на обработку данных');
    if (!category || !serviceId || !masterId || !date || !time) return setError('Заполните все шаги');

    const utm = readStoredUtm();
    const selected = services.find((s) => s.id === serviceId);
    await provider.createBooking({
      service_category: category,
      service_id: serviceId,
      master_id: masterId,
      preferred_date: date,
      preferred_time: time,
      name: name.trim(),
      phone: phone.trim(),
      comment: comment.trim(),
      page_path: window.location.pathname,
      ...utm,
    });
    track('booking_submit_demo', {
      service_category: category,
      service_name: selected?.name,
      master_id: masterId,
    });
    setStep(7);
  }

  if (loading) {
    return <p className="text-muted">Загружаем форму записи…</p>;
  }

  return (
    <div className="rounded-card border border-dark/10 bg-surface p-5 shadow-card sm:p-8 lg:p-10">
      <div className="sticky top-14 z-10 mb-6 bg-surface pb-2 sm:static sm:pb-0" aria-label="Шаги записи">
        <p className="text-sm text-muted lg:text-base">
          Шаг {step} из {STEPS.length}
        </p>
        <p className="mt-1 font-heading text-xl lg:text-2xl">{STEPS[step - 1]}</p>
        <div
          className="mt-3 h-1.5 overflow-hidden rounded-full bg-bg"
          role="progressbar"
          aria-valuemin={1}
          aria-valuemax={STEPS.length}
          aria-valuenow={step}
          aria-label={`Шаг ${step} из ${STEPS.length}`}
        >
          <div
            className="h-full rounded-full bg-primary transition-[width] duration-300"
            style={{ width: `${(step / STEPS.length) * 100}%` }}
          />
        </div>
      </div>

      {error ? (
        <p role="alert" className="mb-4 text-sm text-red-800">
          {error}
        </p>
      ) : null}

      {step === 1 ? (
        <fieldset>
          <legend className="font-heading text-3xl">Выберите направление</legend>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {bookingCategories.map((c) => (
              <button
                key={c.id}
                type="button"
                className={`min-h-11 rounded-card border px-4 py-4 text-left ${
                  category === c.id ? 'border-primary bg-bg' : 'border-dark/10'
                }`}
                onClick={() => {
                  setCategory(c.id);
                  setServiceId('');
                  const keepMaster =
                    masterId === ANY_MASTER_ID ||
                    masters.some((m) => m.id === masterId && m.categoryId === c.id);
                  if (!keepMaster) setMasterId(ANY_MASTER_ID);
                }}
              >
                {c.name}
              </button>
            ))}
          </div>
          <button type="button" className="btn-primary mt-6" onClick={() => nextFrom(1)}>
            Далее
          </button>
        </fieldset>
      ) : null}

      {step === 2 ? (
        <fieldset>
          <legend className="font-heading text-3xl">Выберите услугу</legend>
          <div className="mt-5 grid gap-3">
            {filteredServices.map((s) => (
              <button
                key={s.id}
                type="button"
                className={`min-h-11 rounded-card border px-4 py-4 text-left ${
                  serviceId === s.id ? 'border-primary bg-bg' : 'border-dark/10'
                }`}
                onClick={() => {
                  setServiceId(s.id);
                  const keepMaster =
                    masterId === ANY_MASTER_ID ||
                    masters.some((m) => m.id === masterId && m.categoryId === s.categoryId);
                  if (!keepMaster) setMasterId(ANY_MASTER_ID);
                }}
              >
                <span className="block font-medium">{s.name}</span>
                <span className="text-sm text-muted">{s.priceLabel}</span>
              </button>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <button type="button" className="btn-secondary" onClick={() => setStep(1)}>
              Назад
            </button>
            <button type="button" className="btn-primary" onClick={() => nextFrom(2)}>
              Далее
            </button>
          </div>
        </fieldset>
      ) : null}

      {step === 3 ? (
        <fieldset>
          <legend className="font-heading text-3xl">Выберите мастера</legend>
          <p className="mt-2 text-sm text-muted">
            Специалисты показаны для демонстрации сценария записи.
          </p>
          <div className="mt-5 grid gap-3">
            <button
              type="button"
              className={`min-h-11 rounded-card border px-4 py-4 text-left ${
                masterId === ANY_MASTER_ID ? 'border-primary bg-bg' : 'border-dark/10'
              }`}
              onClick={() => setMasterId(ANY_MASTER_ID)}
            >
              Любой специалист
            </button>
            {filteredMasters.map((m) => (
              <button
                key={m.id}
                type="button"
                className={`min-h-11 rounded-card border px-4 py-4 text-left ${
                  masterId === m.id ? 'border-primary bg-bg' : 'border-dark/10'
                }`}
                onClick={() => setMasterId(m.id)}
              >
                <span className="block font-medium">{m.displayName}</span>
                <span className="block text-sm text-muted">{m.role}</span>
                <span className="text-sm text-muted">{m.specialties}</span>
              </button>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <button type="button" className="btn-secondary" onClick={() => setStep(2)}>
              Назад
            </button>
            <button type="button" className="btn-primary" onClick={() => nextFrom(3)}>
              Далее
            </button>
          </div>
        </fieldset>
      ) : null}

      {step === 4 ? (
        <fieldset>
          <legend className="font-heading text-3xl">Выберите дату</legend>
          <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {availability?.days.map((d) => (
              <button
                key={d.date}
                type="button"
                className={`min-h-11 rounded-card border px-3 py-3 text-sm ${
                  date === d.date ? 'border-primary bg-bg' : 'border-dark/10'
                }`}
                onClick={() => setDate(d.date)}
                aria-label={`Выбрать дату ${d.label}`}
              >
                {d.label}
              </button>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <button type="button" className="btn-secondary" onClick={() => setStep(3)}>
              Назад
            </button>
            <button type="button" className="btn-primary" onClick={() => nextFrom(4)}>
              Далее
            </button>
          </div>
        </fieldset>
      ) : null}

      {step === 5 ? (
        <fieldset>
          <legend className="font-heading text-3xl">Когда вам удобно?</legend>
          <p className="mt-2 text-sm text-muted">
            Выберите удобный промежуток — точное время подтвердит администратор.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {availability?.times.map((t) => (
              <button
                key={t.id}
                type="button"
                className={`min-h-11 rounded-card border px-4 py-4 ${
                  time === t.id ? 'border-primary bg-bg' : 'border-dark/10'
                }`}
                onClick={() => setTime(t.id)}
              >
                {t.label}
              </button>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <button type="button" className="btn-secondary" onClick={() => setStep(4)}>
              Назад
            </button>
            <button type="button" className="btn-primary" onClick={() => nextFrom(5)}>
              Далее
            </button>
          </div>
        </fieldset>
      ) : null}

      {step === 6 ? (
        <form onSubmit={submit}>
          <h2 className="font-heading text-3xl">Ваши контакты</h2>
          <div className="mt-5 grid gap-4">
            <label className="grid gap-1 text-sm">
              Имя
              <input
                className="min-h-11 rounded-card border border-dark/15 bg-bg px-3"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
                aria-required="true"
              />
            </label>
            <label className="grid gap-1 text-sm">
              Телефон
              <input
                className="min-h-11 rounded-card border border-dark/15 bg-bg px-3"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                autoComplete="tel"
                inputMode="tel"
                aria-required="true"
              />
            </label>
            <label className="grid gap-1 text-sm">
              Комментарий
              <textarea
                className="min-h-24 rounded-card border border-dark/15 bg-bg px-3 py-2"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </label>
            <label className="flex items-start gap-2 text-sm">
              <input
                type="checkbox"
                className="mt-1"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
              />
              <span>
                Я согласен(на) на обработку персональных данных.{' '}
                <Link className="underline" to="/privacy">
                  Политика конфиденциальности
                </Link>
              </span>
            </label>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <button type="button" className="btn-secondary" onClick={() => setStep(5)}>
              Назад
            </button>
            <button type="submit" className="btn-primary">
              Отправить заявку
            </button>
          </div>
        </form>
      ) : null}

      {step === 7 ? (
        <div>
          <h2 className="font-heading text-3xl">Спасибо!</h2>
          <p className="mt-4 max-w-xl text-muted">
            Это демонстрация сценария записи. Реальное время будет подтверждаться салоном.
          </p>
          <Link to="/" className="btn-primary mt-6 inline-flex">
            На главную
          </Link>
        </div>
      ) : null}
    </div>
  );
}
