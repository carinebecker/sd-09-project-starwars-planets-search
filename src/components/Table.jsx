import React, { useContext, useState } from 'react';
import SWContext from '../context/SWContext';
import useData from '../effects/useData';
import useFilterData from '../effects/useFilterData';

function Table() {
  const {
    getData,
    data,
    name,
    column,
    value,
    comparison,
    setFilters,
    filterByName,
    filterByNumericValues,
  } = useContext(SWContext);

  const [filteredData, setFilteredData] = useState(undefined);
  useData(data, getData);
  useFilterData(data, setFilteredData);

  const checkComp = (planet, col, comp, val) => {
    const numberValue = Number(val);
    const columnValue = Number(planet[col]);
    if (comp === 'maior que') return columnValue > numberValue;
    if (comp === 'igual a') return columnValue === numberValue;
    return columnValue < numberValue;
  };

  const filterByCategory = () => {
    const { results } = data;
    const makeComparison = column.length !== 0
      && comparison.length !== 0 && value.length !== 0;
    if (!makeComparison) return;
    const filterData = { results: results
      .filter((planet) => checkComp(planet, column, comparison, value)) };
    return setFilteredData(filterData);
  };

  const noResults = (results, residentsIndex) => (
    results.length === 0 ? <p>Nenhum resultado</p> : (
      <table>
        <thead>
          <tr>
            {Object.keys(results[0]).map((head, headIndex) => (
              head !== 'residents' && <th key={ headIndex }>{head}</th>))}
          </tr>
        </thead>
        <tbody>
          {results.map((planet, index) => (
            <tr key={ index }>
              {Object.values(planet).map((info, rowIndex) => (
                rowIndex !== residentsIndex && <td key={ rowIndex }>{info}</td>))}
            </tr>
          ))}
        </tbody>
      </table>
    )
  );

  const renderInputs = () => (
    <form>
      <label htmlFor="name-input">
        Filter by name:
        <input
          id="name-input"
          data-testid="name-filter"
          value={ name }
          onChange={
            ({ target: { value: val } }) => (
              setFilters({ filters: { filterByName: { name: val },
                filterByNumericValues } }))
          }
        />
      </label>
      <label htmlFor="category">
        Categoria:
        <select
          id="category"
          data-testid="column-filter"
          onChange={ ({ target: { value: val } }) => (
            setFilters({ filters: { filterByName,
              filterByNumericValues: [{ column: val, comparison, value }] } })
          ) }
        >
          <option>rotation_period</option>
          <option>orbital_period</option>
          <option>diameter</option>
          <option>surface_water</option>
          <option>population</option>
        </select>
      </label>
      <label htmlFor="comparison">
        Comparação:
        <select
          id="comparison"
          data-testid="comparison-filter"
          onChange={ ({ target: { value: val } }) => (
            setFilters({ filters: { filterByName,
              filterByNumericValues: [{ column, comparison: val, value }] } })
          ) }
        >
          <option>maior que</option>
          <option>igual a</option>
          <option>menor que</option>
        </select>
      </label>
      <label htmlFor="value">
        Valor:
        <input
          type="number"
          id="value"
          data-testid="value-filter"
          value={ value }
          onChange={ ({ target: { value: val } }) => (
            setFilters({ filters: { filterByName,
              filterByNumericValues: [{ column, comparison, value: val }] } })) }
        />
      </label>
      <button
        type="button"
        data-testid="button-filter"
        onClick={ () => filterByCategory() }
      >
        Filtrar Categoria
      </button>
    </form>
  );
  const renderTable = ({ results }) => {
    const residentsIndex = 9;
    return (
      <div>
        { renderInputs() }
        { noResults(results, residentsIndex) }
      </div>
    );
  };

  const checkFilter = () => {
    const { results } = data;
    if (name) {
      const filterData = { results: results
        .filter((planet) => planet.name.toLowerCase().includes(name.toLowerCase())) };
      return renderTable(filterData);
    }
    return renderTable(filteredData);
  };

  return (
    <div className="flex">
      {!filteredData ? <p>Loading...</p> : checkFilter()}
    </div>
  );
}

export default Table;
