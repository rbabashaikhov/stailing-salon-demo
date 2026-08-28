import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Header } from '../components/Header/Header';
import { Footer } from '../components/Footer/Footer';
import { MobileBookingBar } from '../components/MobileBookingBar/MobileBookingBar';
import { BackToTop } from '../components/BackToTop/BackToTop';
import { captureUtm } from '../analytics/utm';
import { track } from '../analytics/events';

export function Layout() {
  const location = useLocation();
  const isBooking = location.pathname === '/booking';

  useEffect(() => {
    captureUtm(location.search);
    track('page_view', { page_path: location.pathname });
    if (location.hash) {
      const el = document.getElementById(location.hash.slice(1));
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      el?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.search, location.hash]);

  return (
    <div className={`flex min-h-screen min-w-0 flex-col ${isBooking ? 'pb-0' : 'pb-[5.25rem] md:pb-0'}`}>
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <MobileBookingBar />
      <BackToTop />
    </div>
  );
}
