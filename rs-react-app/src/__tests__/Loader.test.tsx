import { render } from '@testing-library/react';
import Loader from '../components/Loader.tsx';

describe('Loader', () => {
  it('renders spinner wrapper', () => {
    const { container } = render(<Loader />);
    expect(container.querySelector('.loader-wrapper')).toBeInTheDocument();
    expect(container.querySelector('.spinner')).toBeInTheDocument();
  });
});
