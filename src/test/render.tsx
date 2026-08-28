import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';
import { render, type RenderOptions } from '@testing-library/react';
import type { ReactElement } from 'react';

export function renderWithProviders(ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'> & { path?: string }) {
  const path = options?.path ?? '/';
  return render(ui, {
    wrapper: ({ children }) => (
      <HelmetProvider>
        <MemoryRouter initialEntries={[path]}>{children}</MemoryRouter>
      </HelmetProvider>
    ),
    ...options,
  });
}
