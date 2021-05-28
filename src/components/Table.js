import React, { useState, useEffect, useContext } from 'react';
import { SWContext } from '../context/SWProvider';
import API from '../services/API';

export default function Table() {
  const [planets, setPlanets] = useState([]);
  const { filters, setFilters } = useContext(SWContext);
  const { filterByName: { name } } = filters;

  useEffect(() => {
    async function fetchPlanets() {
      setPlanets(await API());
    }

    fetchPlanets();
  }, []);

  function handleChange({ target }) {
    setFilters({
      filterByName: {
        name: target.value,
      },
    });
  }

  return (
    <div>
      <input
        type="text"
        placeholder="search"
        data-testid="name-filter"
        onChange={ handleChange }
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
          {planets.filter((p) => p.name.toLowerCase().includes(name.toLowerCase()))
            .map((e) => (
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
            )) }
        </tbody>
      </table>
    </div>
  );
}
