import React, { useContext, useState } from 'react';
import MyContext from '../context/MyContext';

function Filters() {
  const { filters, setFilters } = useContext(MyContext);
  const initialState = {
    column: '',
    comparison: '',
    value: '',
  };

  const [state, setState] = useState(initialState);

  function handleInput({ target }) {
    setFilters({
      ...filters,
      filterByName: {
        name: target.value,
      },
    });
  }

  function handleDropDown({ target }) {
    const { name, value } = target;
    setState((lastState) => ({
      ...lastState,
      [name]: value,
    }));
  }

  function handleFilteredInputs(object) {
    setFilters({
      ...filters,
      filterByNumericValues: [object],
    });
  }

  return (
    <div>
      <label htmlFor="name-filter">
        Search for a specific planet name:
        <input
          type="text"
          id="name-filter"
          placeholder="filter by name..."
          data-testid="name-filter"
          onChange={ handleInput }
        />
      </label>
      <label htmlFor="numeric-filters">
        Apply more filters:
        <select
          data-testid="column-filter"
          name="column"
          onClick={ handleDropDown }
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>
        <select
          name="comparison"
          data-testid="comparison-filter"
          onClick={ handleDropDown }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
        <input
          type="number"
          data-testid="value-filter"
          name="value"
          onChange={ handleDropDown }
        />
      </label>
      <button
        type="button"
        data-testid="button-filter"
        onClick={ () => handleFilteredInputs(state) }
      >
        Filtrar
      </button>
    </div>
  );
}

export default Filters;
