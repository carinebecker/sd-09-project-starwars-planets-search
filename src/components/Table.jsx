import React, { useContext } from 'react';
import Loading from './Loading';
import Filters from './Filters';
import PlanetsContext from '../context/PlanetsContext';
import '../styles/Table.css';

function Table() {
  const {
    planets,
    tableHeaders,
    loading,
    filterByName: { name },
    filterByNumericValues: { column, comparison, value },
  } = useContext(PlanetsContext);

  if (loading) return <Loading />;

  function tableHead() {
    return (
      <tr>
        { Object.keys(tableHeaders[0]).map((header) => (
          <th key={ header }>{header}</th>
        ))}
      </tr>
    );
  }

  function tableRows() {
    let filteredPlanets = planets;
    if (comparison === 'menor que') {
      filteredPlanets = filteredPlanets
        .filter((planet) => +(planet[column]) < +(value));
    }

    if (comparison === 'maior que') {
      filteredPlanets = filteredPlanets
        .filter((planet) => +(planet[column]) > +(value));
    }

    if (comparison === 'igual a') {
      filteredPlanets = filteredPlanets
        .filter((planet) => +(planet[column]) === +(value));
    }

    return filteredPlanets
      .filter((planet) => planet.name.toUpperCase().includes(name.toUpperCase()))
      .map((planet, index) => (
        <tr key={ index }>
          <td id="planetsName">{planet.name}</td>
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
      ));
  }

  return (
    <div>
      <h1>Star Wars Planet Search</h1>

      <Filters />

      <table id="planetsTable">
        <thead>
          {tableHead()}
        </thead>

        <tbody>
          {tableRows()}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
