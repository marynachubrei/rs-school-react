import { Component } from 'react';
import '../scss/ProductCardList.scss';
import ProductCard from './ProductCard.tsx';
import type { Product } from '../models/common-models.ts';

interface ProductListProps {
  productList: Product[];
}

export default class ProductCardList extends Component<ProductListProps> {
  render() {
    const { productList } = this.props;
    return (
      <div className="product-grid-wrapper">
        <div className="product-grid">
          {productList.map((product: Product) => (
            <ProductCard key={product.id} card={product} />
          ))}
        </div>
      </div>
    );
  }
}
