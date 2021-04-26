import React, { useContext } from 'react';
import Context from '../context/Context';
import FilterPlanets from './FilterPlanets';

function DataTablePlanets() {
  const { response, arrayPlanet } = useContext(Context);
  if (arrayPlanet.length > 0) {
    const planets = Object.keys(response[0]);
    const filtered = planets.filter((item) => (
      item !== 'residents'
    ));
    return (
      <div>
        <FilterPlanets />
        <table>
          <tbody>
            <tr>
              {filtered.map((planetKey) => (
                <th key={ planetKey.name }>{planetKey}</th>
              ))}
            </tr>
          </tbody>
          {arrayPlanet.map((planetItem) => (
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
      </div>
    );
  }
  return (
    <div>
      <FilterPlanets />
    </div>
  );
}

export default DataTablePlanets;
