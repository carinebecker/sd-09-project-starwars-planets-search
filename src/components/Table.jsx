import React, { useContext } from 'react';
import Loading from './Loading';
import StarWarsContext from '../context/StarWarsContext';

function Table() {
  const { isLoading, data: { results }, filters } = useContext(StarWarsContext);
  const { filterByName: { name } } = filters;

  function renderPlanetTable(data) {
    return data.filter((planetName) => planetName.name.includes(name))
      .map((planet) => (
        <tr key={ planet.name }>
          <td>{planet.name}</td>
          <td>{planet.terrain}</td>
          <td>{planet.population}</td>
          <td>{planet.climate}</td>
          <td>{planet.diameter}</td>
          <td>{planet.gravity}</td>
          <td>{planet.orbital_period}</td>
          <td>{planet.rotation_period}</td>
          <td>{planet.surface_water}</td>
          <td>{planet.created}</td>
          <td>{planet.edited}</td>
          <td>{planet.films}</td>
          <td>{planet.url}</td>
        </tr>
      ));
  }

  if (isLoading) return <Loading />;
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>rotation_period</th>
          <th>orbital_period</th>
          <th>diameter</th>
          <th>climate</th>
          <th>gravity</th>
          <th>terrain</th>
          <th>surface_water</th>
          <th>population</th>
          <th>films</th>
          <th>created</th>
          <th>edited</th>
          <th>url</th>
        </tr>
      </thead>
      <tbody>
        { renderPlanetTable(results) }
      </tbody>
    </table>
  );
}

export default Table;
