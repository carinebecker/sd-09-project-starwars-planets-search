import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';
import './Tables.css';

function Tables() {
  const data = useContext(StarWarsContext);

  if (data.length < 1) return <h1>loading</h1>;
  console.log(data);

  return (
    <div>
      <table>
        <thead>
          <tr>
            { Object.keys(data[0])
              .map((header) => <th key={ header }>{header}</th>) }
          </tr>
        </thead>
        <tbody>
          {data.map((planet) => (
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
            </tr>))}
        </tbody>
      </table>
    </div>
  );
}

export default Tables;
