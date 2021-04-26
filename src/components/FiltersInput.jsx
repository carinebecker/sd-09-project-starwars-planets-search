import React, { useContext, useState } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function FiltersInput() {
  const {
    setFilterByName,
    setFilterByValues,
    columnOptions,
    setColumnOptions } = useContext(StarWarsContext);
  const [filterByNumericValues, setFilterByNumericValues] = useState({
    column: 'population',
    comparison: '',
    value: '0',
  });

  const handleInputName = ({ target: { value } }) => {
    setFilterByName({ name: value });
  };

  const handleFilterValues = ({ target: { name, value } }) => {
    setFilterByNumericValues({
      ...filterByNumericValues,
      [name]: value,
    });
  };

  const handleButtonClick = () => {
    const initialColumnOptions = [
      'population',
      'orbital_period',
      'diameter',
      'rotation_period',
      'surface_water',
    ];
    setFilterByValues(filterByNumericValues);
    setColumnOptions(initialColumnOptions
      .filter((option) => option !== filterByNumericValues.column));
    setFilterByNumericValues({
      ...filterByNumericValues,
      column: columnOptions[0],
    });
  };

  return (
    <div>
      <label htmlFor="filter-name">
        <input
          type="text"
          data-testid="name-filter"
          name="name"
          id="nameInput"
          placeholder="Search for text..."
          onChange={ handleInputName }
        />
      </label>

      <label htmlFor="filter-column">
        <select
          data-testid="column-filter"
          name="column"
          id="filter-column"
          onChange={ handleFilterValues }
        >
          { columnOptions.map((option) => (
            <option key={ option } value={ option }>{option}</option>
          ))}
        </select>
      </label>

      <label htmlFor="filter-comparison">
        <select
          data-testid="comparison-filter"
          name="comparison"
          id="filter-comparison"
          onChange={ handleFilterValues }
        >
          <option value="">--</option>
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
          onChange={ handleFilterValues }
        />
      </label>

      <button
        type="button"
        data-testid="button-filter"
        id="filter-button"
        onClick={ handleButtonClick }
      >
        Filter
      </button>

      <button
        type="button"
        data-testid="filter"
        id="filter-button"
        onClick={ () => setFilterByValues({}) }
      >
        X
      </button>
    </div>
  );
}

export default FiltersInput;
