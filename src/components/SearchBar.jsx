import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

const SearchBar = () => {
  const { filters, setFilterByName } = useContext(AppContext);

  return (
    <form>
      <input
        data-testid="name-filter"
        type="text"
        onChange={ (e) => {
          setFilterByName(e.target.value);
        } }
        id=""
        value={ filters.filterByName.name }
      />
      {/* <button
        onClick={  }
      >
        Run Filter
      </button> */}
    </form>
  );
};

export default SearchBar;
