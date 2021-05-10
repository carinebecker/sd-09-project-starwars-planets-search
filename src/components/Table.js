import React, { useContext, useState } from 'react';
import StarWarsContext from '../context/StarWarsContext';
import './Table.css';

const Table = () => {
  const [searchPlanet, setSearchPlanet] = useState('');
  const [state, setState] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });
  const [colunas, setColunas] = useState(['population', 'orbital_period',
    'diameter', 'rotation_period', 'surface_water']);

  const [orderColumn, setOrderColumn] = useState({
    column: 'Name',
    sort: 'ASC',
  });
  
  const orderColumnArray = ['Name', ...colunas];

  const { data, handleClick, addFiltersInputs, filters, removeFilter, orderPlanets } = useContext(StarWarsContext);

  const handleChangeSelects = ({ target }) => {
    const { name, value } = target;
    setState({ ...state, [name]: value });
  };

  const filtersValues = (planets) => {
    filters.filterByNumericValues.forEach((filter) => {
      if (filter.comparison === 'menor que') {
        planets = planets.filter((planet) => (planet[filter.column] < +(filter.value)));
      }
      if (filter.comparison === 'maior que') {
        planets = planets.filter((planet) => (planet[filter.column] > +(filter.value)));
      }
      if (filter.comparison === 'igual a') {
        planets = planets.filter((planet) => (planet[filter.column] === filter.value));
      }
    });
    return planets;
  };

  if (!data.length) return <h1>loading</h1>;

  const dataPlanets = orderPlanets(data);

  const filtersColumn = () => {
    addFiltersInputs(state);
    setColunas(colunas.filter((coluna) => coluna !== state.column));
  };

  const handleChange = ({ target }) => {
    setSearchPlanet(target.value);
  };

  const handleChangeOrder = ({ target }) => {
    setOrderColumn({ ...orderColumn, [target.name]: target.value });
  };

  return (
    <div>
      <form>
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
            { colunas.map((coluna) => <option key={ coluna }>{coluna}</option>) }

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
          onClick={ filtersColumn }
          data-testid="button-filter"
        >
          Filtrar
        </button>
        <br />
        { filters.filterByNumericValues.map((filtro) => (
          <div data-testid="filter" key={ filtro }>
            <span>
              { filtro.column }
              { filtro.comparison }
              { filtro.value }
            </span>
            <button type="button" onClick={ () => removeFilter(filtro) }>X</button>
          </div>
        ))}
        <label htmlFor="column-sort">
          <select
            onChange={ handleChangeOrder }
            name="column"
            id="column-sort"
            data-testid="column-sort"
          >
            { orderColumnArray.map((orCol) => (
              <option
                value={ orCol }
                key={ orCol }
              >
                {orCol}
              </option>))}
          </select>
        </label>
        <label htmlFor="column-sort-input-asc">
          asc
          <input
            onChange={ handleChangeOrder }
            type="radio"
            value="ASC"
            name="sort"
            id="column-sort-input-asc"
            testid="column-sort-input-asc"
          />
        </label>
        <label htmlFor="column-sort-input-desc">
          desc
          <input
            onChange={ handleChangeOrder }
            type="radio"
            value="DESC"
            name="sort"
            id="column-sort-input-desc"
            data-testid="column-sort-input-desc"
          />
        </label>
        <button
          type="button"
          data-testid="column-sort-button"
          onClick={ () => handleClick(orderColumn) }
        >
          Ordenar
        </button>
      </form>
      <table>
        <thead>
          <tr>
            {Object.keys(data[0]).map((header) => (
              <th key={ header }>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          { filtersValues(dataPlanets).filter((planet) => planet.name.includes(searchPlanet)).map((planet) => (
            <tr key={ planet.name }>
              <td data-testid="planet-name">{planet.name}</td>
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
