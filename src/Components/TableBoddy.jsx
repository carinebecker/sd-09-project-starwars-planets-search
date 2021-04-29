import React, { useContext } from 'react';
import { TableContext } from '../Context/TableContext';

const TableBody = () => {
  const {
    data,
    filters: {
      filterByName: { name },
      filterByNumericValues,
    },
  } = useContext(TableContext);

  const showFilterResult = () => (
    filterByNumericValues.reduce((acc, { column, comparison, value }) => (
      acc.filter((planets) => {
        switch (comparison) {
        case 'maior que':
          return parseInt(planets[column], 10) > parseInt(value, 10);
        case 'menor que':
          return parseInt(planets[column], 10) < parseInt(value, 10);
        case 'igual a':
          return parseInt(planets[column], 10) === parseInt(value, 10);
        default:
          return acc;
        }
      })
    ), data)
  );
  const arr = filterByNumericValues.length ? showFilterResult() : data;
  return (
    <tbody>
      {arr
        .filter((result) => result.name.toUpperCase().includes(name.toUpperCase()))
        .map((planet) => (
          <tr key={ planet.id }>
            <td>{planet.name}</td>
            <td>{planet.rotation_period}</td>
            <td>{planet.orbital_period}</td>
            <td>{planet.diameter}</td>
            <td>{planet.climate}</td>
            <td>{planet.created}</td>
            <td>{planet.edited}</td>
            <td>{planet.films}</td>
            <td>{planet.gravity}</td>
            <td>{planet.population}</td>
            <td>{planet.surface_water}</td>
            <td>{planet.terrain}</td>
            <td>{planet.url}</td>
          </tr>))}
    </tbody>
  );
};

export default TableBody;
