import React, { useState, useEffect, useContext } from 'react';

import StarWars from '../hooks/context/StarWarsContext';
import './css/Table.css';

const Table = () => {
  const [planets, setPlanets] = useState([]);
  const [search, setSearch] = useState('');
  const data = useContext(StarWars);

  useEffect(() => {
    let planetsList = data;
    if (search === '') {
      setPlanets(planetsList);
    } else {
      planetsList = planetsList.filter((planet) => (
        planet.name.toLowerCase().includes(search.toLowerCase())));
      if (planetsList.length !== 0) {
        setPlanets(planetsList);
      }
    }
  }, [data, search]);

  const handleChanges = ({ target }) => {
    setSearch(target.value);
  };

  if (!planets.length) return <h1>Loading...</h1>;

  return (
    <div>
      <input
        className="search"
        type="text"
        id="name-filter"
        data-testid="name-filter"
        name="name-filter"
        value={ search }
        onChange={ handleChanges }
        placeholder="Pesquisar:"
      />
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
