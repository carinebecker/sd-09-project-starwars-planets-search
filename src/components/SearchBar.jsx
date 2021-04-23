import React, { useContext, useState } from 'react';
import AppContext from '../context/AppContext';

const SearchBar = () => {
  const { filters, setFilterByName, setNumberFilters } = useContext(AppContext);
  const [column, setColumn] = useState('');
  const [comparison, setType] = useState('');
  const [value, setValue] = useState(0);
  const { filterByName } = filters;
  // const { column, comparison, value } = filterByNumericValues;

  return (
    <form>
      <input
        data-testid="name-filter"
        type="text"
        onChange={ (e) => {
          setFilterByName(e.target.value);
        } }
        id=""
        value={ filterByName.name }
      />
      <select
        data-testid="column-filter"
        onChange={ ({ target }) => { setColumn(target.value); } }
        value={ column }
      >
        <option value="" disabled>Select</option>
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>
      <select
        data-testid="comparison-filter"
        onChange={ ({ target }) => { setType(target.value); } }
        value={ comparison }
      >
        <option value="" disabled>Select</option>
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input
        data-testid="value-filter"
        type="number"
        onChange={ ({ target }) => { setValue(target.value); } }
        id=""
        value={ value }
      />
      <button
        data-testid="button-filter"
        type="button"
        onClick={ () => { setNumberFilters(column, comparison, value); } }
      >
        Add filter
      </button>
    </form>
  );
};

export default SearchBar;
