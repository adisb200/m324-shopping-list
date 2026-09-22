/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '../Header';

describe('Header', () => {
  it('renders the logo link', () => {
    render(<Header />);
    expect(screen.getByRole('link', { name: 'Einkaufsliste App' })).toHaveAttribute('href', '/');
  });

  it('renders the navigation links', () => {
    render(<Header />);
    expect(screen.getByRole('link', { name: 'Neue Liste erstellen' })).toHaveAttribute('href', '/register');
    expect(screen.getByRole('link', { name: 'Liste beitreten' })).toHaveAttribute('href', '/join');
    expect(screen.getByRole('link', { name: 'Einkaufsliste anzeigen' })).toHaveAttribute('href', '/list');
  });
});
