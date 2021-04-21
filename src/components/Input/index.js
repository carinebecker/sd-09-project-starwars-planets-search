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
      <label htmlFor="colum-filter">
        Column Filter
        <select
          data-testid="colum-filter"
          id="colum-filter"
          value={ stateInput.colum }
          name="colum"
          onChange={ handleSelect }
        >
          <option value="populacion"> Populacion </option>
          <option value="orbital_period"> Orbital Period </option>
          <option value="diameter"> Diameter </option>
          <option value="rotation_period"> Rotation Period </option>
          <option value="surface_water"> Surface Water </option>
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
          <option value="maior que"> Maior que </option>
          <option value="menor que"> Menor que </option>
          <option value="igual a"> Igual a </option>
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
