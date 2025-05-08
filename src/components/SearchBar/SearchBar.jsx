import { useState } from 'react';
import css from './SearchBar.module.css';

const SearchBar = ({ handleChangeQuery }) => {
  const [query, setQuery] = useState('');

  const handleChange = event => {
    setQuery(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    handleChangeQuery(query);
  };

  return (
    <div className={css.searchBar}>
      <form onSubmit={handleSubmit} className={css.searchForm}>
        <input
          type="text"
          placeholder="Search movies"
          value={query}
          onChange={handleChange}
          className={css.searchInput}
        />
        <button type="submit" className={css.searchButton}>
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
