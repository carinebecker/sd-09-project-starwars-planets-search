import React, { useContext } from 'react';
import Context from '../context/Context';

function DataTablePlanets() {
  const { response } = useContext(Context);
  const value = 0;
  if (response.length > value) {
    const planets = Object.keys(response[0]);
    const filtered = planets.filter((item) => (
      item !== 'residents'
    ));
    return (
      <table>
        <tr>
          {filtered.map((planetKey) => (
            <th key={ planetKey }>{planetKey}</th>
          ))}
        </tr>
        {response.map((planetItem) => (
          <tr key={ planetItem }>
            <td>{planetItem.name}</td>
            <td>{planetItem.rotation_period}</td>
            <td>{planetItem.orbital_period}</td>
            <td>{planetItem.diameter}</td>
            <td>{planetItem.climate}</td>
            <td>{planetItem.gravity}</td>
            <td>{planetItem.terrain}</td>
            <td>{planetItem.surface_water}</td>
            <td>{planetItem.population}</td>
            <td>{planetItem.films}</td>
            <td>{planetItem.created}</td>
            <td>{planetItem.edited}</td>
            <td>{planetItem.url}</td>
          </tr>
        ))}
      </table>
    );
  }
  return <div>Loading...</div>;
}

export default DataTablePlanets;
