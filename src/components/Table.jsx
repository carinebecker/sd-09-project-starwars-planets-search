import React, { useContext, useEffect, useState } from 'react';
import StarWarsContext from '../context/StarWarsContext';

const Table = () => {
  const {
    data,
    loading,
    filters: {
      filterByName: { name },
      filterByNumericValues,
      order,
    },
    filters,
  } = useContext(StarWarsContext);
  const [filtered, setFiltered] = useState([]);

  function filterByName(filteredPlanets) {
    return filteredPlanets.filter((item) => item.name.toUpperCase()
      .includes(name.toUpperCase()));
  }

  function filterByNumbers(filteredPlanets) {
    filterByNumericValues.forEach((filter, index) => {
      const { column, comparison, value } = filterByNumericValues[index];
      switch (comparison) {
      case 'maior que':
        filteredPlanets = filteredPlanets
          .filter((planet) => +(planet[column]) > +(value));
        break;
      case 'menor que':
        filteredPlanets = filteredPlanets
          .filter((planet) => +(planet[column]) < +(value));
        break;
      default:
        filteredPlanets = filteredPlanets
          .filter((planet) => +(planet[column]) === +(value));
        break;
      }
    });
    return filteredPlanets;
  }

  function sortPlanets(filteredPlanets) {
    const NEGATIVE_RETURN = -1;
    switch (order.sort) {
    case 'DESC':
      if (order.column !== 'name') {
        filteredPlanets = filteredPlanets.sort((planetA, planetB) => (
          +(planetB[order.column]) - +(planetA[order.column])));
      } else {
        filteredPlanets = filteredPlanets.sort((planetA, planetB) => (
          (planetA[order.column] > planetB[order.column]) ? NEGATIVE_RETURN : 0));
      }
      break;
    default:
      if (order.column !== 'name') {
        filteredPlanets = filteredPlanets.sort((planetA, planetB) => (
          +(planetA[order.column]) - +(planetB[order.column])));
      } else {
        filteredPlanets = filteredPlanets.sort((planetA, planetB) => (
          (planetA[order.column] < planetB[order.column]) ? NEGATIVE_RETURN : 0));
      }
      break;
    }
    return filteredPlanets;
  }

  const filter = () => {
    let filteredPlanets = data;
    filteredPlanets = filterByName(filteredPlanets);
    if (filterByNumericValues.length > 0) {
      filteredPlanets = filterByNumbers(filteredPlanets);
    }
    filteredPlanets = sortPlanets(filteredPlanets);
    setFiltered(filteredPlanets);
  };

  useEffect(filter, [data, filters]);

  const renderTableHead = () => {
    const head = Object.keys(data[0]);
    return (
      <thead>
        <tr>
          {head.map((item) => <th key={ item }>{ item }</th>)}
        </tr>
      </thead>
    );
  };

  const renderRow = (planet) => {
    const row = Object.values(planet);
    return (
      <tr key={ planet.name }>
        {row.map((item, index) => (
          <td
            key={ item }
            data-testid={ (index === 0) && 'planet-name' }
          >
            { item }
          </td>))}
      </tr>
    );
  };

  const renderTableBody = () => (
    <tbody>
      {filtered.map((planet) => renderRow(planet))}
    </tbody>
  );

  return (
    <table>
      {!loading && renderTableHead() }
      {!loading && renderTableBody() }
    </table>
  );
};

export default Table;
