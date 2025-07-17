// ErrorBoundary.test.tsx
import { describe, it, vi, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import ErrorBoundary from '../components/ErrorBoundary';
import userEvent from '@testing-library/user-event';
import { errorText } from './__mocks__/productMock.ts';

const errorMessage = 'Error message';

const ThrowError = () => {
  throw new Error(errorMessage);
};

describe('ErrorBoundary', () => {
  const originalError = console.error;

  beforeEach(() => {
    console.error = vi.fn();
  });

  afterEach(() => {
    console.error = originalError;
  });

  it('Catches error and displays fallback UI', () => {
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(screen.getByText(errorText)).toBeInTheDocument();
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('Logs error to console', () => {
    const spy = vi.spyOn(console, 'error');
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(spy).toHaveBeenCalled();
  });

  it('Clicking "Refresh" button reloads the page', async () => {
    const reloadMock = vi.fn();
    vi.stubGlobal('location', { reload: reloadMock });

    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    const refreshButton = screen.getByRole('button', { name: 'Refresh' });
    await userEvent.click(refreshButton);

    expect(reloadMock).toHaveBeenCalled();
  });
});
