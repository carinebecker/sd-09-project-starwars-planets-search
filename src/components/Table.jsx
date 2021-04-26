import React, { useContext } from 'react';
import Loading from './Loading';
import Filters from './Filters';
import StarWarsContext from '../context/StarWarsContext';

function Table() {
  const { isLoading, header, planets, filterName: { name },
    filterByNumericValues: { column, comparison, value } } = useContext(StarWarsContext);

  if (isLoading) return <Loading />;
  // const { filterByName: { name },
  //   filterByNumericValues: [{ column, value, comparison }] } = filters;
  // let filteredPlanets = results;
  function createHeader() {
    return (
      <tr key="header">
        { Object.keys(header[0]).map((word) => (<th key={ word }>{ word }</th>)) }
      </tr>
    );
  }

  function createTablesValues() {
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
      <Filters />
      <table id="planetsTable">
        <thead>
          { createHeader() }
        </thead>
        <tbody>
          { createTablesValues() }
        </tbody>
      </table>
    </div>
  );
}

export default Table;

// function renderPlanetTable() {
//   if (comparison === 'maior que') {
//     filteredPlanets = results
//       .filter((planet) => parseInt(planet[column], 10) > parseInt(value, 10));
//   }
//   if (comparison === 'menor que') {
//     filteredPlanets = results
//       .filter((planet) => parseInt(planet[column], 10) < parseInt(value, 10));
//   }
//   if (comparison === 'igual a') {
//     filteredPlanets = results
//       .filter((planet) => parseInt(planet[column], 10) === parseInt(value, 10));
//   }
//   return filteredPlanets
//     .filter((planetName) => planetName.name.toLowerCase().includes(name.toLowerCase()))

// }

//   <table className="w3-table w3-striped">
//     <thead>
//       <tr>
//         <th>Name</th>
//         <th>rotation_period</th>
//         <th>orbital_period</th>
//         <th>diameter</th>
//         <th>climate</th>
//         <th>gravity</th>
//         <th>terrain</th>
//         <th>surface_water</th>
//         <th>population</th>
//         <th>films</th>
//         <th>created</th>
//         <th>edited</th>
//         <th>url</th>
//       </tr>
//     </thead>
//     <tbody>
//       { renderPlanetTable() }
//     </tbody>
//   </table>
// );
