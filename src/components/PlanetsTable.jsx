import React, { useContext } from 'react';
import PlanetsProvider from '../context/PlanetsContext';

function PlanetsTable() {
  const { data, tableHeader, filters, setOrder } = useContext(PlanetsProvider);
  const { results } = data;

  const renderTableHead = () => (
    <tr>
      {tableHeader.map((title) => <th key={ title }>{ title }</th>)}
    </tr>
  );

  // referência da função abaixo https://github.com/tryber/sd-09-project-starwars-planets-search/compare/pedromchenrique
  const filterData = () => {
    let planetFiltered = results
      .filter((planet) => planet.name.toLowerCase().includes(filters.filterByName.name));
    if (filters.filterByNumericValues[0].column > '') {
      const { column, comparison, value } = filters.filterByNumericValues[0];
      switch (comparison) {
      case 'maior que':
        planetFiltered = results.filter((planet) => +(planet[column]) > +(value));
        break;
      case 'menor que':
        planetFiltered = results.filter((planet) => +(planet[column]) < +(value));
        break;
      default:
        planetFiltered = results.filter((planet) => +(planet[column]) === +(value));
      }
    }
    return setOrder(planetFiltered, filters.order.column, filters.order.sort);
  };

  const renderTableBody = () => (
    <tbody>
      {filterData().map((planet) => (
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
        </tr>))}
    </tbody>
  );

  if (!data.results) {
    return <p>Loading...</p>;
  }
  return (
    <table>
      <thead>
        {renderTableHead()}
      </thead>
      {renderTableBody()}
    </table>
  );
}

export default PlanetsTable;
