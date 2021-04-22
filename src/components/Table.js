import React, { useContext } from 'react';
import { PlanetsContext } from '../context/PlanetsContext';

const TABLE_HEADER = [
  'Name', 'Population', 'Climate', 'Diameter', 'Gravity', 'Orbital Period',
  'Rotation Period', 'Terrain', 'Surface Water', 'Created', 'Edited', 'Url', 'Films',
];

function Table() {
  const {
    data,
    filters: {
      filterByName: { name: planetName },
      filterByNumericValues,
    },
    columnFilter,
    comparisonFilter,
    valueFilter,
    columnOptions,
    columnOrder,
    sortOrder,
    filterPlanet,
    createNumericFilter,
    handleOrderValue,
    handleSortOrder,
    sortPlanets,
    deleteNumericFilter,
  } = useContext(PlanetsContext);

  const filterData = () => {
    const filter = (array, { column, comparison, value }) => {
      const newArray = array.filter((planet) => {
        switch (comparison) {
        case 'maior que':
          return parseInt(planet[column], 10) > parseInt(value, 10);
        case 'menor que':
          return parseInt(planet[column], 10) < parseInt(value, 10);
        default:
          return parseInt(planet[column], 10) === parseInt(value, 10);
        }
      });
      return newArray;
    };

    return filterByNumericValues.reduce((acc, { column, comparison, value }) => {
      const newArray = filter(acc, { column, comparison, value });
      return newArray;
    }, data);
  };

  const removeFilter = (currentFilter) => {
    deleteNumericFilter(currentFilter);
  };

  const array = filterByNumericValues.length ? filterData() : data;

  if (!data) return <p>Loading...</p>;
  return (
    <>
      <input
        data-testid="name-filter"
        type="text"
        value={ planetName }
        onChange={ (e) => filterPlanet('name', e) }
        placeholder="Type to filter the planets"
      />
      <select
        data-testid="column-filter"
        value={ columnFilter }
        onChange={ (e) => filterPlanet('column', e) }
      >
        {columnOptions.map((option) => (
          <option key={ option } value={ option }>{option}</option>
        ))}
      </select>
      <select
        data-testid="comparison-filter"
        value={ comparisonFilter }
        onChange={ (e) => filterPlanet('comparison', e) }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input
        data-testid="value-filter"
        type="number"
        value={ valueFilter }
        onChange={ (e) => filterPlanet('value', e) }
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ () => { createNumericFilter(); filterData(); } }
      >
        Selecione o filtro
      </button>
      {filterByNumericValues && filterByNumericValues.map((filter) => (
        <div data-testid="filter" key={ filter.column }>
          <button
            type="button"
            onClick={ () => removeFilter(filter) }
          >
            {`${filter.column} ${filter.comparison} ${filter.value} X`}
          </button>
        </div>
      ))}
      <select
        data-testid="column-sort"
        value={ columnOrder }
        onChange={ handleOrderValue }
      >
        <option value="name">Name</option>
        <option value="population">Population</option>
        <option value="climate">Climate</option>
        <option value="diameter">Diameter</option>
        <option value="gravity">Gravity</option>
        <option value="orbital_period">Orbital Period</option>
        <option value="rotation_period">Rotation Period</option>
        <option value="terrain">Terrain</option>
        <option value="surface_water">Surface Water</option>
      </select>
      <label htmlFor="upward-radio">
        <input
          data-testid="column-sort-input-asc"
          type="radio"
          value="ASC"
          onChange={ handleSortOrder }
          checked={ sortOrder === 'ASC' }
          id="upward-radio"
        />
        Order Ascendente
      </label>
      <label htmlFor="downward-radio">
        <input
          data-testid="column-sort-input-desc"
          type="radio"
          value="DESC"
          onChange={ handleSortOrder }
          checked={ sortOrder === 'DESC' }
          id="downward-radio"
        />
        Order Descendente
      </label>
      <button
        type="button"
        data-testid="column-sort-button"
        onClick={ () => sortPlanets(columnOrder, sortOrder) }
      >
        Ordene os planetas
      </button>
      <table>
        <thead>
          <tr>
            {TABLE_HEADER.map((item) => <th key={ item }>{item}</th>)}
          </tr>
        </thead>
        <tbody>
          { array.filter(({ name }) => name.includes(planetName)).map(({
            climate,
            created,
            diameter,
            edited,
            films,
            gravity,
            name,
            orbital_period: orbitalPeriod,
            population,
            rotation_period: rotationPeriod,
            surface_water: surfaceWater,
            terrain,
            url,
          }) => (
            <tr key={ url }>
              <td data-testid="planet-name">{ name }</td>
              <td>{ population }</td>
              <td>{ climate }</td>
              <td>{ diameter }</td>
              <td>{ gravity }</td>
              <td>{ orbitalPeriod }</td>
              <td>{ rotationPeriod }</td>
              <td>{ terrain }</td>
              <td>{ surfaceWater }</td>
              <td>{ created }</td>
              <td>{ edited }</td>
              <td>{ url }</td>
              <td>{ films.map((film) => <span key={ film }>{ film }</span>) }</td>
            </tr>
          )) }
        </tbody>
      </table>
    </>
  );
}

export default Table;
