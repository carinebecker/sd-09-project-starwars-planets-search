import React, { useState, useEffect, useContext } from 'react';

import StarWars from '../context/StarWarsContext';
import './css/Table.css';

const Table = () => {
  const [planets, setPlanets] = useState([]);
  const { data, filters } = useContext(StarWars);

  useEffect(() => {
    let planetsList = [];
    const { filters: { filterByName: { name } } } = filters;

    const { column } = filters.filters.filterByNumericValues[0];
    const { comparison } = filters.filters.filterByNumericValues[0];
    const { value } = filters.filters.filterByNumericValues[0];

    switch (comparison) {
    case 'maior que':
      planetsList = data.filter((planet) => (planet[column] > parseInt(value, 10)));
      break;
    case 'menor que':
      planetsList = data.filter((planet) => (planet[column] < parseInt(value, 10)));
      break;
    case 'igual a':
      planetsList = data.filter((planet) => (planet[column] === value));
      break;
    default:
      planetsList = data.filter((planet) => (
        planet.name.toLowerCase().includes(name.toLowerCase())));
      break;
    }
    setPlanets(planetsList);
  }, [data, filters]);

  if (!planets.length) return <h1>Loading...</h1>;

  return (
    <div>
      <table className="planets">
        <thead>
          <tr>
            { Object.keys(planets[0])
              .map((header) => <th key={ header }>{header}</th>) }
          </tr>
        </thead>
        <tbody>
          { planets.map((planet) => (
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
            </tr>)) }
        </tbody>
      </table>
    </div>
  );
};

export default Table;
