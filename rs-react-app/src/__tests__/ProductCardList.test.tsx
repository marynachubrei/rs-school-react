import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ProductCardList from '../components/ProductCardList';
import { brokenMockProducts, mockProducts } from './__mocks__/productMock.ts';

describe('ProductCardList', () => {
  it('Renders correct number of items when data is provided', () => {
    render(<ProductCardList productList={mockProducts} />);

    const cards = screen.getAllByTestId('product-card');
    expect(cards).toHaveLength(mockProducts.length);
  });

  it('Correctly displays item titles and descriptions', () => {
    render(<ProductCardList productList={mockProducts} />);

    expect(screen.getByText(mockProducts[0].title)).toBeInTheDocument();
    expect(screen.getByText(mockProducts[0].description)).toBeInTheDocument();
    expect(screen.getByText(mockProducts[1].title)).toBeInTheDocument();
    expect(screen.getByText(mockProducts[1].description)).toBeInTheDocument();
  });

  it('Handles missing data gracefully', () => {
    render(<ProductCardList productList={brokenMockProducts} />);

    expect(screen.getByTestId('product-card').title).toBe(
      brokenMockProducts[0].title
    );
  });
});
