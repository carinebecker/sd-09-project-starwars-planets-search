import React, { useContext } from 'react';
import TableContext from '../context/TableContext';

function Filters() {
  const {
    data,
    filterByName,
    setFilterByName,
    setFilteredData,
    setFilterByNumeric,
    filterByNumeric,
  } = useContext(TableContext);
  const { results } = data;

  function resultsByName() {
    const nameToFilter = filterByName.name.toLowerCase();
    const resultsValues = results
      .filter((res) => (res.name.toLowerCase().includes(nameToFilter)))
      .map((res) => Object.values(res));
    setFilteredData(resultsValues);
  }

  const nameFilter = ({ target: { value } }) => {
    setFilterByName({ name: value });
    resultsByName();
  };

  const numericFilters = ({ target }) => {
    const { name, value } = target;
    setFilterByNumeric({
      ...filterByNumeric,
      [name]: value,
    });
  };

  const filterNumericValues = () => {
    const { column, comparison, value } = filterByNumeric;
    console.log(filterByNumeric);
    let result;
    if (comparison === 'greater') {
      result = results.filter((currPlanet) => currPlanet[column] > Number(value));
    }
    if (comparison === 'less') {
      result = results.filter((currPlanet) => currPlanet[column] < Number(value));
    }
    if (comparison === 'equal') {
      result = results.filter((currPlanet) => currPlanet[column] === Number(value));
    }
    setFilteredData(result.map((res) => Object.values(res)));
  };

  return (
    <div className="filters-container">
      <input
        type="text"
        id="name-filter"
        data-testid="name-filter"
        placeholder="Pesquisar planeta"
        onChange={ nameFilter }
      />
      <div className="numeric-filters">
        <select
          name="column"
          id="column-filter"
          data-testid="column-filter"
          onChange={ numericFilters }
        >
          <option value="population">Population</option>
          <option value="orbital_period">Orbital period</option>
          <option value="diameter">Diameter</option>
          <option value="rotation_period">Rotation period</option>
          <option value="surface_water">Surface water</option>
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
        onClick={ filterNumericValues }
      >
        Filtrar
      </button>
    </div>
  );
}

export default Filters;
