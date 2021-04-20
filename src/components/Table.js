import React, { useContext } from 'react';
import { PlanetsContext } from '../context/PlanetsContext';

function Table() {
  const {
    data,
    filters: { filterByName: { name: planetName } },
    filterPlanetByName,
  } = useContext(PlanetsContext);
  if (!data) return <p>Loading...</p>;
  return (
    <>
      <input
        data-testid="name-filter"
        type="text"
        value={ planetName }
        onChange={ filterPlanetByName }
      />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Population</th>
            <th>Climate</th>
            <th>Diameter</th>
            <th>Gravity</th>
            <th>Orbital Period</th>
            <th>Rotation Period</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Created</th>
            <th>Edited</th>
            <th>Url</th>
            <th>Films</th>
          </tr>
        </thead>
        <tbody>
          { data.filter(({ name }) => name.includes(planetName)).map(({
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
              <td>{ name }</td>
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
