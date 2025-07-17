import { Component } from 'react';
import '../scss/ProductCard.scss';

interface ProductCardProps {
  card: {
    id: string;
    title: string;
    description: string;
  };
}

export default class ProductCard extends Component<ProductCardProps> {
  render() {
    const { card } = this.props;
    return (
      <div className="product-card" data-testid="product-card">
        <div className="product-info">
          <h3>{card.title}</h3>
          <p>{card.description}</p>
        </div>
      </div>
    );
  }
}
