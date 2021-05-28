import React, { useEffect, useState } from 'react';
import planetsAPI from '../service/api';

function Table() {
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const response = await planetsAPI();
      setPlanets(response.results);
    };
    fetch();
  }, []);

  return (
    <div>
      <h1>Tabela</h1>
      <table>
        <thead>
          <tr>
            { planets[0]
           && Object.keys(planets[0])
             .filter((key) => key !== 'residents')
             .map((key) => <th key={ key }>{ key }</th>) }
          </tr>
        </thead>
        <tbody>
          {planets.map((result, index) => (
            <tr key={ index }>
              <td>{result.name}</td>
              <td>{result.rotation_period}</td>
              <td>{result.orbital_period}</td>
              <td>{result.diameter}</td>
              <td>{result.climate}</td>
              <td>{result.gravity}</td>
              <td>{result.terrain}</td>
              <td>{result.surface_water}</td>
              <td>{result.population}</td>
              <td>{result.films}</td>
              <td>{result.created}</td>
              <td>{result.edited}</td>
              <td>{result.url}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
