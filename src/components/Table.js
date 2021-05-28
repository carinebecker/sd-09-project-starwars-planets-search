import React, { useContext } from 'react';
import { Context } from '../context/Provider';

function Table() {
  const { data, planets, filters } = useContext(Context);

  const numericFilter = (myData) => {
    const { filterByNumericValues } = filters;
    let filteredPlanets = myData;
    filterByNumericValues.forEach(({ column, comparison, value }) => {
      if (comparison === 'maior que') {
        filteredPlanets = myData
          .filter((planet) => Number(planet[column]) > Number(value));
      }
      if (comparison === 'menor que') {
        filteredPlanets = myData
          .filter((planet) => Number(planet[column]) < Number(value));
      }
      if (comparison === 'igual a') {
        filteredPlanets = myData
          .filter((planet) => Number(planet[column]) === Number(value));
      }
    });
    return filteredPlanets;
  };

  const headers = Object.keys(data[0]);
  const filteredHeaders = headers.filter((header) => header !== 'residents');

  return (
    <table>
      <thead>
        <tr>
          {filteredHeaders.map((propertie, index) => <th key={ index }>{propertie}</th>)}
        </tr>
      </thead>
      <tbody>
        {numericFilter(planets).map((planet) => (
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
      </tbody>
    </table>
  );
}

export default Table;
