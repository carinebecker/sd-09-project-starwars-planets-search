import React, { useState, useEffect } from 'react';

export default function Table() {
  const [apiData, setApiData] = useState([]);
  const [planetsList, setPlanetsList] = useState([]);

  const getApi = () => {
    fetch('https://swapi-trybe.herokuapp.com/api/planets/')
      .then((result) => result.json())
      .then((json) => {
        setApiData(json.results);
        setPlanetsList(json.results);
      });
  };

  useEffect(() => {
    getApi();
  }, []);

  const filterText = ({ target }) => {
    const filtered = apiData.filter(({ name }) => name.toUpperCase()
      .includes(target.value.toUpperCase()));
    setPlanetsList(filtered);
  };

  if (apiData.length === 0) return <h2>Loading</h2>;
  return (
    <div>
      <label htmlFor="planet">
        Search:
        <input
          type="text"
          id="planet"
          onChange={ filterText }
          data-testid="name-filter"
        />
      </label>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {planetsList.map((planet, index) => (
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
              <td>{planet.films}</td>
              <td>{planet.created}</td>
              <td>{planet.edited}</td>
              <td>{planet.url}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
