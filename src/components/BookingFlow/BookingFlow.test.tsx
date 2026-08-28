import { describe, expect, it } from 'vitest';
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
    await user.click(screen.getByRole('button', { name: 'Утро' }));
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
