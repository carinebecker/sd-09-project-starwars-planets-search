import React, { useContext } from 'react';
import { Context } from '../context/Provider';

function Table() {
  const { headers, planets, loading } = useContext(Context);
  const filteredHeaders = headers.filter((header) => header !== 'residents');
  if (loading) return <p>Loading..</p>;
  return (
    <table>
      <tr>
        {filteredHeaders.map((propertie, index) => <th key={ index }>{propertie}</th>)}
      </tr>
      {planets.map((planet) => (
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
          <td>{planet.films}</td>
          <td>{planet.created}</td>
          <td>{planet.edited}</td>
          <td>{planet.url}</td>
        </tr>
      ))}
    </table>
  );
}

export default Table;
