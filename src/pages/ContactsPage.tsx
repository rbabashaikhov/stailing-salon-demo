import { ContactActions } from '../components/ContactActions/ContactActions';
import { MapEmbed } from '../components/MapEmbed/MapEmbed';
import { Seo } from '../seo/Seo';
import { buildLocalBusinessJsonLd } from '../seo/schema';
import { salon, formatAddressLine } from '../data/salon';
import { track } from '../analytics/events';

export function ContactsPage() {
  return (
    <>
      <Seo
        title="Контакты салона Stailing в Митино"
        description="Салон красоты Stailing: Москва, Митинская улица, 28к2, метро Митино."
        path="/contacts"
        jsonLd={buildLocalBusinessJsonLd()}
      />
      <div className="section">
        <p className="eyebrow">Контакты</p>
        <h1 className="mt-2 font-heading text-5xl lg:text-6xl">Ждём вас в Stailing</h1>
        <div className="mt-8 grid gap-8 lg:grid-cols-2 lg:items-start lg:gap-12">
          <div className="min-w-0">
            <p className="text-lg lg:text-xl">{formatAddressLine()}</p>
            <p className="text-muted">м. {salon.metro}</p>
            <p className="mt-3 lg:text-lg">
              <a href={salon.phoneHref} onClick={() => track('phone_click')}>
                {salon.phoneDisplay}
              </a>
            </p>
            {salon.hours ? <p className="mt-2">{salon.hours}</p> : null}
            <ContactActions />
          </div>
          <MapEmbed />
        </div>
      </div>
    </>
  );
}
