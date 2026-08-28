import { describe, expect, it, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BookingFlow } from './BookingFlow';
import { DemoBookingProvider } from '../../booking/DemoBookingProvider';
import { renderWithProviders } from '../../test/render';

describe('BookingFlow', () => {
  it('walks through steps and requires contacts + consent', async () => {
    const user = userEvent.setup();
    renderWithProviders(<BookingFlow provider={new DemoBookingProvider()} />);

    await screen.findByText('Выберите направление');
    expect(screen.getByText('Шаг 1 из 7')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Волосы' }));
    await user.click(screen.getByRole('button', { name: 'Далее' }));

    await screen.findByText('Выберите услугу');
    await user.click(screen.getByRole('button', { name: /Женская стрижка/ }));
    await user.click(screen.getByRole('button', { name: 'Далее' }));

    await screen.findByText('Выберите мастера');
    expect(
      screen.getByText('Специалисты показаны для демонстрации сценария записи.'),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Любой специалист' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Анна/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Ольга/ })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /Мария/ })).not.toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /Анна/ }));
    await user.click(screen.getByRole('button', { name: 'Далее' }));

    await screen.findByText('Выберите дату');
    await user.click(screen.getAllByRole('button', { name: /Выбрать дату/ })[0]!);
    await user.click(screen.getByRole('button', { name: 'Далее' }));

    await screen.findByText('Когда вам удобно?');
    expect(
      screen.getByText(/В демо показано примерное расписание/),
    ).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Утро' })).not.toBeInTheDocument();
    const availableSlot = screen.getAllByRole('button', { name: /Выбрать \d/ })[0];
    expect(availableSlot).toBeTruthy();
    await user.click(availableSlot!);
    const unavailable = screen.getAllByRole('button', { name: /недоступно в демо-расписании/ });
    expect(unavailable.length).toBeGreaterThan(0);
    unavailable.forEach((btn) => expect(btn).toBeDisabled());
    await user.click(screen.getByRole('button', { name: 'Далее' }));

    await screen.findByText('Ваши контакты');
    await user.click(screen.getByRole('button', { name: 'Отправить заявку' }));
    expect(await screen.findByRole('alert')).toBeInTheDocument();

    await user.type(screen.getByLabelText('Имя'), 'Анна');
    await user.type(screen.getByLabelText('Телефон'), '+79268101900');
    await user.click(screen.getByRole('checkbox'));
    await user.click(screen.getByRole('button', { name: 'Отправить заявку' }));

    expect(await screen.findByText(/демонстрация сценария записи/)).toBeInTheDocument();
  });

  it('keeps flow working with any specialist and HH:mm preferred_time', async () => {
    const user = userEvent.setup();
    const provider = new DemoBookingProvider();
    const create = vi.spyOn(provider, 'createBooking');
    renderWithProviders(<BookingFlow provider={provider} />);

    await screen.findByText('Выберите направление');
    await user.click(screen.getByRole('button', { name: 'Волосы' }));
    await user.click(screen.getByRole('button', { name: 'Далее' }));
    await user.click(screen.getByRole('button', { name: /Женская стрижка/ }));
    await user.click(screen.getByRole('button', { name: 'Далее' }));
    await user.click(screen.getByRole('button', { name: 'Любой специалист' }));
    await user.click(screen.getByRole('button', { name: 'Далее' }));
    await user.click(screen.getAllByRole('button', { name: /Выбрать дату/ })[0]!);
    await user.click(screen.getByRole('button', { name: 'Далее' }));

    await screen.findByText('Когда вам удобно?');
    const slot = screen.getAllByRole('button', { name: /Выбрать \d/ })[0]!;
    await user.click(slot);
    expect(slot).toHaveAttribute('aria-pressed', 'true');
    await user.click(screen.getByRole('button', { name: 'Далее' }));
    await user.type(screen.getByLabelText('Имя'), 'Анна');
    await user.type(screen.getByLabelText('Телефон'), '+79268101900');
    await user.click(screen.getByRole('checkbox'));
    await user.click(screen.getByRole('button', { name: 'Отправить заявку' }));

    await screen.findByText(/демонстрация сценария записи/);
    expect(create).toHaveBeenCalledWith(
      expect.objectContaining({
        master_id: 'any',
        preferred_time: expect.stringMatching(/^([01]\d|2[0-3]):[0-5]\d$/),
      }),
    );
  });

  it('clears the selected slot when date or specialist changes', async () => {
    const user = userEvent.setup();
    const provider = new DemoBookingProvider();
    const availability = vi.spyOn(provider, 'getAvailability');
    renderWithProviders(<BookingFlow provider={provider} />);

    await screen.findByText('Выберите направление');
    await user.click(screen.getByRole('button', { name: 'Волосы' }));
    await user.click(screen.getByRole('button', { name: 'Далее' }));
    await user.click(screen.getByRole('button', { name: /Женская стрижка/ }));
    await user.click(screen.getByRole('button', { name: 'Далее' }));
    await user.click(screen.getByRole('button', { name: /Анна/ }));
    await user.click(screen.getByRole('button', { name: 'Далее' }));
    await user.click(screen.getAllByRole('button', { name: /Выбрать дату/ })[0]!);
    await user.click(screen.getByRole('button', { name: 'Далее' }));
    const firstSlot = await screen.findAllByRole('button', { name: /Выбрать \d/ });
    await user.click(firstSlot[0]!);
    expect(firstSlot[0]).toHaveAttribute('aria-pressed', 'true');

    availability.mockClear();
    await user.click(screen.getByRole('button', { name: 'Назад' }));
    await user.click(screen.getAllByRole('button', { name: /Выбрать дату/ })[1]!);
    expect(availability).toHaveBeenCalled();
    await user.click(screen.getByRole('button', { name: 'Далее' }));
    expect(screen.queryByRole('button', { pressed: true })).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Назад' }));
    await user.click(screen.getByRole('button', { name: 'Назад' }));
    availability.mockClear();
    await user.click(screen.getByRole('button', { name: /Ольга/ }));
    expect(availability).toHaveBeenCalled();
    await user.click(screen.getByRole('button', { name: 'Далее' }));
    await user.click(screen.getByRole('button', { name: 'Далее' }));
    expect(screen.queryByRole('button', { pressed: true })).not.toBeInTheDocument();
  });

  it('shows an empty-day state when no slots are available', async () => {
    const user = userEvent.setup();
    const provider = new DemoBookingProvider();
    vi.spyOn(provider, 'getAvailability').mockImplementation(async (query) => {
      const base = await new DemoBookingProvider().getAvailability(query);
      if (!query?.date) return base;
      return {
        ...base,
        times: base.times.map((t) => ({ ...t, available: false })),
      };
    });
    renderWithProviders(<BookingFlow provider={provider} />);

    await screen.findByText('Выберите направление');
    await user.click(screen.getByRole('button', { name: 'Волосы' }));
    await user.click(screen.getByRole('button', { name: 'Далее' }));
    await user.click(screen.getByRole('button', { name: /Женская стрижка/ }));
    await user.click(screen.getByRole('button', { name: 'Далее' }));
    await user.click(screen.getByRole('button', { name: 'Далее' }));
    await user.click(screen.getAllByRole('button', { name: /Выбрать дату/ })[0]!);
    await user.click(screen.getByRole('button', { name: 'Далее' }));

    expect(await screen.findByText(/На выбранную дату свободного времени нет/)).toBeInTheDocument();
    expect(screen.getByText(/Выберите другой день/)).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Выбрать другой день' }));
    expect(await screen.findByText('Выберите дату')).toBeInTheDocument();
  });

  it('lists specialists for the selected direction only', async () => {
    const user = userEvent.setup();
    renderWithProviders(<BookingFlow provider={new DemoBookingProvider()} />);

    await screen.findByText('Выберите направление');
    await user.click(screen.getByRole('button', { name: 'Ногти' }));
    await user.click(screen.getByRole('button', { name: 'Далее' }));
    await user.click(screen.getByRole('button', { name: /Маникюр/ }));
    await user.click(screen.getByRole('button', { name: 'Далее' }));

    await screen.findByText('Выберите мастера');
    const specialistButtons = screen.getAllByRole('button').filter((el) => el.textContent !== 'Далее' && el.textContent !== 'Назад');
    expect(specialistButtons[0]).toHaveTextContent('Любой специалист');
    expect(screen.getByRole('button', { name: /Мария/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Екатерина/ })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /Анна/ })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /Светлана/ })).not.toBeInTheDocument();
  });
});
