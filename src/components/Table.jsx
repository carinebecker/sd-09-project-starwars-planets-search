import React, { useContext } from 'react';
import Loading from './Loading';
import PlanetsContext from '../context/PlanetsContext';

function Table() {
  const { loading, data: { results } } = useContext(PlanetsContext);
  console.log(loading);

  function planetsTable(data) {
    return data.map((planet) => (
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

  if (loading) return <Loading />;
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Terrain</th>
          <th>Population</th>
          <th>Climate</th>
          <th>Diameter</th>
          <th>Gravity</th>
          <th>Orbital period</th>
          <th>Rotation period</th>
          <th>Surface water</th>
          <th>Created</th>
          <th>Edited</th>
          <th>Films</th>
          <th>URL</th>
        </tr>
      </thead>

      <tbody>
        { planetsTable(results) }
      </tbody>
    </table>
  );
}

export default Table;
