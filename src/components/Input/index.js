import React, { useContext, useState } from 'react';
import starsWContext from '../../context/starsWContext';

export default function Input() {
  const INITIAL_STATE = {
    colum: 'population',
    comparison: 'maior que',
    value: 8000,
  };
  const INITIAL_STATE_OPTIONS = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];

  const { filters, setFilter } = useContext(starsWContext);
  const [stateInput, setInputValue] = useState(INITIAL_STATE);
  const [options, setOptionsSelect] = useState(INITIAL_STATE_OPTIONS);
  const { filterByNumericValues } = filters;
  console.log(filterByNumericValues.length);
  const handleSelect = ({ target }) => {
    const { value, name } = target;
    setInputValue({
      ...stateInput,
      [name]: value,
    });
  };

  const submmitFilter = () => {
    setFilter({
      ...filters,
      filterByName: {
        name: null,
      },
      filterByNumericValues: [
        ...filters.filterByNumericValues,
        stateInput,
      ],
    });
    setOptionsSelect(options.filter((option) => option !== stateInput.colum));
  };

  const handleClearFilters = (index) => {
    filterByNumericValues.splice(index, 1);
    setFilter({
      ...filters,
      filterByName: {
        name: '',
      },
      filterByNumericValues,
    });
  };

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
          { options
            .map((option) => (
              <option key={ option } value={ option }>
                { option }
              </option>
            )) }
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
      <div>
        { filterByNumericValues.length
          ? filterByNumericValues.map(({ colum, comparison, value }, index) => (
            <div key={ colum }>
              <span>{colum}</span>
              <span>{comparison}</span>
              <span>{value}</span>
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
