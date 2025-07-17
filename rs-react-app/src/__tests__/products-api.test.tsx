import { vi, describe, it, expect, beforeEach } from 'vitest';
import { getAllProducts } from '../services/products-api.ts';
import { mockProducts } from './__mocks__/productMock.ts';

describe('getAllProducts', () => {
  beforeEach(() => {
    vi.restoreAllMocks(); // reset fetch mocks between tests
  });

  it('Encodes the query string properly', async () => {
    const query = mockProducts[0].title;
    const encodedQuery = encodeURIComponent(query);
    const mockJson = vi.fn().mockResolvedValue({ products: mockProducts });

    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ json: mockJson }));

    await getAllProducts(query);

    expect(fetch).toHaveBeenCalledWith(
      `https://dummyjson.com/products/search?q=${encodedQuery}`,
      {}
    );
  });
});
