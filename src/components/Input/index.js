import React, { useContext, useState, useEffect } from 'react';
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

  useEffect(() => {
    if (filterByNumericValues.length) {
      filterByNumericValues.forEach(({ colum }) => {
        options.forEach((option, index) => {
          if (option === colum) options.splice(index, 1);
        });
      });
      setOptionsSelect(options);
    }
    console.log('effect');
  }, [filterByNumericValues, setOptionsSelect, options]);

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
    </div>
  );
}
