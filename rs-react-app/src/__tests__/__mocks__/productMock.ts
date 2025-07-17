import type { Product } from '../../models/common-models.ts';

export const productMock1: Product = {
  id: '1',
  title: 'Product 1',
  description: 'First item',
};
export const productMock2: Product = {
  id: '2',
  title: 'Product 2',
  description: 'Second item',
};

export const brokenProductMock: Product = {
  id: '1',
  title: '',
  description: '',
};

export const mockProducts = [productMock1, productMock2];

export const brokenMockProducts = [brokenProductMock];

export const errorText = 'Something went wrong.';
