import { BookingFlow } from '../components/BookingFlow/BookingFlow';
import { Seo } from '../seo/Seo';

export function BookingPage() {
  return (
    <>
      <Seo
        title="Онлайн-запись в Stailing"
        description="Запись в салон красоты Stailing в Митино: оставьте заявку, администратор подтвердит время."
        path="/booking"
      />
      <div className="section">
        <p className="eyebrow">Онлайн-запись</p>
        <h1 className="mt-2 font-heading text-5xl lg:text-6xl">Записаться в Stailing</h1>
        <p className="mt-3 max-w-2xl text-muted lg:text-lg">
          Это демонстрация сценария записи. Реальное время будет подтверждаться салоном.
        </p>
        <div className="mt-8">
          <BookingFlow />
        </div>
      </div>
    </>
  );
}
