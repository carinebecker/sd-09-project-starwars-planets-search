import React, { useContext } from 'react';
import StarwarsContext from '../context/StarwarsContext';

function Table() {
  const { data, filteredContent, setOrder } = useContext(StarwarsContext);
  // Referência: https://github.com/tryber/sd-09-project-starwars-planets-search/pull/12
  const filteredPlanets = () => {
    let planetFiltered = data.results
      .filter((planet) => (
        planet.name.toLowerCase().includes(filteredContent.filterByName.name)));
    if (filteredContent.filterByNumericValues.length > 0) {
      filteredContent.filterByNumericValues.forEach((filter) => {
        const { column, comparison, value } = filter;
        switch (comparison) {
        case 'maior que':
          planetFiltered = planetFiltered
            .filter((planet) => +(planet[column]) > +(value));
          break;
        case 'menor que':
          console.log(value);
          planetFiltered = planetFiltered
            .filter((planet) => +(planet[column]) < +(value));
          break;
        default:
          planetFiltered = planetFiltered
            .filter((planet) => +(planet[column]) === +(value));
        }
      });
    }
    return setOrder(planetFiltered,
      filteredContent.order.column, filteredContent.order.sort);
  };

  const renderFilteredPlanets = () => (
    filteredPlanets().map((planet) => (
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
      </tr>))
  );

  if (!data.results) return <p>Loading</p>;

  return (
    <table>
      <thead>
        <tr>
          {Object.keys(data.results[0]).map((value) => <th key={ value }>{value}</th>)}
        </tr>
      </thead>
      <tbody>
        {renderFilteredPlanets()}
      </tbody>
    </table>
  );
}

export default Table;
