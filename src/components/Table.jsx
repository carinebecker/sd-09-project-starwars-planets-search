import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Table() {
  const { data } = useContext(PlanetsContext);
  return (
    <table>
      <thead>
        <tr>
          <th> Name </th>
          <th> Climate </th>
          <th> Created </th>
          <th> Diameter </th>
          <th> Edited </th>
          <th> Films </th>
          <th> Gravity </th>
          <th> Orbital_period </th>
          <th> Population </th>
          <th> Rotation_period </th>
          <th> Surface_water </th>
          <th> Terrain </th>
          <th> Url </th>
        </tr>
      </thead>
      <tbody>
        {data.map((planet) => (
          <tr key={ planet.name }>
            <td>{planet.name}</td>
            <td>{planet.climate}</td>
            <td>{planet.created}</td>
            <td>{planet.diameter}</td>
            <td>{planet.edited}</td>
            <td>{planet.films.length}</td>
            <td>{planet.gravity}</td>
            <td>{planet.orbital_period}</td>
            <td>{planet.population}</td>
            <td>{planet.rotation_period}</td>
            <td>{planet.surface_water}</td>
            <td>{planet.terrain}</td>
            <td>{planet.url}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
