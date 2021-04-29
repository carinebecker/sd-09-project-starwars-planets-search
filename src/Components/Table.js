import React, { useContext, useState } from 'react';
import AppContext from '../services/contextAPI';

const Table = () => {
  const { data, changeFilterName, changeNumericFilters } = useContext(AppContext);
  const [columnFilter, changeColumnFilter] = useState('');
  const [comparisonFilter, changeComparisonFilter] = useState('');
  const [valueFilter, changeValueFilter] = useState(0);

  const submitFilter = () => {
    changeNumericFilters({
      column: columnFilter,
      comparison: comparisonFilter,
      value: parseFloat(valueFilter),
    });
  };
  return (
    <div>
      <form>
        <h2>Filters</h2>
        <input
          type="text"
          data-testid="name-filter"
          onChange={ ({ target: { value } }) => changeFilterName(value) }
        />
        <select
          data-testid="column-filter"
          onChange={ ({ target: { value } }) => changeColumnFilter(value) }
        >
          <option>population</option>
          <option>orbital_period</option>
          <option>diameter</option>
          <option>rotation_period</option>
          <option>surface_water</option>
        </select>
        <select
          data-testid="comparison-filter"
          onChange={ ({ target: { value } }) => changeComparisonFilter(value) }
        >
          <option>maior que</option>
          <option>menor que</option>
          <option>igual a</option>
        </select>
        <input
          type="number"
          data-testid="value-filter"
          onChange={ ({ target: { value } }) => changeValueFilter(value) }
        />
        <button
          type="button"
          data-testid="button-filter"
          onClick={ submitFilter }
        >
          Filter!
        </button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          { data.map((planet) => (
            <tr key={ planet.name }>
              <td>{planet.name}</td>
              <td>{planet.rotation_period}</td>
              <td>{planet.orbital_period}</td>
              <td>{planet.diameter}</td>
              <td>{planet.climate}</td>
              <td>{planet.gravity}</td>
              <td>{planet.terrain}</td>
              <td>{planet.surface_water}</td>
              <td>{planet.population}</td>
              <td>
                {planet.films.map((film, index) => (
                  <a key={ film } href={ film }>
                    {`Film ${index + 1}`}
                  </a>
                ))}
              </td>
              <td>{planet.created}</td>
              <td>{planet.edited}</td>
              <td><a href={ planet.url }>Link</a></td>
            </tr>
          )) }
        </tbody>
      </table>
    </div>
  );
};

export default Table;
