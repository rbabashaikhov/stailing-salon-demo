import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { Layout } from './Layout';
import { RouteFallback } from './RouteFallback';
import { HomePage } from '../pages/HomePage';
const ServicesPage = lazy(() =>
  import('../pages/ServicesPage').then((m) => ({ default: m.ServicesPage })),
);
const ServicePage = lazy(() =>
  import('../pages/ServicePage').then((m) => ({ default: m.ServicePage })),
);
const PricesPage = lazy(() => import('../pages/PricesPage').then((m) => ({ default: m.PricesPage })));
const MastersPage = lazy(() =>
  import('../pages/MastersPage').then((m) => ({ default: m.MastersPage })),
);
const ContactsPage = lazy(() =>
  import('../pages/ContactsPage').then((m) => ({ default: m.ContactsPage })),
);
const BookingPage = lazy(() =>
  import('../pages/BookingPage').then((m) => ({ default: m.BookingPage })),
);
const PrivacyPage = lazy(() =>
  import('../pages/PrivacyPage').then((m) => ({ default: m.PrivacyPage })),
);
const NotFoundPage = lazy(() =>
  import('../pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })),
);

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'services',
        element: (
          <Suspense fallback={<RouteFallback />}>
            <ServicesPage />
          </Suspense>
        ),
      },
      {
        path: 'services/:categoryId',
        element: (
          <Suspense fallback={<RouteFallback />}>
            <ServicePage />
          </Suspense>
        ),
      },
      {
        path: 'prices',
        element: (
          <Suspense fallback={<RouteFallback />}>
            <PricesPage />
          </Suspense>
        ),
      },
      {
        path: 'masters',
        element: (
          <Suspense fallback={<RouteFallback />}>
            <MastersPage />
          </Suspense>
        ),
      },
      {
        path: 'contacts',
        element: (
          <Suspense fallback={<RouteFallback />}>
            <ContactsPage />
          </Suspense>
        ),
      },
      {
        path: 'booking',
        element: (
          <Suspense fallback={<RouteFallback />}>
            <BookingPage />
          </Suspense>
        ),
      },
      {
        path: 'privacy',
        element: (
          <Suspense fallback={<RouteFallback />}>
            <PrivacyPage />
          </Suspense>
        ),
      },
      {
        path: '*',
        element: (
          <Suspense fallback={<RouteFallback />}>
            <NotFoundPage />
          </Suspense>
        ),
      },
    ],
  },
]);
