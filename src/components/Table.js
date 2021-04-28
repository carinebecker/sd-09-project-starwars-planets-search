import React, { useContext } from 'react';
import planetContext from '../context/Context';

function Table() {
  const { planets, filteredPlanets } = useContext(planetContext);

  const tableHead = () => {
    if (planets) {
      const keys = Object.keys(planets[0]);
      const planetsArray = keys.filter((key) => key !== 'residents');
      return planetsArray.map((planet) => (
        <th key={ planet }>{planet}</th>
      ));
    }
  };

  const tableBody = () => {
    if (filteredPlanets) {
      return filteredPlanets.map((planet, index) => (
        <tr key={ index }>
          <td>{planet.name}</td>
          <td>{planet.rotation_period}</td>
          <td>{planet.orbital_period}</td>
          <td>{planet.diameter}</td>
          <td>{planet.climate}</td>
          <td>{planet.gravity}</td>
          <td>{planet.terrain}</td>
          <td>{planet.surface_water}</td>
          <td>{planet.population}</td>
          <td className="word-wrap">{planet.films}</td>
          <td className="word-wrap">{planet.created}</td>
          <td className="word-wrap">{planet.edited}</td>
          <td className="word-wrap">{planet.url}</td>
        </tr>
      ));
    }
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            {tableHead()}
          </tr>
        </thead>
        <tbody>
          {tableBody()}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
