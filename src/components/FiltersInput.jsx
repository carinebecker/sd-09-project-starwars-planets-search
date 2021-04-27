import React, { useContext, useState } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function FiltersInput() {
  const {
    filterByValues,
    setFilterByName,
    setFilterByValues,
    initialColumnOptions,
    columnOptions,
    setColumnOptions,
    setSortBy } = useContext(StarWarsContext);

  const [sortState, setSortState] = useState({ sortByColumn: 'name', sortType: 'ASC' });
  const [filterByNumericValues, setFilterByNumericValues] = useState({
    column: 'population',
    comparison: '',
    value: '0',
  });

  const handleComponentState = ({ target: { name, value } }) => {
    setSortState((state) => ({ ...state, [name]: value }));
  };

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
    setFilterByValues([...filterByValues, filterByNumericValues]);
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

      <label htmlFor="order-column">
        Ordernar por:
        <select
          data-testid="column-sort"
          id="order-column"
          name="sortByColumn"
          onChange={ handleComponentState }
        >
          <option value="name">Planet Name</option>
          <option value="orbital_period">Período Orbital</option>
        </select>
      </label>
      <label htmlFor="radio-asc">
        <input
          id="radio-asc"
          type="radio"
          name="sortType"
          value="ASC"
          data-testid="column-sort-input-asc"
          onClick={ handleComponentState }
        />
        Ascendente:
      </label>

      <label htmlFor="radio-desc">
        <input
          id="radio-desc"
          type="radio"
          name="sortType"
          value="DESC"
          data-testid="column-sort-input-desc"
          onClick={ handleComponentState }
        />
        Descendente:
      </label>

      <button
        type="button"
        data-testid="column-sort-button"
        onClick={ () => setSortBy(sortState) }
      >
        Ordenar
      </button>

    </div>
  );
}

export default FiltersInput;
