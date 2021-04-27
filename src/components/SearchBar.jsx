import React, { useContext } from 'react';
import StarWarsContext from '../Context/StarWarsContext';

function SearchBar() {
  const { setFilters } = useContext(StarWarsContext);
  const handleChange = ({ target }) => {
    setFilters({
      filterByName: {
        name: target.value,
      },
    });
  };

  return (
    <section>
      <input
        data-testid="name-filter"
        name="name-filter"
        onChange={ handleChange }
        placeholder="Pesquise"
        type="text"
      />
    </section>
  );
}

SearchBar.contextType = StarWarsContext;

export default SearchBar;
