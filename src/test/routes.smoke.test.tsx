import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import { HomePage } from '../pages/HomePage';
import { ServicesPage } from '../pages/ServicesPage';
import { ServicePage } from '../pages/ServicePage';
import { PricesPage } from '../pages/PricesPage';
import { MastersPage } from '../pages/MastersPage';
import { ContactsPage } from '../pages/ContactsPage';
import { BookingPage } from '../pages/BookingPage';
import { PrivacyPage } from '../pages/PrivacyPage';
import { NotFoundPage } from '../pages/NotFoundPage';
import { DemoBookingProvider } from '../booking/DemoBookingProvider';
import { setBookingProvider } from '../booking/HttpBookingProvider';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { render } from '@testing-library/react';

setBookingProvider(new DemoBookingProvider());

function renderRoute(path: string) {
  return render(
    <HelmetProvider>
      <MemoryRouter initialEntries={[path]}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:categoryId" element={<ServicePage />} />
          <Route path="/prices" element={<PricesPage />} />
          <Route path="/masters" element={<MastersPage />} />
          <Route path="/contacts" element={<ContactsPage />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </MemoryRouter>
    </HelmetProvider>,
  );
}

describe('route smoke', () => {
  it.each([
    ['/', 'Салон красоты в Митино'],
    ['/services', 'Услуги'],
    ['/services/hair', 'Волосы'],
    ['/services/nails', 'Ногти'],
    ['/services/cosmetology', 'Косметология'],
    ['/services/epilation', 'Эпиляция'],
    ['/prices', 'Цены'],
    ['/masters', 'Мастера Stailing'],
    ['/contacts', 'Ждём вас в Stailing'],
    ['/booking', 'Записаться в Stailing'],
    ['/privacy', 'Политика конфиденциальности'],
    ['/unknown', 'Страница не найдена'],
  ])('renders %s', async (path, heading) => {
    renderRoute(path);
    expect(await screen.findByRole('heading', { name: heading })).toBeInTheDocument();
  });
});
