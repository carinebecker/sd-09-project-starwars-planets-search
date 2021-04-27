import React, { useContext, useState } from 'react';
import StarWarsContext from '../Context/StarWarsContext';

export default function Input() {
  const INITIAL_STATE = {
    column: 'population',
    comparison: 'maior que',
    value: '100000',
  };
  const INITIAL_STATE_OPTIONS = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];
  const { filters, setFilter } = useContext(StarWarsContext);
  const [options, setOptions] = useState(INITIAL_STATE_OPTIONS);
  const [inputState, setInput] = useState(INITIAL_STATE);
  const { filterByNumericValues } = filters;
  const handleChange = ({ target }) => {
    const { value } = target;
    setFilter({
      ...filters,
      filterByName: {
        name: value,
      },
    });
  };
  const handleSelect = ({ target }) => {
    const { value, name } = target;
    setInput({
      ...inputState,
      [name]: value,
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
          value={ inputState.colum }
          name="colum"
          onChange={ handleSelect }
        >
          { options
            .map((option) => (
              <option key={ option } value={ option }>
                { option }
              </option>
            )) }
        </select>
      </label>
    </div>
  );
}
