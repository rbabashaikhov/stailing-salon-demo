import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import { Header } from './Header';
import { renderWithProviders } from '../../test/render';

describe('navigation', () => {
  it('renders main nav and booking CTA', () => {
    renderWithProviders(<Header />);
    expect(screen.getByRole('link', { name: 'STAILING' })).toHaveAttribute('href', '/');
    expect(screen.getAllByRole('link', { name: 'Записаться' }).length).toBeGreaterThan(0);
    expect(screen.getByRole('link', { name: 'Услуги' })).toHaveAttribute('href', '/services');
    expect(screen.getByRole('link', { name: 'Цены' })).toHaveAttribute('href', '/prices');
    expect(screen.getByRole('link', { name: 'Мастера' })).toHaveAttribute('href', '/masters');
    expect(screen.getByRole('link', { name: 'Контакты' })).toHaveAttribute('href', '/contacts');
  });
});
