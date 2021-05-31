import React, { useContext } from 'react';
import SWProvider from '../context/SWContext';

export default function Table() {
  const { data, tableHeader, filters, setOrder } = useContext(SWProvider);
  const { results } = data;

  const talbeHead = () => (
    <thead>
      <tr>
        {tableHeader.map((e) => <th key={ e }>{ e }</th>)}
      </tr>
    </thead>
  );

  const filterData = () => {
    let planetFiltered = results
      .filter((planet) => planet.name.toLowerCase().includes(filters.filterByName.name));
    if (filters.filterByNumericValues.length > 0) {
      filters.filterByNumericValues.forEach((filter) => {
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
    return setOrder(planetFiltered, filters.order.column, filters.order.sort);
  };

  const tableBody = () => (
    <tbody>
      {filterData().map((e) => (
        <tr key={ e.name }>
          <td data-testid="planet-name">{e.name}</td>
          <td>{e.rotation_period}</td>
          <td>{e.orbital_period}</td>
          <td>{e.diameter}</td>
          <td>{e.climate}</td>
          <td>{e.gravity}</td>
          <td>{e.terrain}</td>
          <td>{e.surface_water}</td>
          <td>{e.population}</td>
          <td>{e.films}</td>
          <td>{e.created}</td>
          <td>{e.edited}</td>
          <td>{e.url}</td>
        </tr>))}
    </tbody>
  );

  if (!data.results) {
    return <p>Loading...</p>;
  }
  return (
    <table className="table table-striped table-dark">
      {talbeHead()}
      {tableBody()}
    </table>
  );
}
