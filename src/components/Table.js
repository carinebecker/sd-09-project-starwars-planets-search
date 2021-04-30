import React, { useContext, useState, useEffect } from 'react';
import StarWarsContext from '../context/StarWarsContext';
import './Table.css';

const Table = () => {
  const [planetsName, setPlanetsName] = useState([]);
  const [searchPlanet, setSearchPlanet] = useState('');
  const [state, setState] = useState({});
  const { data } = useContext(StarWarsContext);

  const handleChangeSelects = ({ target }) => {
    const { name, value } = target;
    setState({ ...state, [name]: value });
  };

  // const handleClick = () => {
  //   addFiltersInputs(state);
  // };

  const filtersValues = () => {
    if (state.comparison === 'menor que') {
      setPlanetsName(data
        .filter((planet) => (planet[state.column] < parseInt(state.value, 10))));
    }
    if (state.comparison === 'maior que') {
      setPlanetsName(data
        .filter((planet) => (planet[state.column] > parseInt(state.value, 10))));
    }
    if (state.comparison === 'igual a') {
      setPlanetsName(data
        .filter((planet) => (planet[state.column] === state.value)));
    }
  };

  useEffect(() => {
    const filtrando = data.filter((planet) => planet.name.includes(searchPlanet));
    if (filtrando.length !== 0) {
      setPlanetsName(filtrando);
    } else {
      setPlanetsName(data);
    }
  }, [data, searchPlanet]);

  if (planetsName.length < 1) return <h1>loading</h1>;

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
        <label htmlFor="columnFilter">
          <select
            onChange={ handleChangeSelects }
            name="column"
            id="columnFilter"
            data-testid="column-filter"
          >
            <option>population</option>
            <option>orbital_period</option>
            <option>diameter</option>
            <option>rotation_period</option>
            <option>surface_water</option>
          </select>
        </label>
        <label htmlFor="comparisonFilter">
          <select
            onChange={ handleChangeSelects }
            name="comparison"
            id="comparisonFilter"
            data-testid="comparison-filter"
          >
            <option>maior que</option>
            <option>menor que</option>
            <option>igual a</option>
          </select>
        </label>
        <label htmlFor="valueFilter">
          <input
            onChange={ handleChangeSelects }
            type="number"
            name="value"
            id="valueFilter"
            data-testid="value-filter"
          />
        </label>
        <button
          type="button"
          onClick={ filtersValues }
          data-testid="button-filter"
        >
          Filtrar
        </button>
      </forms>
      <table>
        <thead>
          <tr>
            {Object.keys(planetsName[0]).map((header) => (
              <th key={ header }>{header}</th>
            ))}
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
