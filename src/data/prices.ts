import { services, popularServiceIds, type ServiceItem } from './services';

export function getPopularServices(): ServiceItem[] {
  return popularServiceIds
    .map((id) => services.find((s) => s.id === id))
    .filter((s): s is ServiceItem => Boolean(s));
}

export function getPricedServices(): ServiceItem[] {
  return services.filter((s) => s.price.kind === 'range');
}
