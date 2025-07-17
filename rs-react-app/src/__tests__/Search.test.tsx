import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Search } from '../components/Search';

describe('Search Component', () => {
  const mockSearch = vi.fn();
  const mockInputChange = vi.fn();
  const mockClear = vi.fn();
  const placeholderText = 'Enter Product Name';
  const searchButtonName = 'Search';

  const setup = (searchQuery = '') => {
    return render(
      <Search
        onHandleSearch={mockSearch}
        onHandleInputChange={mockInputChange}
        searchQuery={searchQuery}
        onClearSearch={mockClear}
      />
    );
  };

  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('Renders search input and button', () => {
    setup();
    expect(screen.getByPlaceholderText(placeholderText)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: searchButtonName })
    ).toBeInTheDocument();
  });

  it('Renders input with value from props', () => {
    const searchQuery = 'Product';
    setup(searchQuery);
    const input = screen.getByPlaceholderText(
      placeholderText
    ) as HTMLInputElement;
    expect(input.value).toBe(searchQuery);
  });

  it('Calls onHandleInputChange when user types', async () => {
    setup();

    const input = screen.getByPlaceholderText(placeholderText);
    await userEvent.type(input, 'apple');

    expect(mockInputChange).toHaveBeenCalled();
  });
});
