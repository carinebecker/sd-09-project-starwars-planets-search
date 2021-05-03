import React, { useContext } from 'react';
import TableContext from '../context/TableContext';

function Filters() {
  const {
    data,
    setFilterByName,
    setFilteredData,
    setFilterByNumeric,
    filterByNumeric,
  } = useContext(TableContext);
  const { results } = data;

  const handleChange = ({ target: { value } }) => {
    // debugger;
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

  const handleClick = () => {
    const { column, comparison, value } = filterByNumeric;
    let result;
    if (comparison === 'greater') {
      result = results
        .filter((currPlanet) => Number(currPlanet[column]) > Number(value));
    }
    if (comparison === 'less') {
      result = results
        .filter((currPlanet) => Number(currPlanet[column]) < Number(value));
    }
    if (comparison === 'equal') {
      result = results
        .filter((currPlanet) => Number(currPlanet[column]) === Number(value));
    }
    const filteredResults = result.map((res) => Object.values(res));
    setFilteredData(filteredResults);
  };

  return (
    <div className="filters-container">
      <input
        type="text"
        id="name-filter"
        data-testid="name-filter"
        placeholder="Pesquisar planeta"
        onChange={ handleChange }
      />
      <div className="numeric-filters">
        <select
          name="column"
          id="column-filter"
          data-testid="column-filter"
          onChange={ numericFilters }
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>
        <select
          name="comparison"
          id="comparison-filter"
          data-testid="comparison-filter"
          onChange={ numericFilters }
        >
          <option value="greater">maior que</option>
          <option value="less">menor que</option>
          <option value="equal">igual a</option>
        </select>
        <input
          name="value"
          type="number"
          data-testid="value-filter"
          placeholder="Quantidade"
          onChange={ numericFilters }
        />
      </div>
      <button
        type="button"
        data-testid="button-filter"
        onClick={ handleClick }
      >
        Filtrar
      </button>
    </div>
  );
}

export default Filters;
