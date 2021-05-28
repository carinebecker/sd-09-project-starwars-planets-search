import React, { useContext } from 'react';
import { Context } from '../context/Provider';

function Table() {
  const { data, planets, filters } = useContext(Context);

  const numericFilter = (myData) => {
    const { filterByNumericValues } = filters;
    let filteredPlanets = myData;
    filterByNumericValues.forEach(({ column, comparison, value }) => {
      if (comparison === 'maior que') {
        filteredPlanets = myData
          .filter((planet) => Number(planet[column]) > Number(value));
      }
      if (comparison === 'menor que') {
        filteredPlanets = myData
          .filter((planet) => Number(planet[column]) < Number(value));
      }
      if (comparison === 'igual a') {
        filteredPlanets = myData
          .filter((planet) => Number(planet[column]) === Number(value));
      }
    });
    return filteredPlanets;
  };

  const orderPlanets2 = (array, column, sort) => {
    const magicNumber = -1;
    if (sort === 'ASC' && Number(array[0][column])) {
      array.sort((a, b) => a[column] - b[column]);
    }
    if (sort === 'DESC' && Number(array[0][column])) {
      array.sort((a, b) => b[column] - a[column]);
    }
    if (sort === 'ASC') {
      array.sort((a, b) => {
        if (a[column] < b[column]) { return magicNumber; }
        if (a[column] > b[column]) { return 1; }
        return 0;
      });
    }
    if (sort === 'DESC') {
      array.sort();
    }
  };

  const orderPlanets = (unorderedPlanets) => {
    const { order: { column, sort } } = filters;
    if (unorderedPlanets.length) {
      orderPlanets2(unorderedPlanets, column, sort);
    }
    return unorderedPlanets;
  };

  const headers = Object.keys(data[0]);
  const filteredHeaders = headers.filter((header) => header !== 'residents');

  return (
    <table>
      <thead>
        <tr>
          {filteredHeaders.map((propertie, index) => <th key={ index }>{propertie}</th>)}
        </tr>
      </thead>
      <tbody>
        {orderPlanets(numericFilter(planets)).map((planet) => (
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
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
