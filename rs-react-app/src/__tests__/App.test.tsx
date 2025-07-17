import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../App.tsx';

vi.mock('../pages/Main.tsx', () => ({
  default: () => <div data-testid="main-page">Main Content</div>,
}));

describe('App Component', () => {
  it('Render Main component', () => {
    render(<App />);
    const main = screen.getByRole('main');
    expect(main).toBeInTheDocument();
    expect(screen.getByTestId('main-page')).toHaveTextContent('Main Content');
  });
});
