import React, { useContext, useState } from 'react';
import SWContext from '../context/SWContext';

const SearchBar = () => {
  const { filterName, filterNumber } = useContext(SWContext);
  const [filterByNumber, setFilterByNumber] = useState({
    column: '',
    comparison: '',
    value: 0,
  });

  const handleFilter = ({ target: { name, value } }) => {
    setFilterByNumber({ ...filterByNumber, [name]: value });
    // filterNumber(filterByNumber);
  };

  return (
    <>
      <input
        data-testid="name-filter"
        onChange={ (event) => filterName(event) }
        type="text"
      />

      <select
        data-testid="column-filter"
        name="column"
        onChange={ handleFilter }
      >
        <option>population</option>
        <option>orbital_period</option>
        <option>diameter</option>
        <option>rotation_period</option>
        <option>surface_water</option>
      </select>

      <select
        data-testid="comparison-filter"
        name="comparison"
        onChange={ handleFilter }
      >
        <option>igual a</option>
        <option>menor que</option>
        <option>maior que</option>
      </select>

      <input
        data-testid="value-filter"
        type="number"
        name="value"
        onChange={ handleFilter }
      />

      <button
        data-testid="button-filter"
        type="button"
        onClick={ () => filterNumber(filterByNumber) }
      >
        Filtrar
      </button>
    </>
  );
};

export default SearchBar;
