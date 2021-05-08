import React, { useContext } from 'react';
import TableContext from '../context/TableContext';
import handleOrderFilter from '../store';

function Filters() {
  const {
    data,
    setFilterByName,
    setFilteredData,
    filteredData,
    setFilterByNumeric,
    filterByNumeric,
    setFilterByNumericValues,
    columnFilter,
    setColumnFilter,
    activeFilters,
    setActiveFilters,
    resultsKeys,
    order,
    setOrder,
  } = useContext(TableContext);
  const { results } = data;

  const handleChange = ({ target: { value } }) => {
    setFilterByName({ name: value });

    const nameToFilter = value.toLowerCase();
    const resultsValues = results
      .filter((res) => (res.name.toLowerCase().includes(nameToFilter)))
      .map((res) => Object.values(res));
    setFilteredData(resultsValues);
  };

  const numericFilters = ({ target }) => {
    const { name, value } = target;
    setFilterByNumeric({
      ...filterByNumeric,
      [name]: value,
    });
  };

  const removeFilter = (filter) => {
    setActiveFilters(activeFilters.filter((filt) => filt !== filter));
    setColumnFilter((prevState) => [...prevState, filter]);
    setFilteredData(results.map((res) => Object.values(res)));
  };

  const renderActiveFilters = () => {
    if (activeFilters.length !== 0) {
      return (
        <div className="active-filters">
          { activeFilters
            .map((filter) => (
              <span key={ filter } data-testid="filter">
                { filter }
                <button type="button" onClick={ () => removeFilter(filter) }>X</button>
              </span>
            ))}
        </div>
      );
    }
  };

  const handleNumericFilter = () => {
    const { column, comparison, value } = filterByNumeric;
    let result;
    if (comparison === 'maior que') {
      result = results
        .filter((currPlanet) => Number(currPlanet[column]) > Number(value));
    }
    if (comparison === 'menor que') {
      result = results
        .filter((currPlanet) => Number(currPlanet[column]) < Number(value));
    }
    if (comparison === 'igual a') {
      result = results
        .filter((currPlanet) => Number(currPlanet[column]) === Number(value));
    }
    const filteredResults = result.map((res) => Object.values(res));
    setFilteredData(filteredResults);
    setFilterByNumericValues((prevState) => [...prevState, filterByNumeric]);
    setActiveFilters((prevState) => [...prevState, column]);
    setColumnFilter(columnFilter.filter((filt) => filt !== column));
    renderActiveFilters();
    setFilterByNumeric({
      column: columnFilter[0],
      comparison: 'maior que',
      value: '',
    });
  };

  const renderNameFilter = () => (
    <div className="name-filter">
      <input
        type="text"
        id="name-filter"
        data-testid="name-filter"
        placeholder="Pesquisar planeta"
        onChange={ handleChange }
      />
    </div>
  );

  const renderNumericFilters = () => (
    <div className="numeric-filters">
      <select
        name="column"
        id="column-filter"
        data-testid="column-filter"
        onChange={ numericFilters }
      >
        {columnFilter.map((filter) => (
          <option value={ filter } key={ filter }>{filter}</option>
        ))}
      </select>
      <select
        name="comparison"
        id="comparison-filter"
        data-testid="comparison-filter"
        onChange={ numericFilters }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input
        name="value"
        type="number"
        data-testid="value-filter"
        placeholder="Quantidade"
        onChange={ numericFilters }
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ handleNumericFilter }
      >
        Filtrar
      </button>
    </div>
  );

  const handleOrderChange = ({ target }) => {
    const { name, value } = target;
    setOrder({ ...order, [name]: value });
  };

  const handleOrder = () => {
    const planets = handleOrderFilter(filteredData, order);
    setFilteredData(planets);
  };

  const renderOrderFilters = () => (
    <div className="order-filters">
      <select
        data-testid="column-sort"
        name="column"
        onChange={ handleOrderChange }
      >
        {resultsKeys[0].map((key) => <option value={ key } key={ key }>{key}</option>)}
      </select>
      <label htmlFor="column-sort-input-asc">
        <input
          type="radio"
          name="sort"
          id="column-sort-input-asc"
          data-testid="column-sort-input-asc"
          value="ASC"
          onChange={ handleOrderChange }
        />
        Ordem crescente
      </label>
      <label htmlFor="column-sort-input-desc">
        <input
          type="radio"
          name="sort"
          id="column-sort-input-desc"
          data-testid="column-sort-input-desc"
          value="DESC"
          onChange={ handleOrderChange }
        />
        Ordem decrescente
      </label>
      <button
        type="button"
        data-testid="column-sort-button"
        onClick={ handleOrder }
      >
        Filtrar
      </button>
    </div>
  );

  return (
    <div className="filters-container">
      { renderNameFilter() }
      { renderNumericFilters() }
      { renderActiveFilters() }
      { renderOrderFilters() }
    </div>
  );
}

export default Filters;
