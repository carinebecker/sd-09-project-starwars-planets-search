import React, { useContext } from 'react';
import { Context } from '../context';
import NumFilter from './NumFilter';
import PlanetResume from './PlanetResume';

function Table() {
  const { data, filters, setFilters } = useContext(Context);
  let filterData = [];

  function handleName({ target }) {
    const name = target.value;
    setFilters((state) => ({ ...state, filterByName: { name } }));
  }

  function filter() {
    const filtered = data
      .filter((planet) => planet
        .name.toUpperCase().includes(filters.filterByName.name.toUpperCase()));
    return filtered;
  }

  if (filters.filterByName) {
    filterData = filter();
  } else {
    filterData = data;
  }

  if (filters.filterByNumericValue.length) {
    const filtersNum = filters.filterByNumericValue;
    filtersNum.forEach(({ column, comparission, value }) => {
      if (comparission === 'maior que') {
        filterData = filterData
          .filter((planet) => parseFloat(planet[column]) > parseFloat(value));
      } else if (comparission === 'menor que') {
        filterData = filterData
          .filter((planet) => parseFloat(planet[column]) < parseFloat(value));
      } else if (comparission === 'igual a') {
        filterData = filterData
          .filter((planet) => parseFloat(planet[column]) === parseFloat(value));
      }
    });
  }

  function deleteFilter(i) {
    if (filters.filterByNumericValue.length === 1) {
      setFilters((state) => ({
        ...state,
        filterByNumericValue: [],
      }));
    } else {
      setFilters((state) => ({
        ...state,
        filterByNumericValue: state.filterByNumericValue.splice((i - 1), 1),
      }));
    }
  }

  const numericFilters = filters.filterByNumericValue;

  return (
    <div>
      <section>
        <input type="text" onChange={ handleName } data-testid="name-filter" />
        <NumFilter />
      </section>
      { (numericFilters.length > 0) && numericFilters.map((numFilter, i) => (
        <div key={ i } data-testid="filter">
          {`${numFilter.column} ${numFilter.comparission} ${numFilter.value}`}
          <button type="button" onClick={ () => deleteFilter(i) }>
            X
          </button>
        </div>
      )) }
      <table>
        <tr>
          <th>Name</th>
          <th>Rotation period</th>
          <th>Orbital period</th>
          <th>diameter</th>
          <th>Climate</th>
          <th>Gravity</th>
          <th>Terrain</th>
          <th>Surface_water</th>
          <th>Population</th>
          <th>Films</th>
          <th>Created</th>
          <th>Edited</th>
          <th>URL</th>
        </tr>
        { filterData
          .map((planet) => <PlanetResume planet={ planet } key={ planet.name } />) }
      </table>
    </div>
  );
}

export default Table;
