import React from 'react';

class SearchBar extends React.Component {
  render() {
    return (
      <label htmlFor="search-bar">
        Pesquisar:

        <input
          type="text"
          id="search-bar"
          name="search-bar"
        />
      </label>
    );
  }
}

export default SearchBar;
