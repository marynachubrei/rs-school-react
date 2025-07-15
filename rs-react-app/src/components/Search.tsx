import { type ChangeEvent, Component, type FormEvent } from 'react';
import '../scss/Search.scss';

interface SearchProps {
  onHandleSearch: (e: FormEvent<HTMLFormElement>) => void;
  onHandleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  searchQuery: string;
  onClearSearch: () => void;
}

export class Search extends Component<SearchProps> {
  render() {
    const { onHandleSearch, onHandleInputChange, searchQuery } = this.props;
    return (
      <form onSubmit={onHandleSearch} className="search-form">
        <input
          type="text"
          placeholder="Enter Product Name"
          className="search-input"
          value={searchQuery}
          onChange={onHandleInputChange}
        />
        <button type="submit" className="search-button">
          Search
        </button>
        {searchQuery && (
          <button
            type="button"
            className="clear-button"
            onClick={this.props.onClearSearch}
          >
            Clear
          </button>
        )}
      </form>
    );
  }
}
