import React, { useContext, useEffect, useState } from 'react';
import TableContext from '../context/TableContext';

function renderListItem(planet) {
  delete planet.residents;
  return (
    <tr key={ planet.name }>
      {Object.values(planet).map((values, index) => (
        <td key={ index }>{ values }</td>
      ))}
    </tr>
  );
}

function Table() {
  const {
    data,
    isLoading,
    filters: {
      filterByName: { name },
      filterByNumericValues,
    },
  } = useContext(TableContext);
  const [planetFilters, setPlanetFilters] = useState([]);

  useEffect(() => {
    let filteredPlanets = data;
    if (name !== '') {
      filteredPlanets = filteredPlanets
        .filter((planet) => planet.name.includes(name));
    }
    if (filterByNumericValues.length > 0) {
      filterByNumericValues.forEach((filter) => {
        const { column, comparison, value } = filter;
        filteredPlanets = filteredPlanets.filter((planet) => {
          switch (comparison) {
          case 'maior que':
            return +(planet[column]) > +(value);
          case 'menor que':
            return +(planet[column]) < +(value);
          default:
            return +(planet[column]) === +(value);
          }
        });
      });
    }
    setPlanetFilters(filteredPlanets);
  }, [data, name, filterByNumericValues]);

  if (!isLoading && planetFilters.length !== 0) {
    const tableLabel = Object.keys(data[0]);
    const filteredTabelLabel = tableLabel.filter((label) => (
      label !== 'residents'
    ));
    return (
      <table>
        <thead>
          <tr>
            {filteredTabelLabel.map((label) => (
              <th key={ label }>{label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {planetFilters.map((planet) => (
            renderListItem(planet)
          ))}
        </tbody>
      </table>
    );
  }
  return <span>loading...</span>;
}

export default Table;
