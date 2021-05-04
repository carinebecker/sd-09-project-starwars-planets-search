import React, { useContext } from 'react';
import TableContext from '../context/TableContext';

function Filters() {
  const {
    data,
    setFilterByName,
    setFilteredData,
    setFilterByNumeric,
    filterByNumeric,
    setFilterByNumericValues,
    columnFilter,
    setColumnFilter,
    activeFilters,
    setActiveFilters,
    resultsKeys,
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
      return activeFilters
        .map((filter) => (
          <span key={ filter } data-testid="filter">
            { filter }
            <button type="button" onClick={ () => removeFilter(filter) }>X</button>
          </span>));
    }
  };

  const handleClick = () => {
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
    <input
      type="text"
      id="name-filter"
      data-testid="name-filter"
      placeholder="Pesquisar planeta"
      onChange={ handleChange }
    />
  );

  const renderNumericFilters = () => (
    <div>
      <select
        name="column"
        id="column-filter"
        data-testid="column-filter"
        onChange={ numericFilters }
      >
        {/* SE O FILTRO JÁ FOI USADO ELE DESAPARECE DAQUI */}
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
        onClick={ handleClick }
      >
        Filtrar
      </button>
    </div>
  );

  const renderOrderFilters = () => (
    <select data-testid="column-sort">
      {resultsKeys[0].map((key) => <option value={ key } key={ key }>{key}</option>)}
    </select>
  );

  return (
    <div className="filters-container">
      <div className="name-filter">{ renderNameFilter() }</div>
      <div className="numeric-filters">{ renderNumericFilters() }</div>
      <div className="active-filters">{ renderActiveFilters() }</div>
      <div className="order-filters">{ renderOrderFilters() }</div>
    </div>
  );
}

export default Filters;
