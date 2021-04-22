import React, { useContext } from 'react';
import starWarsContext from '../context/starWarsContext';

const Table = () => {
  const { data, filters } = useContext(starWarsContext);
  const { filterByName: { name = '' } } = filters;
  const tableHead = data[0] || [];

  function tableHeadGenerator() {
    return Object.keys(tableHead)
      .map((element, index) => <th key={ index }>{element}</th>);
  }

  function filterPlanets() {
    let planetFilter = data
      .filter((planet) => planet.name.toLowerCase().includes(name));
    if (filters.filterByNumericValues.length > 0) {
      filters.filterByNumericValues.forEach((element) => {
        const { column, comparsion, value } = element;
        if (comparsion === 'maior que') {
          planetFilter = planetFilter.filter((planet) => +(planet[column]) > +(value));
        } else if (comparsion === 'menor que') {
          planetFilter = planetFilter.filter((planet) => +(planet[column]) < +(value));
        } else {
          planetFilter = planetFilter.filter((planet) => +(planet[column]) === +(value));
        }
      });
    }
    return planetFilter;
  }

  function tableBodyGenerator(planets) {
    return planets.map((planet) => (
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
    ));
  }

  return (
    <table>
      <thead>
        <tr>
          {tableHeadGenerator()}
        </tr>
      </thead>
      <tbody>
        {tableBodyGenerator(filterPlanets())}
      </tbody>
    </table>
  );
};

export default Table;
