import { salon } from '../data/salon';
import { serviceCategories } from '../data/services';

type SchemaOptions = {
  includeOpeningHours?: boolean;
};

export function buildLocalBusinessJsonLd(options: SchemaOptions = {}): Record<string, unknown> {
  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': ['BeautySalon', 'LocalBusiness'],
    name: salon.name,
    alternateName: salon.fullName,
    description: salon.seo.homeDescription,
    telephone: salon.phoneDisplay,
    address: {
      '@type': 'PostalAddress',
      streetAddress: salon.street,
      addressLocality: salon.city,
      addressCountry: 'RU',
    },
  };

  if (options.includeOpeningHours && salon.hours) {
    data.openingHoursSpecification = {
      '@type': 'OpeningHoursSpecification',
      description: salon.hours,
    };
  }

  return data;
}

export function buildServiceJsonLd(categoryId: string): Record<string, unknown> | null {
  const category = serviceCategories.find((c) => c.id === categoryId);
  if (!category) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: category.name,
    provider: {
      '@type': 'BeautySalon',
      name: salon.name,
      address: {
        '@type': 'PostalAddress',
        streetAddress: salon.street,
        addressLocality: salon.city,
        addressCountry: 'RU',
      },
    },
    areaServed: salon.city,
  };
}
