import React, { useContext, useState, useEffect } from 'react';
import StarWarsContext from '../context/StarWarsContext';
import './Table.css';

const Table = () => {
  const [planetsName, setPlanetsName] = useState([]);
  const [searchPlanet, setSearchPlanet] = useState('');
  const { data } = useContext(StarWarsContext);

  const filterPlanet = () => {
    const filtrando = data.filter((planet) => planet.name.includes(searchPlanet));
    if (filtrando.length !== 0) {
      setPlanetsName(filtrando);
    } else {
      setPlanetsName(data);
    }
  };

  useEffect(() => {
    filterPlanet();
  }, [searchPlanet, data]);

  if (planetsName.length < 1) return <h1>loading</h1>;

  // console.log(data);

  const handleChange = ({ target }) => {
    setSearchPlanet(target.value);
  };

  return (
    <div>
      <forms>
        <label htmlFor="filterByName">
          Pesquisar um planeta você deve fazer:

          <input
            value={ searchPlanet }
            onChange={ handleChange }
            name="filterByName"
            id="filterByName"
            data-testid="name-filter"
            type="text"
          />
        </label>
      </forms>
      <table>
        <thead>
          <tr>
            { Object.keys(planetsName[0])
              .map((header) => <th key={ header }>{header}</th>) }
          </tr>
        </thead>
        <tbody>
          {planetsName.map((planet) => (
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
};

export default Table;
