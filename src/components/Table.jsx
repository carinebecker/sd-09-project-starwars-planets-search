import React, { useContext } from 'react';
import MyContext from '../context/MyContext';
import Filters from './Filters';

function Table() {
  const { planets, filters, filterByNum } = useContext(MyContext);
  const {
    filterByName: { name },
    // filterByNumericValues: [{ column, comparison, value }],
  } = filters;

  function filterResults() {
    let filteredPlanets = planets
      .filter((planet) => planet.name.toLowerCase().includes(name.toLowerCase()));
    if (filterByNum.length > 0) {
      filterByNum.forEach(({ column, comparison, value }) => {
        if (comparison === 'maior que') {
          filteredPlanets = planets
            .filter((planet) => parseInt(planet[column], 10) > parseInt(value, 10));
        }
        if (comparison === 'menor que') {
          filteredPlanets = planets
            .filter((planet) => parseInt(planet[column], 10) < parseInt(value, 10));
        }
        if (comparison === 'igual a') {
          filteredPlanets = planets
            .filter((planet) => parseInt(planet[column], 10) === parseInt(value, 10));
        }
      });
    }
    return filteredPlanets
      .filter((planet) => planet.name.toLowerCase().includes(name.toLowerCase()))
      .map((planet) => (
        <tr key={ planet.name }>
          <td>{ planet.name }</td>
          <td>{ planet.rotation_period }</td>
          <td>{ planet.orbital_period }</td>
          <td>{ planet.diameter }</td>
          <td>{ planet.climate }</td>
          <td>{ planet.gravity }</td>
          <td>{ planet.terrain }</td>
          <td>{ planet.surface_water }</td>
          <td>{ planet.population }</td>
          <td>{ planet.films }</td>
          <td>{ planet.created }</td>
          <td>{ planet.edited }</td>
          <td>{ planet.url }</td>
        </tr>
      ));
  }

  return (
    <div>
      <Filters />
      <table className="table-planets">
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
            <th>Url</th>
          </tr>
        </thead>
        <tbody>
          { filterResults() }
        </tbody>
      </table>
    </div>
  );
}

export default Table;
