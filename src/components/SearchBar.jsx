import React, { useContext } from 'react';
import StarWarsContext from '../Context/StarWarsContext';

function SearchBar() {
  const { text, setText } = useContext(StarWarsContext);
  return (
    <section>
      <input
        data-testid="name-filter"
        onChange={ (e) => setText(e.target.value) }
        placeholder="Pesquise"
        type="text"
        value={ text }
      />
    </section>
  );
}

export default SearchBar;
