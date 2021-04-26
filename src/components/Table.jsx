import React, { useContext } from 'react';
import Loading from './Loading';
import FiltersInput from './FiltersInput';
import StarWarsContext from '../context/StarWarsContext';

function Table() {
  const {
    planets,
    tableHeaders,
    isLoading,
    filterByValues: { column, comparison, value },
    filterByName: { name } } = useContext(StarWarsContext);

  const createTableHeaders = () => (
    <tr>
      {
        tableHeaders.map((header) => (
          <th key={ header }>{header}</th>
        ))
      }
    </tr>
  );

  function tableRows() {
    let filteredPlanets = planets;
    if (comparison === 'menor que') {
      filteredPlanets = planets
        .filter((planet) => +(planet[column]) < +(value));
    }
    if (comparison === 'maior que') {
      filteredPlanets = planets
        .filter((planet) => +(planet[column]) > +(value));
    }
    if (comparison === 'igual a') {
      filteredPlanets = planets
        .filter((planet) => +(planet[column]) === +(value));
    }
    return filteredPlanets
      .filter((planet) => planet.name.toLowerCase().includes(name.toLowerCase()))
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

  if (isLoading) return <Loading />;
  return (
    <>
      <h1>Star Wars Planet Table</h1>
      <FiltersInput />
      <table>
        <thead>
          {createTableHeaders()}
        </thead>
        <tbody>
          {tableRows()}
        </tbody>
      </table>
    </>
  );
}

export default Table;
