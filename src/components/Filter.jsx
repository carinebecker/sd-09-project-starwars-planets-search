import React, { useState } from 'react';
import { useFilters } from '../context/Planets';

const handleInputChange = (event, key, setState) => {
  const { target } = event;
  const value = target.type === 'checkbox' ? target.checked : target.value;
  const { name } = target;

  setState((prevState) => ({ ...prevState, [name]: { [key]: value } }));
};

const Filter = () => {
  const { filters, setFilters } = useFilters();
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState(0);

  const addNumericFilter = () => {
    const newFilters = { ...filters };
    const numericFilter = {
      column,
      comparison,
      value,
    };
    newFilters.filterByNumericValues.push(numericFilter);
    setFilters(newFilters);
  };

  return (
    <div>
      <input
        type="text"
        name="filterByName"
        placeholder="Filter by Name"
        onChange={ (event) => handleInputChange(event, 'name', setFilters) }
        data-testid="name-filter"
      />
      <div>
        <select
          name="column"
          data-testid="column-filter"
          onChange={ ({ target }) => setColumn(target.value) }
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
          onChange={ ({ target }) => setComparison(target.value) }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
        <input
          type="number"
          name="value"
          onChange={ ({ target }) => setValue(target.value) }
          data-testid="value-filter"
        />
        <button
          type="button"
          onClick={ () => addNumericFilter() }
          data-testid="button-filter"
        >
          Adicionar Filtro
        </button>
      </div>
    </div>
  );
};

export default Filter;
