import { render, screen } from '@testing-library/react';
import ProductCard from '../components/ProductCard';
import { brokenProductMock, productMock1 } from './__mocks__/productMock.ts';

describe('ProductCard', () => {
  it('Displays title and description correctly', () => {
    render(<ProductCard card={productMock1} />);

    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(
      productMock1.title
    );
    expect(screen.getByText(productMock1.description)).toBeInTheDocument();
  });

  it('Handles missing title and description gracefully', () => {
    render(<ProductCard card={brokenProductMock} />);

    const heading = screen.getByRole('heading', { level: 3 });
    const paragraph = screen.getByText((_, node) => node?.tagName === 'P');

    expect(heading).toBeInTheDocument();
    expect(heading).toBeEmptyDOMElement();
    expect(paragraph).toBeInTheDocument();
    expect(paragraph).toBeEmptyDOMElement();
  });
});
