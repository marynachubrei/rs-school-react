// Main.test.tsx
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Main from '../pages/Main';
import * as api from '../services/products-api';

import { getAllProducts } from '../services/products-api.ts';
import { errorText, mockProducts } from './__mocks__/productMock.ts';
import userEvent from '@testing-library/user-event';
import ErrorBoundary from '../components/ErrorBoundary.tsx';

describe('Main Component', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('Calls API with trimmed search value on submit', async () => {
    vi.spyOn(api, 'getAllProducts').mockResolvedValue(mockProducts);

    render(<Main />);

    const input = screen.getByTestId('search-input');
    await userEvent.type(input, mockProducts[0].title);
    await userEvent.click(screen.getByText('Search'));

    await waitFor(() => {
      expect(getAllProducts).toHaveBeenLastCalledWith(mockProducts[0].title);
    });
  });

  it('Clears search query and calls getProductList again', async () => {
    const mockGetAll = vi
      .spyOn(api, 'getAllProducts')
      .mockResolvedValue(mockProducts);

    localStorage.setItem('searchQuery', 'Test Product');

    render(<Main />);

    const input = await screen.findByPlaceholderText(/enter product name/i);
    fireEvent.change(input, { target: { value: 'Test Product' } });

    const clearButton = await screen.findByTestId('clear-button');
    fireEvent.click(clearButton);

    await waitFor(() => {
      expect(localStorage.getItem('searchQuery')).toBe(null);
      expect(mockGetAll).toHaveBeenCalledWith('');
    });
  });

  it('Throws an error when trigger error button is clicked', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <Main />
      </ErrorBoundary>
    );

    const errorBtn = screen.getByRole('button', { name: 'Trigger Error' });
    fireEvent.click(errorBtn);

    expect(screen.getByText(errorText)).toBeInTheDocument();
  });
});
