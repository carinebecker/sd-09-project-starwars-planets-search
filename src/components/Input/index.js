import React, { useContext, useState } from 'react';
import starsWContext from '../../context/starsWContext';

export default function Input() {
  const INITIAL_STATE = {
    colum: '',
    comparison: '',
    value: 0,
  };
  const { filters, setFilter } = useContext(starsWContext);
  const [stateInput, setInputValue] = useState(INITIAL_STATE);

  const handleSelect = ({ target }) => {
    const { value, name } = target;
    setInputValue({
      ...stateInput,
      [name]: value,
    });
  };

  const submmitFilter = () => (setFilter({
    ...filters,
    filterByName: {
      name: null,
    },
    filterByNumericValues: [
      ...filters.filterByNumericValues,
      stateInput,
    ],
  })
  );

  const handleChange = ({ target }) => {
    const { value } = target;
    setFilter({
      ...filters,
      filterByName: {
        name: value,
      },
    });
  };

  return (
    <div>
      <label htmlFor="search">
        Search
        <input
          type="text"
          id="search"
          data-testid="name-filter"
          value={ filters.filterByName.name }
          onChange={ handleChange }
        />
      </label>
      <label htmlFor="column-filter">
        Column Filter
        <select
          data-testid="column-filter"
          id="column-filter"
          value={ stateInput.colum }
          name="colum"
          onChange={ handleSelect }
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>
      </label>
      <label htmlFor="comparison-filter">
        Comparação
        <select
          data-testid="comparison-filter"
          id="comparison-filter"
          name="comparison"
          value={ stateInput.comparison }
          onChange={ handleSelect }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
      </label>
      <label htmlFor="value-filter">
        Value
        <input
          type="number"
          id="value-filter"
          name="value"
          data-testid="value-filter"
          value={ stateInput.value }
          onChange={ handleSelect }
        />
      </label>
      <button
        type="button"
        data-testid="button-filter"
        onClick={ submmitFilter }
      >
        Filtrar
      </button>
    </div>
  );
}
