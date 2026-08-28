import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import { MobileBookingBar } from './MobileBookingBar';
import { renderWithProviders } from '../../test/render';

describe('MobileBookingBar', () => {
  it('shows call and booking actions without messenger', () => {
    renderWithProviders(<MobileBookingBar />);
    expect(screen.getByRole('link', { name: 'Позвонить' })).toHaveAttribute('href', 'tel:+79268101900');
    expect(screen.getByRole('link', { name: 'Записаться' })).toHaveAttribute('href', '/booking');
    expect(screen.queryByRole('link', { name: 'Написать' })).not.toBeInTheDocument();
  });

  it('is hidden on the booking page', () => {
    renderWithProviders(<MobileBookingBar />, { path: '/booking' });
    expect(screen.queryByRole('link', { name: 'Записаться' })).not.toBeInTheDocument();
  });
});
