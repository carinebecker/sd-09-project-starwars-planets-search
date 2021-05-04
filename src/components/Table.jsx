import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function Table() {
  const { data, filterPlanets } = useContext(StarWarsContext);
  // const { filterByName: { name = '' } } = filters;
  const tableHead = data[0] || [];

  function renderTableHead() {
    return Object.keys(tableHead)
      .map((element, index) => <th key={ index }>{element}</th>);
  }

  /* function filterPlanets() {
    let planetList = data
      .filter((planet) => planet.name.includes(name));
    if (filters.filterByNumericValues.length > 0) {
      filters.filterByNumericValues.forEach((element) => {
        const { column, comparsion, value } = element;
        if (comparsion === 'maior que') {
          planetList = planetList.filter((planet) => +(planet[column]) > +(value));
        } else if (comparsion === 'menor que') {
          planetList = planetList.filter((planet) => +(planet[column]) < +(value));
        } else {
          planetList = planetList.filter((planet) => +(planet[column]) === +(value));
        }
      });
    }
    return planetList;
  } */

  function tableBody() {
    return filterPlanets.map((planet) => (
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
      </tr>
    ));
  }

  return (
    <table border="10">
      <thead>
        <tr>
          { renderTableHead() }
        </tr>
      </thead>
      <tbody>
        {tableBody()}
      </tbody>
    </table>
  );
}

export default Table;
