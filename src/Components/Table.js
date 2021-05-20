import React, { useState, useEffect } from 'react';

export default function Table() {
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('https://swapi-trybe.herokuapp.com/api/planets/')
      .then((response) => response.json())
      .then((json) => {
        setPlanets(json.results);
        setLoading(true);
      });
  }, []);

  if (loading === false) return <h1>Loading</h1>;
  return (
    <div>
      <table>
        <tr>
          {Object.keys(planets[0])
            .filter((val) => val !== 'residents')
            .map((val) => <th key={ val }>{val}</th>)}
        </tr>
        {planets.map((tagTd) => (
          <tr key={ tagTd.name }>
            <td>{tagTd.name}</td>
            <td>{tagTd.rotation_period}</td>
            <td>{tagTd.orbital_period}</td>
            <td>{tagTd.diameter}</td>
            <td>{tagTd.climate}</td>
            <td>{tagTd.gravity}</td>
            <td>{tagTd.terrain}</td>
            <td>{tagTd.surface_water}</td>
            <td>{tagTd.population}</td>
            <td>{tagTd.films}</td>
            <td>{tagTd.created}</td>
            <td>{tagTd.edited}</td>
            <td>{tagTd.url}</td>
          </tr>
        ))}
      </table>
    </div>
  );
}
