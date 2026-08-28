import { Link } from 'react-router-dom';
import { salon, formatShortAddress } from '../../data/salon';
import { track } from '../../analytics/events';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-bg">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 85% 20%, rgba(69,181,190,0.16), transparent 36%), radial-gradient(circle at 12% 80%, rgba(180,151,98,0.12), transparent 32%)',
        }}
      />
      <div className="section relative grid items-center gap-6 !py-8 sm:gap-10 sm:!py-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14 lg:!py-20">
        <div className="min-w-0">
          <p className="eyebrow">STAILING</p>
          <h1 className="mt-2 font-heading text-[2.15rem] font-semibold leading-[1.08] sm:mt-3 sm:text-5xl lg:text-[4.25rem]">
            {salon.h1}
          </h1>
          <p className="mt-3 font-heading text-[1.65rem] leading-tight text-dark sm:mt-4 sm:text-3xl lg:text-4xl">
            {salon.tagline}
          </p>
          <p className="mt-3 max-w-xl text-[0.95rem] leading-relaxed text-muted sm:mt-4 sm:text-base lg:max-w-lg lg:text-lg">
            {salon.description}
          </p>
          <div className="mt-5 flex flex-wrap gap-3 sm:mt-8">
            <Link
              to="/booking"
              className="btn-primary"
              onClick={() => track('booking_open')}
            >
              Записаться
            </Link>
            <Link to="/services" className="btn-secondary">
              Посмотреть услуги
            </Link>
          </div>
          <p className="mt-4 text-sm text-muted lg:text-base">
            {formatShortAddress()} · м. {salon.metro}
          </p>
        </div>
        <div className="mx-auto w-full max-w-md min-w-0 lg:max-w-none">
          <div className="frame-double rounded-card bg-surface p-1.5 sm:p-3">
            <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
              <img
                src="/images/salon/interior-reception.webp"
                alt="Ресепшен салона Stailing на Митинской улице"
                className="col-span-3 h-40 w-full rounded-[10px] object-cover sm:h-72 lg:h-[22rem]"
                width={720}
                height={540}
              />
              <img
                src="/images/salon/interior-hair.webp"
                alt="Парикмахерский зал"
                className="hidden h-20 w-full rounded-[10px] object-cover sm:block sm:h-24 lg:h-28"
                width={240}
                height={160}
              />
              <img
                src="/images/salon/interior-nails.webp"
                alt="Кабинет маникюра"
                className="hidden h-20 w-full rounded-[10px] object-cover sm:block sm:h-24 lg:h-28"
                width={240}
                height={160}
              />
              <img
                src="/images/salon/interior-care.webp"
                alt="Кабинет ухода"
                className="hidden h-20 w-full rounded-[10px] object-cover sm:block sm:h-24 lg:h-28"
                width={240}
                height={160}
              />
            </div>
          </div>
          <p className="mt-2 text-center font-heading text-lg text-dark sm:mt-4 sm:text-xl lg:text-2xl">
            салон у метро Митино
          </p>
        </div>
      </div>
    </section>
  );
}
