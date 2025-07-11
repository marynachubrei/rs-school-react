import { type ChangeEvent, Component, type FormEvent } from 'react';
import { getAllProducts } from '../services/products-api.ts';
import '../scss/Home.scss';
import { Search } from '../components/Search.tsx';
import ProductCardList from '../components/ProductCardList.tsx';
import Loader from '../components/Loader.tsx';
import type { Product } from '../models/common-models.ts';

interface State {
  searchQuery: string;
  productList: Product[];
  loading: boolean;
  triggerError: boolean;
}

export default class Main extends Component {
  state: State = {
    searchQuery: '',
    productList: [],
    loading: true,
    triggerError: false,
  };

  componentDidMount() {
    const savedQuery = localStorage.getItem('searchQuery');
    if (savedQuery) {
      this.setState({ searchQuery: savedQuery }, () => {
        this.getProductList(savedQuery);
      });
    } else {
      this.getProductList();
    }
  }

  async getProductList(query = '') {
    try {
      const productList = await getAllProducts(query);
      this.setState({ productList, triggerError: false });
    } catch (err) {
      this.setState({ triggerError: !!err });
    } finally {
      this.setState({ loading: false });
    }
  }

  handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { searchQuery, loading } = this.state;
    if (!searchQuery.trim() || loading) return;

    this.setState({ loading: true }, () => {
      localStorage.setItem('searchQuery', searchQuery);
      this.getProductList(searchQuery);
    });
  };

  handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    this.setState({ searchQuery: newValue });
  };

  handleClearSearch = () => {
    this.setState({ searchQuery: '', loading: true }, () => {
      if (localStorage.getItem('searchQuery')) {
        localStorage.removeItem('searchQuery');
        this.getProductList();
      }
    });
  };

  handleTriggerError = () => {
    this.setState({ triggerError: true });
  };

  render() {
    const { searchQuery, productList, loading, triggerError } = this.state;

    if (triggerError) {
      throw new Error('YOU CLICKED ON ERROR BUTTON');
    }

    return (
      <div className="home">
        <Search
          onHandleSearch={this.handleSearch}
          onHandleInputChange={this.handleInputChange}
          searchQuery={searchQuery}
          onClearSearch={this.handleClearSearch}
        ></Search>

        {loading ? (
          <Loader />
        ) : (
          <ProductCardList productList={productList}></ProductCardList>
        )}
        <div className="error-button">
          <button onClick={this.handleTriggerError}>Trigger Error</button>
        </div>
      </div>
    );
  }
}
