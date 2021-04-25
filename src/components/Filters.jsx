import React, { useContext, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import '../styles/Filters.css';

function Filters() {
  const {
    setFilterByName,
    columns,
    setColumns,
    setFilterByNumericValues,
  } = useContext(PlanetsContext);

  const [filterByValues, setFilterByValues] = useState({
    column: 'population',
    comparison: 'menor que',
    value: '0',
  });

  function handleFilterByName({ target: { value } }) {
    setFilterByName({ name: value });
  }

  function handleFilterByValues({ target: { name, value } }) {
    setFilterByValues({
      ...filterByValues,
      [name]: value,
    });
  }

  function handleClick() {
    setFilterByNumericValues(filterByValues);
    const initialColumns = [
      'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
    ];
    setColumns(initialColumns.filter((option) => option !== filterByValues.column));
  }

  return (
    <div>
      <label htmlFor="filter-name">
        <input
          type="text"
          data-testid="name-filter"
          name="name"
          id="nameInput"
          placeholder="Search for text..."
          onChange={ handleFilterByName }
        />
      </label>

      <label htmlFor="filter-column">
        <select
          data-testid="column-filter"
          name="column"
          id="filter-column"
          onChange={ handleFilterByValues }
        >
          { columns.map((option) => (
            <option key={ option } value={ option }>{option}</option>
          ))}
        </select>
      </label>

      <label htmlFor="filter-comparison">
        <select
          data-testid="comparison-filter"
          name="comparison"
          id="filter-comparison"
          onChange={ handleFilterByValues }
        >
          <option value="menor que">menor que</option>
          <option value="maior que">maior que</option>
          <option value="igual a">igual a</option>
        </select>
      </label>

      <label htmlFor="filter-value">
        <input
          type="number"
          data-testid="value-filter"
          name="value"
          id="filter-value"
          min="0"
          onChange={ handleFilterByValues }
        />
      </label>

      <button
        type="button"
        data-testid="button-filter"
        id="filter-button"
        onClick={ handleClick }
      >
        Filter
      </button>
    </div>
  );
}

export default Filters;
