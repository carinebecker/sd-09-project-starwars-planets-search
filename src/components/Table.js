import React, { useState, useEffect } from 'react';
import API from '../services/API';

export default function Table() {
  const [planets, setPlanets] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function fetchPlanets() {
      setPlanets(await API());
    }

    fetchPlanets();
  }, []);

  const filterByName = planets.filter((planet) => (
    planet.name.toLowerCase().includes(search.toLowerCase())
  ));

  return (
    <div>
      <input
        type="text"
        placeholder="search"
        data-testid="name-filter"
        onChange={ (e) => setSearch(e.target.value) }
      />
      <table className="table table-striped table-dark">
        <thead>
          <tr>
            <th>Name</th>
            <th>Climate</th>
            <th>Created</th>
            <th>Diameter</th>
            <th>Edited</th>
            <th>Films</th>
            <th>Gravity</th>
            <th>Orbital Period</th>
            <th>Population</th>
            <th>Rotation Period</th>
            <th>Surface Water</th>
            <th>Terrain</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {filterByName.map((e) => (
            <tr key={ e.name }>
              <td data-testid="planet-name">{ e.name }</td>
              <td>{ e.rotation_period }</td>
              <td>{ e.orbital_period }</td>
              <td>{ e.diameter }</td>
              <td>{ e.climate }</td>
              <td>{ e.gravity }</td>
              <td>{ e.terrain }</td>
              <td>{ e.surface_water }</td>
              <td>{ e.population }</td>
              <td>{ e.films }</td>
              <td>{ e.created }</td>
              <td>{ e.edited }</td>
              <td>{ e.url }</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}
