import { Link } from 'react-router-dom';
import { Hero } from '../components/Hero/Hero';
import { ServiceCard } from '../components/ServiceCard/ServiceCard';
import { MasterCard } from '../components/MasterCard/MasterCard';
import { ReviewCard } from '../components/ReviewCard/ReviewCard';
import { ContactActions } from '../components/ContactActions/ContactActions';
import { MapEmbed } from '../components/MapEmbed/MapEmbed';
import { Seo } from '../seo/Seo';
import { buildLocalBusinessJsonLd } from '../seo/schema';
import { salon, formatAddressLine } from '../data/salon';
import { serviceCategories, formatPrice } from '../data/services';
import { masters } from '../data/masters';
import { getPopularServices } from '../data/prices';
import { reviews } from '../data/reviews';
import { advantages, galleryPhotos } from '../data/content';
import { track } from '../analytics/events';

export function HomePage() {
  const popular = getPopularServices();
  const [heroPhoto, ...galleryRest] = galleryPhotos;

  return (
    <>
      <Seo
        title={salon.seo.homeTitle}
        description={salon.seo.homeDescription}
        path="/"
        jsonLd={buildLocalBusinessJsonLd()}
      />
      <Hero />

      <section id="services" className="section pt-4" aria-labelledby="quick-services">
        <h2 id="quick-services" className="font-heading text-4xl lg:text-5xl">
          Что хотите сделать?
        </h2>
        <div className="mt-5 grid grid-cols-1 gap-3 min-[360px]:grid-cols-2 sm:mt-6 sm:gap-4 lg:mt-8 lg:grid-cols-3 lg:gap-5">
          {serviceCategories.map((c) => (
            <ServiceCard key={c.id} category={c} />
          ))}
        </div>
      </section>

      <section className="bg-dark text-surface">
        <div className="section py-8 sm:py-12 lg:py-20">
          <p className="eyebrow">Stailing</p>
          <h2 className="mt-2 font-heading text-4xl lg:text-5xl">Почему в Stailing возвращаются</h2>
          <p className="mt-2 font-heading text-2xl text-surface/80 lg:text-3xl">К мастеру, которого знаешь</p>
          <div className="mt-5 grid gap-3 sm:mt-8 md:grid-cols-2 lg:gap-5">
            {advantages.map((a) => (
              <article key={a.id} className="rounded-card border border-surface/10 bg-dark p-4 sm:p-5 lg:p-7">
                <h3 className="font-heading text-2xl lg:text-3xl">{a.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-surface/75 lg:text-base">{a.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="masters" className="section" aria-labelledby="masters-title">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Специалисты</p>
            <h2 id="masters-title" className="font-heading text-4xl lg:text-5xl">
              Наши специалисты
            </h2>
          </div>
          <Link to="/masters" className="btn-secondary">
            Все специалисты
          </Link>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3 lg:mt-8 lg:gap-5">
          {masters.map((m) => (
            <MasterCard key={m.id} master={m} />
          ))}
        </div>
      </section>

      <section id="prices" className="section pt-0" aria-labelledby="popular-title">
        <h2 id="popular-title" className="font-heading text-4xl lg:text-5xl">
          Популярные услуги
        </h2>
        <ul className="mt-6 divide-y border-y border-dark/10">
          {popular.map((s) => (
            <li key={s.id} className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-3 gap-y-0.5 py-3.5 lg:py-5">
              <p className="font-medium lg:text-lg">{s.name}</p>
              <p
                className={`shrink-0 text-right text-sm lg:text-base ${
                  s.price.kind === 'inquire' ? 'font-medium text-muted' : 'font-semibold'
                }`}
              >
                {formatPrice(s.price)}
              </p>
              <p className="col-span-2 text-sm text-muted">{s.short}</p>
            </li>
          ))}
        </ul>
        <Link
          to="/prices"
          className="btn-secondary mt-6"
          onClick={() => track('price_view')}
        >
          Все услуги и цены
        </Link>
      </section>

      <section id="reviews" className="section" aria-labelledby="reviews-title">
        <h2 id="reviews-title" className="font-heading text-4xl lg:text-5xl">
          Почему нас рекомендуют
        </h2>
        <p className="mt-3 text-sm text-muted sm:text-base lg:text-lg">
          {String(salon.yandexSnapshot.rating).replace('.', ',')} на Яндекс Картах · {salon.yandexSnapshot.ratingsCount}{' '}
          оценок · {salon.yandexSnapshot.reviewsCount} отзывов
        </p>
        <div className="mt-5 grid gap-3 sm:mt-6 sm:gap-4 md:grid-cols-2 lg:gap-5">
          {reviews.map((r) => (
            <ReviewCard key={r.id} review={r} />
          ))}
        </div>
        <a
          className="btn-secondary mt-6 inline-flex"
          href={salon.yandexReviewsUrl}
          target="_blank"
          rel="noreferrer"
          onClick={() => track('reviews_click')}
        >
          Отзывы на Яндекс Картах
        </a>
      </section>

      <section className="section pt-0" aria-labelledby="atmosphere">
        <h2 id="atmosphere" className="font-heading text-4xl lg:text-5xl">
          Атмосфера Stailing
        </h2>
        <div className="mt-6 grid gap-3">
          {heroPhoto ? (
            <figure className="min-w-0 overflow-hidden rounded-card md:hidden">
              <img
                src={heroPhoto.src}
                alt={heroPhoto.alt}
                className="aspect-[4/3] w-full object-cover"
                loading="lazy"
                width={960}
                height={720}
              />
            </figure>
          ) : null}
          <div className="grid grid-cols-3 gap-2 md:hidden">
            {galleryRest.map((img) => (
              <figure key={img.id} className="min-w-0 overflow-hidden rounded-card">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="aspect-[3/4] w-full object-cover"
                  loading="lazy"
                  width={320}
                  height={420}
                />
              </figure>
            ))}
          </div>
          <div className="hidden grid-cols-4 gap-3 md:grid">
            {galleryPhotos.map((img) => (
              <figure key={img.id} className="min-w-0 overflow-hidden rounded-card">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="aspect-[4/5] w-full object-cover"
                  loading="lazy"
                  width={480}
                  height={600}
                />
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section id="write" className="section" aria-labelledby="book-title">
        <div className="rounded-card border border-gold/40 bg-surface px-5 py-8 sm:px-8 sm:py-10 lg:p-12">
          <h2 id="book-title" className="font-heading text-4xl lg:text-5xl">
            Записаться в Stailing
          </h2>
          <p className="mt-3 max-w-xl text-muted lg:text-lg">
            Выберите удобный способ. Администратор подтвердит детали записи.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:gap-5">
            <Link
              to="/booking"
              className="rounded-card border border-primary bg-bg p-5 shadow-card lg:p-7"
              onClick={() => track('booking_open')}
            >
              <p className="eyebrow">Онлайн</p>
              <p className="mt-2 font-heading text-2xl lg:text-3xl">Записаться онлайн</p>
            </Link>
            <a
              className="rounded-card border border-dark/10 bg-bg p-5 shadow-card lg:p-7"
              href={salon.phoneHref}
              onClick={() => track('phone_click')}
            >
              <p className="eyebrow">Позвонить</p>
              <p className="mt-2 font-heading text-2xl lg:text-3xl">{salon.phoneDisplay}</p>
            </a>
          </div>
        </div>
      </section>

      <section id="contacts" className="section pt-0" aria-labelledby="contacts-title">
        <h2 id="contacts-title" className="font-heading text-4xl lg:text-5xl">
          Ждём вас в Stailing
        </h2>
        <div className="mt-6 grid gap-6 lg:grid-cols-2 lg:items-start lg:gap-8">
          <div className="min-w-0">
            <p className="text-lg">{formatAddressLine()}</p>
            <p className="text-muted">м. {salon.metro}</p>
            <p className="mt-2 lg:text-lg">{salon.phoneDisplay}</p>
            <ContactActions />
          </div>
          <MapEmbed />
        </div>
      </section>
    </>
  );
}
