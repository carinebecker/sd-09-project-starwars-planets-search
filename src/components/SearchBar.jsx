import React, { useContext, useState } from 'react';
import AppContext from '../context/AppContext';

const SearchBar = () => {
  const {
    filters, setFilterByName, setNumberFilters, resetNumberFilters,
  } = useContext(AppContext);
  // refactor to context
  const [selectedColumn, setColumn] = useState('');
  const [selectedComparison, setType] = useState('');
  const [selectedValue, setValue] = useState(0);
  const [columnOptions, setColumOptions] = useState(
    ['population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'],
  );
  // refactor to context
  const { filterByName, filterByNumericValues } = filters;

  // refactor to context
  const updateColumnOptions = () => {
    const updatedOptions = columnOptions.filter((item) => item !== selectedColumn);
    setColumOptions(updatedOptions);
  };

  const clearFilters = () => {
    setColumn('');
    setType('');
    setValue(0);
  };
  // refactor to context

  return (
    <>
      <form>
        <input
          data-testid="name-filter"
          type="text"
          onChange={ (e) => {
            setFilterByName(e.target.value);
          } }
          id=""
          value={ filterByName.name }
        />
        <select
          data-testid="column-filter"
          onChange={ ({ target }) => { setColumn(target.value); } }
          value={ selectedColumn }
        >
          { columnOptions.map((colum) => (
            <option key={ colum } value={ colum }>{colum}</option>))}
        </select>
        <select
          data-testid="comparison-filter"
          onChange={ ({ target }) => { setType(target.value); } }
          value={ selectedComparison }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
        <input
          data-testid="value-filter"
          type="number"
          onChange={ ({ target }) => { setValue(target.value); } }
          id=""
          value={ selectedValue }
        />
        <button
          data-testid="button-filter"
          type="button"
          onClick={ () => {
            setNumberFilters(selectedColumn, selectedComparison, selectedValue);
            updateColumnOptions();
            clearFilters();
          } }
        >
          Add filter
        </button>
        <select
          data-testid="column-sort"
          onChange={ ({ target }) => { setColumn(target.value); } }
          value={ selectedColumn }
        >
          { columnOptions.map((colum) => (
            <option key={ colum } value={ colum }>{colum}</option>))}
        </select>
        <label htmlFor="ASC">
          Ascending
          <input
            data-testid="column-sort-input-asc"
            type="radio"
            name="sort"
            value="ASC"
            id="ASC"
          />
        </label>
        <label htmlFor="DESC">
          Ascending
          <input
            data-testid="column-sort-input-desc"
            type="radio"
            name="sort"
            value="DESC"
            id="DESC"
          />
        </label>
        <button
          data-testid="column-sort-button"
          type="button"
          // onClick={ () => { } }
        >
          Sort
        </button>
      </form>
      <div>
        { filterByNumericValues.map(({ column, comparison, value }) => {
          if (!column) return null;
          return (
            <div key={ column } data-testid="filter">
              <span>
                {`${column} ${comparison} ${value}`}
              </span>
              <button
                type="button"
                onClick={ () => resetNumberFilters(column) }
              >
                X
              </button>
            </div>
          );
        }) }
      </div>
    </>
  );
};

export default SearchBar;
