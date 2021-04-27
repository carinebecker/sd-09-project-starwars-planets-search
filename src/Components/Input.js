import React, { useContext, useState } from 'react';
import StarWarsContext from '../Context/StarWarsContext';

export default function Input() {
  const INITIAL_STATE = {
    column: 'population',
    comparison: 'maior que',
    value: '0',
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
  const handleButton = () => {
    setFilter({
      filterByName: {
        name: filters.filterByName.name,
      },
      filterByNumericValues: [
        ...filters.filterByNumericValues,
        inputState,
      ],
    });
    setOptions(INITIAL_STATE_OPTIONS.filter((option) => option !== inputState.column));
  };
  const handleClearFilters = (index) => {
    filters.filterByNumericValues.splice(index, 1);
    setFilter({
      ...filters,
      filterByName: {
        name: '',
      },
      ...filters.filterByNumericValues,
    });
  };
  // Source of the handleClearFilters functions: https://github.com/tryber/sd-09-project-starwars-planets-search/pull/52/files /

  return (
    <div>
      <label htmlFor="search">
        Search
        <input
          type="text"
          data-testid="name-filter"
          value={ filters.filterByName.name }
          onChange={ handleChange }
        />
      </label>
      <label htmlFor="column-filter">
        Column
        <select
          data-testid="column-filter"
          value={ inputState.column }
          name="column"
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
      <label htmlFor="comparison-filter">
        Comparison
        <select
          data-testid="comparison-filter"
          name="comparison"
          value={ inputState.comparison }
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
          name="value"
          data-testid="value-filter"
          value={ inputState.value }
          onChange={ handleSelect }
        />
      </label>
      <button
        type="button"
        data-testid="button-filter"
        onClick={ handleButton }
      >
        Filter
      </button>
      <div>
        { filters.filterByNumericValues.length
          ? filters.filterByNumericValues.map(({ column, comparison, value }, index) => (
            <div key={ index }>
              <span>{`Filtro: ${column} ${comparison} ${value}`}</span>
              <div data-testid="filter">
                <button
                  type="button"
                  onClick={ () => handleClearFilters(index) }
                >
                  X
                </button>
              </div>
            </div>
          ))
          : ''}
      </div>
    </div>
  );
}
